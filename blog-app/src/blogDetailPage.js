import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import blogService from './blogService';
import { Filter } from 'bad-words';

function BlogDetailPage() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  const filter = new Filter(); // bad-words instance

  useEffect(() => {
    blogService.getPost(id)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        navigate('/'); // Navigate back to the home page in case of error
      });
  }, [id, navigate]);

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    if (filter.isProfane(newComment)) {
      alert('Your comment contains inappropriate language.');
      return;
    }

    const comment = {
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#1d3557',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative',
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
  };

  const mainStyle = {
    padding: '20px 40px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f1f2f6',
    color: '#2f3542',
    minHeight: 'calc(100vh - 80px)',
  };

  const postStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  };

  const commentBoxStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const commentInputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    resize: 'vertical',
  };

  const commentButtonStyle = {
    ...buttonStyle,
    borderRadius: '5px',
  };

  const commentItemStyle = {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>view Blog</div>
        <nav style={navStyle}>
          <button style={buttonStyle} onClick={() => navigate('/')}>Home</button>
        </nav>
      </header>

      <main style={mainStyle}>
        <div style={postStyle}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <span>By {post.author}</span>
        </div>

        <div style={commentBoxStyle}>
          <h3>Leave a Comment</h3>
          <textarea
            style={commentInputStyle}
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button style={commentButtonStyle} onClick={handlePostComment}>
            Post Comment
          </button>

          <div>
            <h4>Comments</h4>
            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map((comment, index) => (
              <div key={index} style={commentItemStyle}>
                <p>{comment.text}</p>
                <small>{comment.timestamp}</small>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default BlogDetailPage;
