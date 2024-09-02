import { Avatar, Box, Button, Typography, CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useUserProfile from '../../components/rightbar/hooks/useUserProfile'; // Adjust the path as needed
import EditProfileModal from "../common/EditProfileModal";
import { useState } from "react";
import { api } from "../../lib/api";

const RightProfile = () => {
  const navigate = useNavigate();
  const { profile, loading, error, refetch } = useUserProfile();
  
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSaveProfile = async (editedProfile: { fullName: string; username: string; bio: string }) => {
    try {
      await api.put(`/user/update-profile/${profile?.id}`, editedProfile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      await refetch(); // Use the refetch function from the hook
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  if (!profile) return null;

  return (
    <Box 
      sx={{backgroundColor: "grey", padding: "10px", height: "50vh", borderRadius: "10px"}}
    >
      <h2 style={{marginBottom: "10px"}}>My Profile</h2>

      <Box
        sx={{
          position: 'relative',
          width: 'auto',
          height: 100,
          backgroundColor: 'yellow',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          cursor: "pointer"
        }}
        onClick={handleProfileClick}
      >
        <Avatar
          alt="Profile Picture"
          src={`http://localhost:5000/uploads/${profile?.profile_pic}` || undefined}
          sx={{
            width: 70,
            height: 70,
            position: 'absolute',
            left: 15,
            bottom: -25,
            backgroundColor: 'grey',
          }}
        >
          {!profile?.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 70 }} />}
        </Avatar>
      </Box>

      <Box sx={{display: "flex", alignItems: "right", justifyContent: "flex-end", paddingRight: "10px"}}>
        <Button 
          variant="contained"
          sx={{
            margin: "10px 0",
            backgroundColor: "yellow",
            height: "30px",
            borderRadius: "20px"}
          }
          onClick={handleOpenEditModal}
        >
          Edit Profile
        </Button>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "center",
        gap: "3px",
        padding: "10px",
        backgroundColor: "black",
      }}>
        <Typography variant="h4" sx={{fontWeight: "bold"}}>{profile?.fullName}</Typography>
        <Typography sx={{color: "lightgrey"}}>@{profile?.username}</Typography>
        <Typography sx={{color: "lightgrey"}}>{profile?.bio || 'pickled over by the worms, and weird fishes'}</Typography>
        
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}>
          <Typography sx={{color: "lightgrey", width: "50%"}}>{profile?.followingCount || 0} Following</Typography>
          <Typography sx={{color: "lightgrey", width: "50%"}}>{profile?.followersCount || 0} Followers</Typography>
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

export default RightProfile;