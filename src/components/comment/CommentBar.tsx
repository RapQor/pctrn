import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
// import axios from 'axios';
import { api } from '../../lib/api';

interface CommentBarProps {
  postId: number;
  onCommentAdded: (newComment: any) => void;
}

const CommentBar: React.FC<CommentBarProps> = ({ postId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');

  const handleComment = async () => {
    try {
      const response = await api.post(
        `/reply/post/${postId}`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      
      if (response.data && response.data.data) {
        onCommentAdded(response.data.data);
        setNewComment('');
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Box sx={{ marginTop: 2, paddingBottom: 2 }}>
      <TextField
        fullWidth
        variant='standard'
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ padding: "0 10px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button variant="contained" onClick={handleComment} sx={{ marginTop: 1, width: 145, height: 30, backgroundColor: "yellow" }}>
          Post Comment
        </Button>
      </Box>  
      
    </Box>
  );
};

export default CommentBar;