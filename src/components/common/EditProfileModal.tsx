import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { Icon } from "@iconify/react";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (profileData: EditedProfile) => void;
  initialData: {
    fullName: string;
    username: string;
    bio: string;
    profile_pic: string | null;
  };
}

interface EditedProfile {
  fullName: string;
  username: string;
  bio: string;
  profile_pic: string | null;
  newProfilePic?: File;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1e1e1e',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    fullName: '',
    username: '',
    bio: '',
    profile_pic: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedProfile(initialData);
    setPreviewUrl(initialData.profile_pic);
  }, [initialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditedProfile(prev => ({ ...prev, newProfilePic: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-profile-modal"
      aria-describedby="modal-to-edit-user-profile"
    >
      <Box sx={style}>
        <Typography id="edit-profile-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit profile
        </Typography>
        <Box sx={{ 
          width: '100%', 
          height: 100, 
          background: 'linear-gradient(45deg, #8fbc8f 30%, #90ee90 90%)', 
          borderRadius: '10px 10px 0 0',
          mb: 2,
          position: 'relative'
        }}>
          <Avatar
            alt={editedProfile.fullName}
            src={`http://localhost:5000/uploads/${previewUrl}` || undefined}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              bottom: -50,
              left: 20,
              border: '4px solid #1e1e1e',
              cursor: 'pointer',
            }}
            onClick={handleAvatarClick}
          >
            {!previewUrl && 
              <Icon icon="mdi:user-circle" style={{ fontSize: 100 }} />
            }
          </Avatar>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </Box>
        <Box sx={{ mt: 8 }}>
          <TextField
            autoFocus
            margin="dense"
            name="fullName"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editedProfile.fullName}
            onChange={handleInputChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={editedProfile.username}
            onChange={handleInputChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={editedProfile.bio}
            onChange={handleInputChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ color: 'white', mr: 1 }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: 'green', color: 'white' }}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;