import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, CircularProgress, IconButton } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { api } from '../../lib/api';
import { Icon } from '@iconify/react/dist/iconify.js';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

interface UserPosts {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    profile_pic: string | null;
  };
  _count: {
    likes: number;
    comment: number;
  };
  images: [{
    image: string
  }];
}

interface UserPostsProps {
  userId: number;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const [posts, setPosts] = useState<UserPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        console.log('userId: ' + userId);
        
        const response = await api.get(`/post/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Box key={post.id} sx={{ borderBottom: '1px solid #333', py: 2 }}>
            <Box sx={{paddingLeft: 2, paddingRight: 2}}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={post.author?.profile_pic || undefined}
                  sx={{ mr: 1 }}
                >
                  {!post.author?.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 40 }} />}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">@{post.author.username}</Typography>
                  <Typography variant="caption" color="gray">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </Typography>
                </Box>
              </Box>
              {post.images && post.images.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.image}
                    alt={`post image ${index + 1}`}
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                ))}
              </Box>
            )}
              <Typography variant="body1">{post.content}</Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton size="small">
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {post._count.likes}
                </Typography>
                <IconButton size="small">
                  <CommentIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption">
                  {post._count.comment}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>No posts yet.</Typography>
      )}
    </Box>
  );
};

export default UserPosts;