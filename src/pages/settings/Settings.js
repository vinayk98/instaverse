import { useEffect, useState } from 'react';
import { Avatar, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant';
import { capitalizeFirstLetter } from '../../utils/utils';
import { useAuth } from '../../context/AuthContext';
import './Settings.css';

function Settings() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { logout } = useAuth();

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const fetchUserPosts = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('access_token');

            const response = await fetch(
                `${BASE_URL}/post/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch user posts');
            }

            const data = await response.json();

            setPosts(data);

        } catch (error) {
            console.log('Error fetching user posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="settings-page">

            {/* Profile Section */}
            <div className="profile-section">

                <Avatar
                    size={100}
                    radius="50%"
                    color="blue"
                >
                    {username?.charAt(0).toUpperCase()}
                </Avatar>

                <div className="profile-info">

                    <h1>
                        {capitalizeFirstLetter(username)}
                    </h1>

                    <p>
                        {email}
                    </p>

                    <p>
                        {posts.length} Posts
                    </p>

                    {/* Logout */}
                    <Button
                        color="blue"
                        variant="outline"
                        size="sm"
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </div>

            </div>


            {/* ================= POSTS ================= */}

            <div className="user-posts-section">

                <h2>
                    Your Posts
                </h2>

                {loading ? (

                    <p>Loading posts...</p>

                ) : posts.length > 0 ? (

                    <div className="posts-gallery">

                        {posts.map((post) => (

                            <div
                                key={post.id}
                                className="gallery-item"
                                onClick={() => handlePostClick(post.id)}
                            >

                                <img
                                    src={
                                        post.image_url?.startsWith('http')
                                            ? post.image_url
                                            : `${BASE_URL}/${post.image_url}`
                                    }
                                    alt={post.title || 'Post'}
                                />

                                <div className="gallery-overlay">
                                    <span>
                                        View Post
                                    </span>
                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="no-user-posts">

                        <h3>
                            No Posts Yet
                        </h3>

                        <p>
                            Create your first post and it will appear here.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Settings;