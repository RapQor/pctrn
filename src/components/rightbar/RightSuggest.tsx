import { useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import useAllUsers from '../../components/rightbar/hooks/useAllSuggest';
import { useFollowUser } from '../../hooks/useFollowUser'; // Adjust the import path as needed

interface User {
  id: number;
  fullName: string;
  username: string;
  profile_pic?: string;
}

const RightSuggest = () => {
  const { users, loading, error, fetchUsers } = useAllUsers();
  const { followStatus, actionLoading, fetchFollowStatus, toggleFollow } = useFollowUser();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    if (users) {
      fetchFollowStatus(users.map(user => user.id));
    }
  }, [users, fetchFollowStatus]);

  useEffect(() => {
    const handleRefresh = () => {
      setRefreshFlag(prev => !prev);
    };

    window.addEventListener('refreshRightSuggest', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshRightSuggest', handleRefresh);
    };
  }, []);

  useEffect(() => {
    fetchUsers(); // Fetch users again when refreshFlag changes
  }, [refreshFlag]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ height: '40vh', display: 'flex', flexDirection: 'column', backgroundColor: 'grey', borderRadius: '10px', overflow: 'auto' }}>
      <Box sx={{ padding: '15px' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>Your Suggestion</Typography>
        {users.map((user: User) => (
          <Box
            key={user.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Avatar
              alt={user.fullName}
              src={user.profile_pic || undefined}
              sx={{ width: '50px', height: '50px', marginRight: '20px', backgroundColor: 'grey' }}
            >
              {!user.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 50 }} />}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{user.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">@{user.username}</Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={() => toggleFollow(user.id)}
              disabled={actionLoading[user.id]}
              sx={{
                backgroundColor: followStatus[user.id] ? 'green' : 'yellow',
                color: followStatus[user.id] ? 'white' : 'black',
                '&:hover': {
                  backgroundColor: followStatus[user.id] ? 'darkgreen' : 'gold',
                },
              }}
            >
              {actionLoading[user.id] 
                ? 'Loading...' 
                : followStatus[user.id] 
                  ? 'Followed' 
                  : 'Follow'}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RightSuggest;