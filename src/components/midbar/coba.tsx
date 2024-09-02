import React, { useState } from 'react';
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';

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
  }
  
  interface PostProps {
    posts: Post[];
  }

const Post: React.FC<PostProps> = ({ posts: initialPosts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);

  const handleLikeUnlike = async (event: React.MouseEvent, postId: number) => {
    event.stopPropagation();
    try {
      const postIndex = posts.findIndex(p => p.id === postId);
      const post = posts[postIndex];
      const isLiked = post._count.likes > 0;  // This is a simplification. Ideally, you'd track if the current user has liked the post.

      // Optimistic update
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts[postIndex] = {
          ...post,
          _count: {
            ...post._count,
            likes: isLiked ? post._count.likes - 1 : post._count.likes + 1
          }
        };
        return newPosts;
      });

      // API call
      if (isLiked) {
        await axios.delete(`http://localhost:5000/post/${postId}/like`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post(`http://localhost:5000/post/${postId}/like`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      // If the API call fails, you might want to revert the optimistic update here
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Revert the optimistic update if there's an error
      setPosts(initialPosts);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {posts.map((post) => (
        <Box
          key={post.id}
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
          <Avatar src={post.author.profile_pic || undefined} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "10px" }}>
            <Typography>
              {post.author.fullName}{" "} 
              <Typography component="span" color="gray"> 
                • @{post.author.username} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </Typography>
            </Typography>
            <Typography>{post.content}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={(e) => handleLikeUnlike(e, post.id)}>
                {post._count.likes > 0 ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography>{post._count.likes}</Typography>
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