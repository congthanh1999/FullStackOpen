import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const likesComparator = (blog1, blog2) => blog2.likes - blog1.likes;

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    changeBlog(state, action) {
      const blogToUpdate = state.find((blog) => blog.id === action.payload.id);

      const newContent = { ...blogToUpdate, ...action.payload };

      return state
        .map((blog) => (blog.id === action.payload.id ? newContent : blog))
        .sort(likesComparator);
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, changeBlog, deleteBlog } =
  blogSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(content);
    dispatch(appendBlog(createdBlog));
    return createdBlog;
  };
};

export const updateBlog = (content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(content.id, content);
    dispatch(changeBlog(updatedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(id);
    dispatch(deleteBlog(id));
    return removedBlog;
  };
};

export default blogSlice.reducer;
