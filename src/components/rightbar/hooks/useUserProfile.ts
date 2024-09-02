import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import { api } from '../../../lib/api';

interface UserProfile {
  id: number;
  fullName: string;
  username: string;
  email: string;
  profile_pic: string | null;
  bio: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;
}

const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const userData = response.data.data;
      
      // Fetch followers and following counts
      const followersResponse = await api.get(`/follow/followers/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const followingResponse = await api.get(`/follow/following/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setProfile({
        ...userData,
        followersCount: followersResponse.data.length,
        followingCount: followingResponse.data.length
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
};

export default useUserProfile;