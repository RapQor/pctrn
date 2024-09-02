import { useState, useCallback } from 'react';
import { api } from '../lib/api'; // Adjust this import based on your project structure

interface FollowStatus {
  [key: number]: boolean;
}

interface ActionLoading {
  [key: number]: boolean;
}

export const useFollowUser = () => {
  const [followStatus, setFollowStatus] = useState<FollowStatus>({});
  const [actionLoading, setActionLoading] = useState<ActionLoading>({});

  const fetchFollowStatus = useCallback(async (userIds: number[]) => {
    try {
      const response = await api.post('/api/follow/status', { userIds });
      setFollowStatus(response.data);
    } catch (error) {
      console.error('Error fetching follow status:', error);
    }
  }, []);

  const toggleFollow = useCallback(async (userId: number, refreshCallback?: () => void) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      let response;
      if (followStatus[userId]) {
        response = await api.delete('/api/unfollow', { data: { followingId: userId } });
      } else {
        response = await api.post('/api/follow', { followingId: userId });
      }
      
      if (response.status === 200) {
        setFollowStatus(prev => ({ ...prev, [userId]: !prev[userId] }));
        if (refreshCallback) refreshCallback();
      } else {
        console.error('Failed to toggle follow status');
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  }, [followStatus]);

  return {
    followStatus,
    actionLoading,
    fetchFollowStatus,
    toggleFollow
  };
};