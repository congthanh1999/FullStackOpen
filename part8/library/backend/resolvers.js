const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.name && !args.genre) {
        return Book.find({}).populate("author");
      }

      if (args.name) {
        const author = await Author.findOne({ name: args.name });
        return Book.find({ author: author._id }).populate("author");
      }

      if (args.genre) {
        return Book.find({ genres: { $in: `${args.genre}` } }).populate(
          "author"
        );
      }
    },
    allAuthors: async () => {
      const books = await Book.find({}).populate("author");
      const authors = await Author.find({});

      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author.name === author.name
        ).length;
        return {
          ...author._doc,
          bookCount,
        };
      });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: `${args.author}` });
      const newBook = new Book({
        ...args,
        author: author._id,
      });

      try {
        await newBook.save();
      } catch (error) {
        switch (error.errors.title.kind) {
          case "unique": {
            throw new GraphQLError("saving book failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.title,
                message: "title must be unique",
                error,
              },
            });
          }
          case "minlength": {
            throw new GraphQLError("saving book failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.title,
                message: "title minlength is 5",
                error,
              },
            });
          }
          default:
            return;
        }
      }

      const populatedBook = await Book.findById(newBook._id).populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
    },
    editAuthor: async (root, args) => {
      const authorToUpdate = await Author.findOne({ name: args.name });

      if (!authorToUpdate) {
        throw new GraphQLError("cannot find the author", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }

      let updatedAuthor;
      try {
        updatedAuthor = await Author.findByIdAndUpdate(
          authorToUpdate._id,
          {
            born: parseInt(args.setBornTo),
          },
          {
            new: true,
            runValidators: true,
            context: "query",
          }
        );
      } catch (error) {
        throw new GraphQLError("cannot update the author", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }

      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const newUser = await User({ ...args });

      try {
        newUser.save();
      } catch (error) {
        throw new GraphQLError("user already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      return newUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
