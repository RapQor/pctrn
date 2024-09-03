import { useState, useEffect } from "react";
import Post from "./Post";
import SearchBar from "./SearchBar";
import { Box, Typography } from "@mui/material";
import { api } from "../../lib/api";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await api.get(`/post`);
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
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
        {error ? (
          <Typography color="error" sx={{ padding: 2 }}>{error}</Typography>
        ) : (
          <Post posts={posts} />
        )}
      </Box>
    </Box>
  );
};

export default Home;