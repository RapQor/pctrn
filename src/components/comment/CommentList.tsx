import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
// import axios from 'axios';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import CommentIcon from '@mui/icons-material/Comment';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author?: {
    id: number;
    username: string;
    profile_pic: string | null;
  };
//   _count: {
//     likes: number;
//     comment: number;
//   };
}

interface CommentListProps {
  comments: Comment[];
}


const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    console.log('Received comments in CommentList:', comments);

    // const handleLike = async (event: React.MouseEvent, postId: number) => {
    //     event.stopPropagation();
    //     try {
    //       await axios.post(`http://localhost:5000/post/${postId}/like`, {}, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //       });
    //       // Optionally, you can update the likes count in the UI here
    //     } catch (error) {
    //       console.error("Error liking post:", error);
    //     }
    //   };
    
  return (
    <Box sx={{ marginTop: 2 }}>
      {comments.map((comment) => (
        <Box 
        key={comment.id} 
        sx={{ 
            marginBottom: 2,
            // cursor: "pointer",
            borderTop: "1px solid gray",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
         }}
        >
          <Avatar src={comment.author?.profile_pic || undefined} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "10px" }}>
            <Typography>
              {comment.author?.username}{" "}
              <Typography component="span" color="gray">
                • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Typography>
            </Typography>
            <Typography>{comment.content}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton onClick={(e) => handleLike(e, comment.id)}>
                <FavoriteIcon />
              </IconButton> */}
              {/* <Typography>{comment._count.likes}</Typography>
              <IconButton onClick={(e) => { e.stopPropagation(); }}>
                <CommentIcon />
              </IconButton>
              <Typography>{comment._count.comment}</Typography> */}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;