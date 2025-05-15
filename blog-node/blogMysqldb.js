import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const blogapp = express();
const JWT_SECRET = 'your_jwt_secret'; // In real apps, store this securely (e.g., env file)

// Middleware
blogapp.use(cors());
blogapp.use(express.json());
blogapp.use(express.urlencoded({ extended: true }));

// ==================== INIT DB AND SERVER ====================
let db;

async function initDb() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'itbridge',
    });
    console.log('Connected to MySQL');
  } catch (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
}

async function startServer() {
  await initDb();

  // ====================== ROUTES ======================

  // Register new user
  blogapp.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Register request:', req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const sql = 'INSERT INTO blog_users (name, email, password) VALUES (?, ?, ?)';
      await db.execute(sql, [name, email, password]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Login
  blogapp.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const [rows] = await db.execute(
        'SELECT id, name, email, password FROM blog_users WHERE email = ?',
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = rows[0];
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Protected Dashboard
  blogapp.get('/dashboard', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;

      const [rows] = await db.execute('SELECT id, name, email FROM blog_users WHERE id = ?', [userId]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(rows[0]);
    } catch (err) {
      console.error('Token verification failed:', err);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  });

  // Create a new blog post
  blogapp.post('/posts', async (req, res) => {
    const { title, content, author, category } = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: 'Title, content, author, and category are required' });
    }

    try {
      const sql = 'INSERT INTO posts (title, content, author, category) VALUES (?, ?, ?, ?)';
      await db.execute(sql, [title, content, author, category]);
      res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
      console.error('Post creation error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get all posts
  blogapp.get('/posts', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC');
      res.status(200).json(rows);
    } catch (err) {
      console.error('Fetching posts error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get single post by ID
  blogapp.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
      const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [postId]);
      if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error('Fetching post error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update post
  blogapp.put('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    try {
      const [result] = await db.execute(
        'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?',
        [title, content, category, postId]
      );

      if (result.affectedRows === 0) return res.status(404).json({ message: 'Post not found' });

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      console.error('Update post error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete post
  blogapp.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
      const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [postId]);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error('Delete post error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get posts by author
  blogapp.get('/posts/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
      const [rows] = await db.execute(
        'SELECT * FROM posts WHERE author = ? ORDER BY created_at DESC',
        [author]
      );
      if (rows.length === 0) return res.status(404).json({ message: 'No posts found for this author' });
      res.status(200).json(rows);
    } catch (err) {
      console.error(' Fetching posts by author error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get posts by category
  blogapp.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
      const [rows] = await db.execute(
        'SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC',
        [category]
      );
      if (rows.length === 0) return res.status(404).json({ message: `No posts found for category ${category}` });
      res.status(200).json(rows);
    } catch (err) {
      console.error('Fetching posts by category error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Start server
  blogapp.listen(9898, () => console.log(' Server running on port 9898'));
}

startServer();
