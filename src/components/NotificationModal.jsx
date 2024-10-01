import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationSystem from './Notification'; // This would be your notification fetch logic
import { useSelector } from 'react-redux';
import NotificationManager from './NotificationManager';

const NotificationModal = ({ open, handleClose }) => {
    const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-notifications-title"
      aria-describedby="modal-notifications-description"
    >
      <Box sx={styles.modalBox}>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Content */}
        <Typography id="modal-notifications-title" variant="h6" component="h2">
          Notifications
        </Typography>
        <div style={styles.scrollableContainer}>
          <NotificationManager loggedInUserId={authSelector?.user?.id} />
        </div>
        
      </Box>
    </Modal>
  );
};

// MUI modal box styling
const styles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: 2,
    outline: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  scrollableContainer: {
    maxHeight: '300px', // Set a maximum height
    overflowY: 'auto', // Enable vertical scrolling
    marginTop: '16px', // Add some margin for spacing
  },
};

export default NotificationModal;
