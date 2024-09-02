import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { api } from '../../lib/api'; // Pastikan path ini sesuai
import { Icon } from '@iconify/react/dist/iconify.js';

interface UserReplies {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    profile_pic: string | null;
  } | null; // author bisa null
  parentPost: {
    id: number;
    content: string;
    author: {
      username: string;
    } | null; // parentPost author bisa null
  } | null; // parentPost bisa null
}

interface UserRepliesProps {
  userId: number;
}

const UserReplies: React.FC<UserRepliesProps> = ({ userId }) => {
  const [replies, setReplies] = useState<UserReplies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserReplies = async () => {
      try {
        const response = await api.get(`/reply/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setReplies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user replies:', err);
        setError('Failed to fetch replies');
        setLoading(false);
      }
    };

    fetchUserReplies();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {replies.length > 0 ? (
        replies.map((reply) => (
          <Box key={reply.id} sx={{ borderBottom: '1px solid #333', py: 2 }}>
            <Box sx={{paddingLeft: 2, paddingRight: 2}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                src={reply.author?.profile_pic || undefined} // Gunakan optional chaining
                sx={{ mr: 1 }}
              >
                {!reply.author?.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 40 }} />}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">@{reply.author?.username || 'Unknown'}</Typography> {/* Nilai default 'Unknown' */}
                <Typography variant="caption" color="gray">
                  {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Replying to @{reply.parentPost?.author?.username || 'Unknown'} {/* Nilai default 'Unknown' */}
            </Typography>
            <Typography variant="body1">{reply.content}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>No replies yet.</Typography>
      )}
    </Box>
  );
};

export default UserReplies;
