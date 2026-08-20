import {
    Modal,
    Button,
    Text,
    Group,
} from '@mantine/core';

function DeletePostModal({
    opened,
    onClose,
    onConfirm,
    loading,
}) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Delete Post"
            centered
            size="sm"
        >
            <Text mb="lg">
                Are you sure you want to delete this post?
                This action cannot be undone.
            </Text>

            <Group justify="flex-end">

                <Button
                    variant="default"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    color="red"
                    onClick={onConfirm}
                    loading={loading}
                >
                    Delete
                </Button>

            </Group>
        </Modal>
    );
}

export default DeletePostModal;