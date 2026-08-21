import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constant';
import './PostDetail.css';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError('');

                const token = localStorage.getItem('access_token');

                const response = await fetch(
                    `${BASE_URL}/post/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Post not found');
                    }

                    throw new Error('Failed to fetch post');
                }

                const data = await response.json();

                setPost(data);

            } catch (error) {
                console.log('Error fetching post:', error);
                setError(error.message || 'Unable to load post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="post-detail-page">
                <p>Loading post...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="post-detail-page">

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="post-error">
                    <h2>{error}</h2>
                </div>

            </div>
        );
    }

    if (!post) {
        return (
            <div className="post-detail-page">

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <p>Post not found.</p>

            </div>
        );
    }

    return (
        <div className="post-detail-page">

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="post-detail-card">

                {/* Image */}
                {post.image_url && (
                    <div className="post-detail-image">

                        <img
                            src={
                                post.image_url.startsWith('http')
                                    ? post.image_url
                                    : `${BASE_URL}/${post.image_url}`
                            }
                            alt={post.title || 'Post'}
                        />

                    </div>
                )}

                {/* Content */}
                <div className="post-detail-content">

                    <h1>
                        {post.title}
                    </h1>

                    <p className="post-detail-description">
                        {post.content}
                    </p>

                    <div className="post-detail-info">

                        <span>
                            By {post.user?.username || 'N/A'}
                        </span>

                        {post.created_at && (
                            <span>
                                {new Date(
                                    post.created_at
                                ).toLocaleDateString()}
                            </span>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PostDetail;