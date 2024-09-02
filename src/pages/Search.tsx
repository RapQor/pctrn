import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Button } from '@mui/material';
import { api } from '../lib/api';
import { debounce } from 'lodash';
import { useFollowUser } from '../hooks/useFollowUser'; // Adjust the import path as needed

interface User {
  id: number;
  fullName: string;
  username: string;
  profile_pic: string | null;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const { followStatus, actionLoading, fetchFollowStatus, toggleFollow } = useFollowUser();

  const debouncedSearch = debounce(async (term: string) => {
    if (term.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get(`/users/search`, { params: { term } });
      setSearchResults(response.data);
      fetchFollowStatus(response.data.map((user: User) => user.id));
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFollow = (userId: number) => {
    toggleFollow(userId, () => {
      // Trigger a refresh in RightSuggest component after follow action
      window.dispatchEvent(new CustomEvent('refreshRightSuggest'));
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search users"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />
      <List>
        {searchResults.map((user) => (
          <ListItem key={user.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.fullName} src={user.profile_pic || undefined} />
            </ListItemAvatar>
            <ListItemText
              primary={user.fullName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    @{user.username}
                  </Typography>
                </React.Fragment>
              }
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => handleFollow(user.id)}
              disabled={actionLoading[user.id]}
              sx={{
                backgroundColor: followStatus[user.id] ? 'green' : 'yellow',
                color: followStatus[user.id] ? 'white' : 'black',
                '&:hover': {
                  backgroundColor: followStatus[user.id] ? 'darkgreen' : 'gold',
                },
              }}
            >
              {actionLoading[user.id] 
                ? 'Loading...' 
                : followStatus[user.id] 
                  ? 'Followed' 
                  : 'Follow'}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Search;