import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Typography, Input, Button, Avatar, IconButton } from "@mui/material";
import useUserProfile from '../../components/rightbar/hooks/useUserProfile';
import { useState } from "react";
import { api } from "../../lib/api";

interface SearchBarProps {
   onPostSent: () => void;
}
 
const SearchBar: React.FC<SearchBarProps> = ({ onPostSent }) => {
   const [input, setInput] = useState("");
   const [image, setImage] = useState<File | null>(null);
   const { profile } = useUserProfile();
 
   const handleSendPost = async () => {
    try {
      const formData = new FormData();
      formData.append('content', input);
      if (image) {
        formData.append('images', image); // Changed 'images' to 'file' to match backend
      }
      const res = await api.post(`/post`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      if (res.status === 200) {
        setInput("");
        setImage(null);
        onPostSent();
      }
    } catch (error) {
      console.log("Error sending post:", error);
    }
  };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
       setImage(e.target.files[0]);
     }
   };
  
  return (
    <Box sx={{ padding: 2, borderBottom: "1px solid gray" }}>
       <Typography sx={{ color: "whitesmoke" }} variant="h4" marginBottom={2}>
          Home
       </Typography>
       <form style={{ display: "flex", gap: 2, marginBottom: 1 }}>
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
          <Input
             value={input}
             onChange={(e) => setInput(e.target.value)}
             sx={{ width: "70%", color: "whitesmoke" }}
             placeholder="What is happening"
          />
          <IconButton component="label">
            <Icon
               icon={"hugeicons:image-add-01"}
               color="mediumslateblue"
               fontSize={"40px"}
            />
            <input type="file" hidden onChange={handleImageChange} />
          </IconButton>
          <Button
             variant="contained"
             sx={{
                borderRadius: 23,
                backgroundColor: "mediumslateblue",
                color: "whitesmoke",
             }}
             onClick={handleSendPost}
          >
             Post
          </Button>
       </form>
    </Box>
 );
};

export default SearchBar;
