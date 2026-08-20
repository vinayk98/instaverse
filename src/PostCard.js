import { useState } from 'react';
import {
    Avatar,
    Button,
    Group,
    TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash, IconSend } from '@tabler/icons-react';
import { BASE_URL } from './constant';
import './PostCard.css';

function PostCard({ post, onCommentAdded, onDelete }) {
    const token = localStorage.getItem('access_token');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const getUsername = () => {
        if (!post?.user?.username) {
            return 'Unknown User';
        }

        return (
            post.user.username.charAt(0).toUpperCase() +
            post.user.username.slice(1)
        );
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const handleComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${BASE_URL}/comment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: post?.user?.username,
                        text: comment,
                        post_id: post.id,
                    }),
                }
            );
            if (response.status !== 200) {
                notifications.show({
                    title: 'Error',
                    message: response.statusText || "Something went wrong",
                    color: 'red',
                });
            }
            if (response.ok) {
                notifications.show({
                    title: 'Success',
                    message: "Comment added successful!",
                });
            }
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            await response.json();

            setComment('');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            await onCommentAdded();
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this post?'
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeleting(true);

            const response = await fetch(
                `${BASE_URL}/post/delete/${post.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },


            );
            if (response.status !== 200) {
                notifications.show({
                    title: 'Error',
                    message: response.statusText || "Something went wrong",
                    color: 'red',
                });
            }
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            if (response.ok) {
                await onCommentAdded();
                notifications.show({
                    title: 'Success',
                    message: "Delete post successful!",
                });
            }
            if (onDelete) {
                onDelete(post.id);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="post-card">
            {/* ================= POST HEADER ================= */}
            <div className="post-header">

                <Group gap="sm">

                    <Avatar
                        radius="xl"
                        color="blue"
                    >
                        {getUsername().charAt(0)}
                    </Avatar>

                    <strong>
                        {getUsername()}
                    </strong>

                </Group>

                <Button
                    color="red"
                    variant="light"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    onClick={handleDelete}
                    loading={deleting}
                >
                    Delete
                </Button>

            </div>


            {/* ================= POST IMAGE ================= */}

            <div className="post-image-container">

                <img
                    src={`${BASE_URL}/${post.image_url}`}
                    alt={post.caption}
                    className="post-image"
                />

            </div>


            {/* ================= CAPTION ================= */}

            <div className="post-caption">

                <strong>
                    {getUsername()} -
                </strong>{' '}

                {post.caption}

            </div>


            {/* ================= POST TIME ================= */}

            <div className="post-time">
                {formatDate(post.timestamp)}
            </div>


            {/* ================= COMMENTS ================= */}

            <div className="comments-section">

                <h4>
                    Comments ({post.comments?.length || 0})
                </h4>

                {post?.comments && post.comments.length > 0 ? (

                    <div className="comments-list">

                        {post.comments.map((comment, index) => {

                            const username =
                                comment.username
                                    ? comment.username.charAt(0).toUpperCase() +
                                    comment.username.slice(1)
                                    : 'Unknown User';

                            return (
                                <div
                                    className="comment"
                                    key={index}
                                >

                                    <strong>
                                        {username}
                                    </strong>

                                    <span>
                                        {comment.text}
                                    </span>

                                    <small>
                                        {formatDate(
                                            comment.timestamp
                                        )}
                                    </small>

                                </div>
                            );
                        })}

                    </div>

                ) : (

                    <p className="no-comments">
                        No comments yet.
                    </p>

                )}

            </div>


            {/* ================= ADD COMMENT ================= */}

            <form
                className="comment-form"
                onSubmit={handleComment}
            >

                <TextInput
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) =>
                        setComment(e.currentTarget.value)
                    }
                    disabled={loading}
                    flex={1}
                />

                <Button
                    type="submit"
                    loading={loading}
                    disabled={!comment.trim()}
                    leftSection={<IconSend size={16} />}
                >
                    Post
                </Button>

            </form>

        </div>
    );
}

export default PostCard;