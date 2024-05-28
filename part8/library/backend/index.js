const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

// const addAuthors = async () => await Author.insertMany(authors);
// addAuthors();

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

// const addBooks = async () => await Book.insertMany(books);
// addBooks();

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Author {
    name:String!,
    id:ID!,
    born:Int,
    bookCount:Int
  }

  type Book {
    title:String!,
    published: Int!,
    author:Author!
    id:ID!,
    genres:[String!]!
  }

  type User{
    username:String!,
    favoriteGenre:String!,
    id:ID!
  }

  type Token{
    value:String!
  }

  type Query {
    authorCount:Int!,
    bookCount:Int!
    allBooks(name:String, genre:String):[Book!]!
    allAuthors:[Author!]!
    me:User
  }

  type Mutation{
    addBook(
      title:String!,
      author:String!,
      published:Int!,
      genres:[String!]!
    ):Book
    editAuthor(
      name:String!,
      setBornTo:Int!,
    ):Author
    createUser(
      username:String!,
      favoriteGenre:String!
    ):User
    login(
      username:String!,
      password:String!
    ):Token
  }
`;

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
      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author.name === author.name
        ).length;
        return {
          ...author,
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

      const updatedAuthor = await Author.findByIdAndUpdate(authorToUpdate._id, {
        born: parseInt(args.setBornTo),
      });

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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ res, req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
