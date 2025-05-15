import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogService from './blogService';

function ViewBlogPage() {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the dynamic 'id' from the URL

  useEffect(() => {
    // Fetch the blog post by its ID
    BlogService.getPost(id)
      .then(response => setBlog(response.data))
      .catch(err => console.error('Failed to load blog', err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <header style={headerStyle}>
        <div style={profileStyle}>
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.zyEH6zUIJYMC7JjERNYrEAHaHa?cb=iwc1&rs=1&pid=ImgDetMain"
            style={avatarStyle}
            alt="Profile"
          />
          <span>{blog.author}</span>
        </div>

        <h1 style={titleStyle}>VIEW BLOG</h1>

        <button onClick={() => navigate('/dash')} style={backButtonStyle}>User Dashboard</button>
      </header>

      <main style={{ padding: '40px' }}>
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
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
  position: 'relative'
};

const profileStyle = {
  display: 'flex',
  alignItems: 'center'
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '10px'
};

const titleStyle = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  margin: 0,
  fontSize: '24px'
};

const backButtonStyle = {
  background: '#1d3557',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default ViewBlogPage;
