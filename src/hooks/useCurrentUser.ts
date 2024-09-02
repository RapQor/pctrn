const getCurrentUserId = (): number | null => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  };

  export default getCurrentUserId