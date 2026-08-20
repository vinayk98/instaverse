import { useEffect, useState } from 'react';
import './App.css';
import { BASE_URL } from './constant';

import TopNav from './components/TopNav';
import PostCard from './PostCard';
import AuthModal from './components/AuthModal';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [authModal, setAuthModal] = useState(false);
  const [modalType, setModalType] = useState('');
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

  return (
    <div className="App">
      <TopNav
        setAuthModal={setAuthModal}
        setModalType={setModalType}
      />
      <AuthModal
        opened={authModal}
        onClose={() => setAuthModal(false)}
        type={modalType}
      />
      <div className="blogs-container">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <PostCard
              key={blog.id}
              post={blog}
              onCommentAdded={fetchBlogs}
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

    </div>
  );
}

export default App;