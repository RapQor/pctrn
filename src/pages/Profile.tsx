import React, { useState } from 'react';
import { Box, Avatar, Typography, Button, Tabs, Tab } from '@mui/material';
import { Icon } from "@iconify/react";
import useUserProfile from '../components/rightbar/hooks/useUserProfile';
import UserPosts from '../components/profile/UserPost';
import UserReplies from '../components/profile/UserReplies';
import EditProfileModal from '../components/common/EditProfileModal';
import { api } from '../lib/api';
import Media from './Media';

const Profile: React.FC = () => {
  const { profile, loading, error, refetch } = useUserProfile();
  const [activeTab, setActiveTab] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setActiveTab(newValue);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveProfile = async (editedProfile: { fullName: string; username: string; bio: string; newProfilePic?: File }) => {
    try {
      const formData = new FormData();
      formData.append('fullName', editedProfile.fullName);
      formData.append('username', editedProfile.username);
      formData.append('bio', editedProfile.bio);
      if (editedProfile.newProfilePic) {
        formData.append('profile_pic', editedProfile.newProfilePic);
      }

      await api.patch(`/users/user/update-profile/${profile?.id}`, formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      await refetch(); // Use the refetch function from the hook
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!profile) return null;

  return (
    <Box sx={{margin: 'auto', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Profile Header */}
      <Box sx={{ position: 'relative', height: "500px", 
                 background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', 
                 borderRadius: '10px 10px 0 0' }}>
        <Avatar
          alt={profile?.fullName}
          src={`http://localhost:5000/uploads/${profile?.profile_pic}` || undefined}
          sx={{
            width: 100,
            height: 100,
            position: 'absolute',
            left: 20,
            bottom: -50,
            border: '4px solid #1e1e1e',
          }}
        >
          {!profile?.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 100 }} />}
        </Avatar>
      </Box>

      {/* Profile Info */}
      <Box sx={{ mt: 7, px: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{profile?.fullName}</Typography>
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ borderRadius: 20, color: 'black', bgcolor: 'yellow' }}
            onClick={handleOpenEditModal}
          >
            Edit Profile
          </Button>
        </Box>
        <Typography sx={{ color: 'lightgrey' }}>@{profile?.username}</Typography>
        <Typography sx={{ mt: 2 }}>{ profile?.bio ||'pickled over by the worms, and weird fishes'}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Typography>{profile?.followingCount || 0} Following</Typography>
        <Typography>{profile?.followersCount || 0} Followers</Typography>
        </Box>
      </Box>

      {/* Tabs for Posts and Replies */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="profile tabs">
          <Tab label="Posts" />
          <Tab label="Replies" />
          <Tab label="Media" />
        </Tabs>
      </Box>

      {/* Content based on active tab */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <UserPosts userId={profile.id} />
          )}
          {activeTab === 1 && (
            <UserReplies userId={profile.id} />
          )}
          {activeTab === 2 && (
            <Media/>
          )}
        </Box>
      </Box>

      <EditProfileModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onSave={handleSaveProfile}
        initialData={{
          fullName: profile.fullName,
          username: profile.username,
          bio: profile.bio || '',
          profile_pic: profile.profile_pic
        }}
      />

    </Box>
  );
};

export default Profile;