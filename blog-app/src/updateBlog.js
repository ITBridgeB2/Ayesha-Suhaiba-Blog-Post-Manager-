import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogService from './blogService';
import { Filter } from 'bad-words';

function UpdateBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const navigate = useNavigate();

  useEffect(() => {
    BlogService.getPost(id)
      .then(res => {
        setBlog(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category || ''); // Set the category if available
      })
      .catch(err => console.error('Failed to load blog', err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const filter = new Filter();

    if (filter.isProfane(title) || filter.isProfane(content) || filter.isProfane(category)) {
      alert('Your blog contains inappropriate language. Please remove any bad words.');
      return;
    }

    const updatedBlog = { title, content, category }; // Include category

    BlogService.updatePost(id, updatedBlog)
      .then(() => {
        alert('Blog updated successfully');
        navigate(`/viewblog/${id}`);
      })
      .catch(err => {
        console.error('Update failed', err);
        alert('Error updating blog');
      });
  };

  const handleDashboard = () => {
    navigate('/dash');
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: 'Segoe UI', overflow: 'hidden' }}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Update Blog</h1>
        </div>
        <div style={profileContainerStyle}>
          <div style={profileStyle}>
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.zyEH6zUIJYMC7JjERNYrEAHaHa?cb=iwc1&rs=1&pid=ImgDetMain"
              style={avatarStyle}
              alt="Profile"
            />
            <span>{blog.author}</span>
          </div>
          <button onClick={handleDashboard} style={newButtonStyle}>User Dashboard</button>
        </div>
      </header>

      <main style={mainStyle}>
        <form onSubmit={handleUpdate} style={formStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={textareaStyle}
              required
            />
          </div>

          {/* Category Input Box */}
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <button type="submit" style={submitButtonStyle}>Update Blog</button>
        </form>
      </main>
    </div>
  );
}

// Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#1d3557',
  color: '#fff',
  padding: '20px 40px',
  marginBottom: '40px',
  flexWrap: 'wrap',
};

const profileContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const profileStyle = {
  display: 'flex',
  alignItems: 'center',
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '10px',
};

const titleStyle = {
  fontSize: '32px',
  margin: 0,
};

const newButtonStyle = {
  background: '#1d3557',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height:'calc(50vh-70px)',
  backgroundColor: '#f1f2f6',
  overflow: 'hidden', // Ensure the page is non-scrollable
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  width: '600px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Prevent scrolling in the form
};

const formGroupStyle = {
  marginBottom: '10px',
};

const labelStyle = {
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#1d3557',
  display: 'block',
  fontSize: '18px',
};

const inputStyle = {
  padding: '10px', // Reduced padding
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '14px', // Reduced font size
  width: '100%',
};

const textareaStyle = {
  padding: '10px', // Reduced padding
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '14px', // Reduced font size
  height: '150px', // Reduced height
  width: '100%',
};

const submitButtonStyle = {
  background: '#1d3557',
  color: 'white',
  padding: '14px 18px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
};

export default UpdateBlogPage;
