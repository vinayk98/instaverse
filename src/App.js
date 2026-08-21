import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { BASE_URL } from './constant';
import PostDetail from './pages/PostDetail/PostDetail';
import CreatePostModal from './components/CreatePostModal';
import TopNav from './components/TopNav';
import PostCard from './components/PostCard';
import AuthModal from './components/AuthModal';
import Settings from "./pages/settings/Settings";
function App() {

  const [blogs, setBlogs] = useState([]);

  const [authModal, setAuthModal] = useState(false);

  const [modalType, setModalType] = useState('');

  const [createPostModal, setCreatePostModal] = useState(false);


  // =========================
  // FETCH ALL POSTS
  // =========================

  const fetchBlogs = () => {

    fetch(`${BASE_URL}/post/all`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });

  };


  useEffect(() => {
    fetchBlogs();
  }, []);


  // =========================
  // HOME PAGE
  // =========================

  const Home = () => {

    return (
      <div className="blogs-container">

        {blogs && blogs.length > 0 ? (

          blogs.map((blog) => (

            <PostCard
              key={blog.id}
              post={blog}
              onCommentAdded={fetchBlogs}
              onDelete={fetchBlogs}
            />

          ))

        ) : (

          <div className="no-blogs">

            <h2>No Post Found</h2>

            <p>
              There are no posts available right now.
            </p>

          </div>

        )}

      </div>
    );

  };


  return (

    <div className="App">

      {/* =========================
          TOP NAVIGATION
      ========================= */}

      <TopNav
        setAuthModal={setAuthModal}
        setModalType={setModalType}
        setCreatePostModal={setCreatePostModal}
      />


      {/* =========================
          AUTH MODAL
      ========================= */}

      <AuthModal
        opened={authModal}
        onClose={() => setAuthModal(false)}
        type={modalType}
      />


      {/* =========================
          CREATE POST MODAL
      ========================= */}

      <CreatePostModal
        opened={createPostModal}
        onClose={() => setCreatePostModal(false)}
        onPostCreated={fetchBlogs}
      />


      {/* =========================
          ROUTES
      ========================= */}

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/post/:id"
          element={<PostDetail />}
        />
      </Routes>
    </div>

  );
}

export default App;