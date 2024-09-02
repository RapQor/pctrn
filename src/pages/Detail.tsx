import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import axios from 'axios';
import CommentBar from '../components/comment/CommentBar';
import CommentList from '../components/comment/CommentList';
import { api } from '../lib/api';

interface Post {
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
  }]
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    profile_pic: string | null;
  };
}

const DetailIndex = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = React.useCallback(async () => {
    try {
      console.log('Fetching comments for post id:', id);
      const response = await api.get(`/reply/post/${id}`);
      console.log('Raw response data:', response.data);
      
      const fetchedComments = Array.isArray(response.data) ? response.data : [];
      console.log('Processed comments:', fetchedComments);
      
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await api.get(`/post/${id}`);
        setPost(postResponse.data);
        
        await fetchComments();
      } catch (error) {
        console.error("Error fetching post and comments:", error);
      }
    };
    
    if (id) {
      fetchPostAndComments();
    }
  }, [id, fetchComments]);
  

  const handleLike = async () => {
    try {
      await api.post(`/post/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPost(prevPost => prevPost ? {...prevPost, _count: {...prevPost._count, likes: prevPost._count.likes + 1}} : null);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (newComment: Comment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ height: '100vh',
      display: 'flex',
      flexDirection: 'column' }}>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={post.author.profile_pic || undefined} />
          <Typography sx={{ marginLeft: 2 }}>{post.author.username}</Typography>
        </Box>
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
        <Typography sx={{ marginTop: 2 }}>{post.content}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, borderBottom: '1px solid gray', paddingBottom: 2 }}>
          <IconButton onClick={handleLike}>
            <FavoriteIcon />
          </IconButton>
          <Typography>{post._count.likes} likes</Typography>
          <Typography sx={{ marginLeft: 2 }}>{post._count.comment} comments</Typography>
        </Box>
      </Box>
      <CommentBar postId={post.id} onCommentAdded={handleAddComment} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <CommentList comments={comments} />
      </Box>
    </Box>
  );
};

export default DetailIndex;