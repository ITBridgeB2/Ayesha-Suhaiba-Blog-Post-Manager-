import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // Disable body scrolling when this component mounts
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scroll on unmount
    };
  }, []);

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
    //position: 'relative',
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

  const logoImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
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
    overflow: 'hidden',
  };

  const h1Style = {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
  };

  const boxContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const topicBoxStyle = {
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',  // Change to column to align image on top and title on bottom
    justifyContent: 'flex-end',  // Align content at the bottom of the box
    alignItems: 'center',  // Center content horizontally
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1d3557',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s',
  };

  const imageStyle = {
    width: '250px',  // Adjust size of image
    height: '250px',  // Adjust size of image
    marginBottom: '10px',  // Add space between image and title
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const topics = [
    {
      name: 'Fitness',
      image: 'https://i.ytimg.com/vi/l8dvg4KSvFE/maxresdefault.jpg',
    },

    {
      name: 'Travel',
      image: 'https://www.wns.co.za/Portals/0/Images/HeaderBanner/desktop/1087/53/travel_HD.jpg',
    },
    {
      name: 'Food',
      image: 'https://wallpapercave.com/wp/wp9465718.jpg',
    },
  ];

  return (
    <div>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          <img
            src="blog.jpg"
            alt="Logo"
            style={logoImageStyle}
          />
          MyBlog
        </div>
        <nav style={navStyle}>
          <button style={buttonStyle} onClick={() => navigate('/login')}>Login</button>
          <button style={buttonStyle} onClick={() => navigate('/register')}>Register</button>
        </nav>
      </header>

      <main style={mainStyle}>
        <h1 style={h1Style}>Explore Our Topics</h1>
        <section style={boxContainerStyle}>
          {topics.map((topic, index) => (
            <div
              key={index}
              style={topicBoxStyle}
              onClick={() => navigate(`/topics/${topic.name.toLowerCase()}`)}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <img src={topic.image} alt={topic.name} style={imageStyle} />
              <span>{topic.name}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
