import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import { api } from '../../../lib/api';

interface User {
  id: number;
  fullName: string;
  username: string;
  profile_pic?: string;
}

const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/all/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const mutate = () => {
    fetchUsers();
  };

  return { users, loading, error, mutate, fetchUsers };
};

export default useAllUsers;