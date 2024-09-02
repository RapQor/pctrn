import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Avatar, Box, Button, CircularProgress, Typography } from "@mui/material";
import useAllUsers from "../rightbar/hooks/useAllSuggest";
import { useFollowUser } from "../../hooks/useFollowUser";
import { Icon } from "@iconify/react/dist/iconify.js";
// import useStore from "../../store/hooks";

interface Following{
    followingId: number
    following: {
        id: number
        fullName: string
        profile_pic: string
        username: string
    }
}


const Following = () => {

    const [following, setFollowing] = useState<Following[]>([])
    const [userId, setUserId] = useState(0)
    const { users, loading, error, fetchUsers } = useAllUsers();
  const { followStatus, actionLoading, fetchFollowStatus, toggleFollow } = useFollowUser();
  const [refreshFlag, setRefreshFlag] = useState(false);

    const getUser = async () => {
        const res = await api.get(`/user/current-user`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // console.log(res.data.data.id);
        setUserId(res.data.data.id)
        
    }

    const followingFunc = async () => {
        const res = await api.get(`/follow/following/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });


        setFollowing(res.data)
        console.log(res.data);
        
    }

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

    useEffect(() => {
        followingFunc()
        getUser()
    }, [following])

    if (loading) {
        return <CircularProgress />;
      }
    
      if (error) {
        return <Typography color="error">{error}</Typography>;
      }



    return (
        <Box>
            {/* {following.length === 0 && <Typography variant="body1">No following</Typography>} */}
            {following.map((follow) => (
                <Box
                key={follow.following.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Avatar
                  alt={follow.following.fullName}
                  src={follow.following.profile_pic || undefined}
                  sx={{ width: '50px', height: '50px', marginRight: '20px', backgroundColor: 'grey' }}
                >
                  {!follow.following.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 50 }} />}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{follow.following.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">@{follow.following.username}</Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => toggleFollow(follow.following.id)}
                  disabled={actionLoading[follow.following.id]}
                  sx={{
                    backgroundColor: followStatus[follow.following.id] ? 'green' : 'yellow',
                    color: followStatus[follow.following.id] ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: followStatus[follow.following.id] ? 'darkgreen' : 'gold',
                    },
                  }}
                >
                  {actionLoading[follow.following.id] 
                    ? 'Loading...' 
                    : followStatus[follow.following.id] 
                      ? 'Followed' 
                      : 'Follow'}
                </Button>
              </Box>
            ))}
        </Box>
    )

}

export default Following