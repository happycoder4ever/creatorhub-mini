
import posts from "./mockdata";

let mockDB = [...posts]; // clone to allow mutations

export const mockPostsHelper = {
  // Get all posts
  getAll: () => {
    return mockDB;
  },

  // Get a single post by ID
  getById: (id) => {
    return mockDB.find((post) => post.id === id) || null;
  },

  // Add a new post
  create: ({ title, content, isPremium }) => {
    const newPost = {
      id: (mockDB.length + 1).toString(),
      title,
      content,
      isPremium: !!isPremium,
    };
    mockDB.push(newPost);
    return newPost;
  },

  // Update an existing post
  update: (id, { title, content, isPremium }) => {
    const index = mockDB.findIndex((post) => post.id === id);
    if (index === -1) return null;

    const updatedPost = {
      ...mockDB[index],
      title: title ?? mockDB[index].title,
      content: content ?? mockDB[index].content,
      isPremium: isPremium ?? mockDB[index].isPremium,
    };
    mockDB[index] = updatedPost;
    return updatedPost;
  },

  // Delete a post
  delete: (id) => {
    const index = mockDB.findIndex((post) => post.id === id);
    if (index === -1) return false;

    mockDB.splice(index, 1);
    return true;
  },

  // Reset DB to original mockData
  reset: () => {
    mockDB = [...posts];
    return mockDB;
  },
};
