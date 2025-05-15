import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogService from './blogService';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    BlogService.getDashboard(token)
      .then(res => {
        const userInfo = res.data;
        setUser(userInfo);

        BlogService.getPostsByAuthor(userInfo.name)
          .then(response => setBlogs(response.data))
          .catch(err => console.error('Failed to load blogs', err));
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  const handleNewBlog = () => {
    navigate('/postblog');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const handleView = (id) => {
    navigate(`/viewblog/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/updateblog/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      BlogService.deletePost(id)
        .then(() => setBlogs(blogs.filter(blog => blog.id !== id)))
        .catch(err => console.error('Delete failed', err));
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <header style={headerStyle}>
        <div style={profileStyle}>
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.zyEH6zUIJYMC7JjERNYrEAHaHa?cb=iwc1&rs=1&pid=ImgDetMain"
            style={avatarStyle}
            alt="Profile"
          />
          <span>{user.name}</span>
        </div>

        <h1 style={titleStyle}>USER DASHBOARD</h1>

        <div style={buttonGroupStyle}>
          <button onClick={handleNewBlog} style={newButtonStyle}>New Blog</button>
          <button onClick={handleHome} style={newButtonStyle}>Home</button>
          <button onClick={handleLogout} style={newButtonStyle}>Logout</button>
        </div>
      </header>

      <main style={{ padding: '40px' }}>
        <h2>Hello {user.name}!</h2>
        <p>Email: {user.email}</p>

        <div style={{ marginTop: '40px' }}>
          <h3>Your Blogs:</h3>
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div style={blogsContainerStyle}>
              {blogs.map(blog => (
                <div key={blog.id} style={blogCardStyle}>
                  <h4>{blog.title}</h4>
                  <div style={{ marginTop: '10px' }}>
                    <button onClick={() => handleView(blog.id)} style={buttonStyle}>View</button>
                    <button onClick={() => handleUpdate(blog.id)} style={buttonStyle}>Update</button>
                    <button onClick={() => handleDelete(blog.id)} style={{ ...buttonStyle, background: '#e63946' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
  padding: '15px 30px', // Reduced padding
  position: 'relative'
};

const profileStyle = {
  display: 'flex',
  alignItems: 'center'
};

const avatarStyle = {
  width: '30px', // Reduced size
  height: '30px', // Reduced size
  borderRadius: '50%',
  marginRight: '10px'
};

const titleStyle = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  margin: 0,
  fontSize: '20px' // Reduced font size
};

const newButtonStyle = {
  background: '#1d3557',
  color: 'white',
  padding: '8px 14px', // Reduced padding
  borderRadius: '6px', // Slightly reduced border radius
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px' // Smaller font size for buttons
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '8px' // Reduced space between buttons
};

const blogsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px', // Space between cards
  justifyContent: 'space-between' // Ensure cards are spread out
};

const blogCardStyle = {
  width: '45%', // Two cards per row
  border: '1px solid #ccc',
  padding: '15px', // Reduced padding
  marginBottom: '15px', // Reduced margin
  borderRadius: '8px', // Slightly smaller border radius
};

const buttonStyle = {
  marginRight: '8px', // Reduced spacing
  padding: '6px 12px', // Reduced padding
  borderRadius: '5px', // Slightly smaller border radius
  border: 'none',
  background: '#457b9d',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '13px' // Smaller font size for buttons
};

export default DashboardPage;
