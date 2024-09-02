import { useState, useEffect } from "react";
import Post from "./Post";
import SearchBar from "./SearchBar";
import { Box } from "@mui/material";
// import axios from 'axios';
import { api } from "../../lib/api";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);

  const fetchPosts = async () => {
    try {
      const response = await api.post(`/post`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #e0e0e0',
      borderRight: '1px solid #e0e0e0',
    }}>
      <SearchBar onPostSent={fetchPosts} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Post posts={posts} />
      </Box>
    </Box>
  );
};

export default Home;