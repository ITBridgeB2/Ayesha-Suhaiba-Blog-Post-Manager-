import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import blogService from './blogService';

function TopicPage() {
  const [posts, setPosts] = useState([]);
  const { topic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    blogService.getPostsByCategory(topic)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [topic]);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#1d3557',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    height: '80px',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const navStyle = {
    position: 'absolute',
    right: '40px',
    display: 'flex',
    gap: '15px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    backgroundColor: '#1d3557',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const mainStyle = {
    padding: '20px 40px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f1f2f6',
    color: '#2f3542',
    height: 'calc(100vh - 80px)', // fits within viewport minus header
    overflowY: 'auto', // Enables scrolling within the main container
  };

  const h2Style = {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
  };

  const postContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    paddingBottom: '20px',
  };

  const postBoxStyle = {
    width: 'calc(33.33% - 20px)', // Ensures 3 posts per row
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          Blog
        </div>
        <nav style={navStyle}>
          <button style={buttonStyle} onClick={() => navigate('/')}>Home</button>
        </nav>
      </header>

      <main style={mainStyle}>
        <h2 style={h2Style}>{topic.charAt(0).toUpperCase() + topic.slice(1)} Posts</h2>
        <div style={postContainerStyle}>
          {posts.map(post => (
            <div key={post.id} style={postBoxStyle}>
              <h3>{post.title}</h3>
              <button style={buttonStyle} onClick={() => navigate(`/post/${post.id}`)}>View Blog</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TopicPage;
