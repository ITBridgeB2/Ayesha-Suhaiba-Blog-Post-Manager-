import axios from 'axios';

const API_URL = 'http://localhost:9898'; // Backend API URL

const blogService = {
  // Login
  validateLogin: (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
  },

  // ✅ Register using full formData object
  registerUser: ({ name, email, password }) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
  },

  // Create blog post
  createPost: (postData, token) => {
    return axios.post(`${API_URL}/posts`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Dashboard
  getDashboard: (token) => {
    return axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Posts by author
  getPostsByAuthor: (authorName) => {
    return axios.get(`${API_URL}/posts/author/${authorName}`);
  },

  // Get specific post
  getPost: (id) => {
    return axios.get(`${API_URL}/posts/${id}`);
  },

  // Delete post
  deletePost: (id, token) => {
    return axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Update post
  updatePost: (id, updatedData, token) => {
    return axios.put(`${API_URL}/posts/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Get posts by category
  getPostsByCategory: (category) => {
    return axios.get(`${API_URL}/category/${category}`);
  },
};

export default blogService;
