import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Avatar, Box, Button, CircularProgress, Typography } from "@mui/material";
import useAllUsers from "../rightbar/hooks/useAllSuggest";
import { useFollowUser } from "../../hooks/useFollowUser";
import { Icon } from "@iconify/react/dist/iconify.js";
// import useStore from "../../store/hooks";

interface Followers{
    followersId: number
    follower: {
        id: number
        fullName: string
        profile_pic: string
        username: string
    }
}


const Followers = () => {

    const [followers, setFollowers] = useState<Followers[]>([])
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

    const followersFunc = async () => {
        const res = await api.get(`/follow/followers/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });


        setFollowers(res.data)
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
        followersFunc()
        getUser()
    }, [followers])

    if (loading) {
        return <CircularProgress />;
      }
    
      if (error) {
        return <Typography color="error">{error}</Typography>;
      }



    return (
        <Box>
            {/* {following.length === 0 && <Typography variant="body1">No following</Typography>} */}
            {followers.map((follow) => (
                <Box
                key={follow.follower.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Avatar
                  alt={follow.follower.fullName}
                  src={follow.follower.profile_pic || undefined}
                  sx={{ width: '50px', height: '50px', marginRight: '20px', backgroundColor: 'grey' }}
                >
                  {!follow.follower.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 50 }} />}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{follow.follower.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">@{follow.follower.username}</Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => toggleFollow(follow.follower.id)}
                  disabled={actionLoading[follow.follower.id]}
                  sx={{
                    backgroundColor: followStatus[follow.follower.id] ? 'green' : 'yellow',
                    color: followStatus[follow.follower.id] ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: followStatus[follow.follower.id] ? 'darkgreen' : 'gold',
                    },
                  }}
                >
                  {actionLoading[follow.follower.id] 
                    ? 'Loading...' 
                    : followStatus[follow.follower.id] 
                      ? 'Followed' 
                      : 'Follow'}
                </Button>
              </Box>
            ))}
        </Box>
    )

}

export default Followers