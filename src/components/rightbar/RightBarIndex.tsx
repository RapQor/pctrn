import React from 'react'
import RightProfile from './RightProfile'
import { Box } from '@mui/material'
import RightSuggest from './RightSuggest'
import { useLocation } from 'react-router-dom'


const RightBarIndex = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  return (
    <Box sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
      {!isProfilePage && (
        <Box sx={{ padding: "15px" }}>
          <RightProfile />
        </Box>
      )}
      <Box sx={{ padding: !isProfilePage ? "0px 15px 15px 15px" : "15px", marginTop: !isProfilePage ? "auto" : "0" }}>
        <RightSuggest />
      </Box>
    </Box>
  )
}

export default RightBarIndex
