import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
// import axios from 'axios';
import useUserProfile from '../rightbar/hooks/useUserProfile';
import { Icon } from '@iconify/react/dist/iconify.js';
import { api } from '../../lib/api';

interface Author {
  id: number;
  fullName: string;
  username: string;
  profile_pic: string | null;
}

interface Post {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  parentId: number | null;
  author: Author;
  _count: {
    comment: number;
    likes: number;
  };
  images: [{
    image: string
  }];
}

interface PostProps {
  posts: Post[];
}

const Post: React.FC<PostProps> = ({ posts }) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState<{[key: number]: number}>({});
  const [userLikes, setUserLikes] = useState<{[key: number]: boolean}>({});

  const { profile} = useUserProfile();
  
  useEffect(() => {
    // Fetch initial like status for each post
    const fetchLikeStatus = async () => {
      const likeStatus: {[key: number]: boolean} = {};
      for (const post of posts) {
        try {
          const response = await api.get(`/post/${post.id}/like/check`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          likeStatus[post.id] = response.data.hasLiked;
        } catch (error) {
          console.error("Error fetching like status:", error);
        }
      }
      setUserLikes(likeStatus);
    };
    fetchLikeStatus();
  }, [posts]);

  const handleLikeUnlike = async (event: React.MouseEvent, postId: number) => {
    event.stopPropagation();
    try {
      const currentLikes = likesCount[postId] ?? posts.find(p => p.id === postId)?._count.likes ?? 0;
      const isLiked = userLikes[postId];

      // Optimistic update
      setLikesCount(prev => ({
        ...prev,
        [postId]: isLiked ? currentLikes - 1 : currentLikes + 1
      }));
      setUserLikes(prev => ({
        ...prev,
        [postId]: !isLiked
      }));

      // API call
      if (isLiked) {
        await api.delete(`/post/${postId}/like`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await api.post(`/post/${postId}/like`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Revert the optimistic update if there's an error
      setLikesCount(prev => ({
        ...prev,
        [postId]: posts.find(p => p.id === postId)?._count.likes ?? 0
      }));
      setUserLikes(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {posts.map((post) => (
        <Box key={post.id}
          onClick={() => navigate("/detail/" + post.id)}
          sx={{
            cursor: "pointer",
            borderBottom: "1px solid gray",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
          }}
        >
          <Avatar
             alt="Profile Picture"
             src={`http://localhost:5000/uploads/${profile?.profile_pic}` || undefined}
             sx={{
               width: 50,
               height: 50,
               backgroundColor: 'grey',
               marginRight: 1,
             }}
           >
             {!profile?.profile_pic && <Icon icon="mdi:user-circle" style={{ fontSize: 70 }} />}
           </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "10px" }}>
            <Typography>
              {post.author.fullName}{" "} 
              <Typography component="span" color="gray"> 
                • @{post.author.username} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </Typography>
            </Typography>
            {post.images?.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                {post.images.map((image, index) => (
                  <img
                  key={index}
                  src={`http://localhost:5000/uploads/${image.image}`}
                  alt={`post image ${index + 1}`}
                  style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                  // <Typography>{image.image}</Typography>

                ))} 
              </Box>
            )}
            <Typography>{post.content}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={(e) => handleLikeUnlike(e, post.id)}>
              {userLikes[post.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography>{likesCount[post.id] ?? post._count.likes}</Typography>
              <IconButton onClick={(e) => { e.stopPropagation(); navigate("/detail/" + post.id); }}>
                <CommentIcon />
              </IconButton>
              <Typography>{post._count.comment}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Post;