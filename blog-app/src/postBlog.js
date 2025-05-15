import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogService from './blogService';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(''); // Added state for category
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send post data to the backend (simulating an API call)
    try {
      await blogService.createPost({ title, content, author, category }); // Include category

      // After success, alert the user and redirect to the dashboard
      alert('Post created successfully!');
      navigate('/dash');
    } catch (error) {
      // Log any error that occurs during the API request
      console.error('Error creating post:', error);
      alert('Failed to create post: ' + (error.response ? error.response.data.message : error.message));
    }

    // Save the form values in the console
    console.log('Post details:', {
      title,
      content,
      author,
      category
    });
  };

  return (
    <div style={{ fontFamily: 'Segoe UI' }}>
      {/* Header */}
      <header style={{
        background: '#1d3557', color: '#fff', padding: '20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '24px' }}>
          New Post
        </div>
        <button
          onClick={() => navigate('/dash')}
          style={{
            backgroundColor: '#fff', color: '#1d3557', border: 'none',
            padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold',
            cursor: 'pointer', position: 'absolute', right: '20px'
          }}
        >
          Dashboard
        </button>
      </header>

      {/* Form */}
      <main style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height: 'calc(100vh - 80px)',
        backgroundColor: '#f1f2f6'
      }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '400px'
        }}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={inputStyle}
            required
          />
          {/* Category Input Box */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={submitBtnStyle}>
            Submit Post
          </button>
        </form>
      </main>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const submitBtnStyle = {
  width: '100%',
  padding: '10px',
  background: '#1d3557',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px'
};

export default CreatePost;
