import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homePage';
import LoginPage from './loginForm';
import RegisterPage from './registraionForm';
import DashboardPage from './dashBoardPage';
import PostBlog from './postBlog';
import ViewBlogPage from './viewBlog';
import UpdateBlog from './updateBlog'
import TopicPage from './topicPage';
import BlogDetailPage from './blogDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/updateblog/:id" element={<UpdateBlog/>} />
         <Route path="/topics/:topic" element={<TopicPage />} />
        <Route path="/post/:id" element={<BlogDetailPage/>} />
        <Route path="/viewblog/:id" element={<ViewBlogPage />} />
        <Route path="/postblog" element={<PostBlog />} />
        <Route path="/dash" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
