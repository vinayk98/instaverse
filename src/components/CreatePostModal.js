import { useState } from 'react';
import {
    Modal,
    TextInput,
    Select,
    Textarea,
    Button,
    Stack,
} from '@mantine/core';
import {
    STATUS_MESSAGES
} from '../constant';
import { notifications } from '@mantine/notifications';
import { BASE_URL } from '../constant';

function CreatePostModal({ opened, onClose, onPostCreated }) {
    const [imageUrl, setImageUrl] = useState('');
    const user_id = localStorage.getItem('user_id');
    const [imageUrlType, setImageUrlType] = useState('absolute');
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageUrl.trim() || !caption.trim()) {
            notifications.show({
                title: 'Error',
                message: 'Please fill all required fields',
                color: 'red',
            });

            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem('access_token');

            const response = await fetch(`${BASE_URL}/post/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    image_url: imageUrl,
                    image_url_type: imageUrlType,
                    caption: caption,
                    creator_id: Number(user_id)
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || 'Failed to create post'
                );
            }

            notifications.show({
                title: 'Success',
                message: STATUS_MESSAGES[200],
                color: 'green',
            });

            // Clear form
            setImageUrl('');
            setImageUrlType('absolute');
            setCaption('');

            // Refresh posts
            if (onPostCreated) {
                onPostCreated();
            }
            onClose();
        } catch (error) {
            console.error('Create post error:', error);

            notifications.show({
                title: 'Error',
                message: error.message || 'Something went wrong',
                color: 'red',
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Create New Post"
            centered
            size="md"
            radius="lg"
        >
            <form onSubmit={handleSubmit}>

                <Stack gap="md">

                    {/* Image URL */}
                    <TextInput
                        label="Image URL"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) =>
                            setImageUrl(e.currentTarget.value)
                        }
                        required
                    />

                    {/* Image URL Type */}
                    <Select
                        label="Image URL Type"
                        placeholder="Select image URL type"
                        value={imageUrlType}
                        onChange={setImageUrlType}
                        data={[
                            {
                                value: 'absolute',
                                label: 'Absolute',
                            },
                            {
                                value: 'relative',
                                label: 'Relative',
                            },
                        ]}
                        required
                    />

                    {/* Caption */}
                    <Textarea
                        label="Caption"
                        placeholder="Write something about your post..."
                        value={caption}
                        onChange={(e) =>
                            setCaption(e.currentTarget.value)
                        }
                        minRows={4}
                        autosize
                        required
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        fullWidth
                        size="md"
                        radius="md"
                        loading={loading}
                    >
                        {loading ? 'Creating Post...' : 'Create Post'}
                    </Button>

                </Stack>

            </form>
        </Modal>
    );
}

export default CreatePostModal;