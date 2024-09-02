import { Box, Stack } from '@mui/material'
// import React from 'react'
import { NavLink } from 'react-router-dom'

const FollowsPage = () => {
  return (
    <Box sx={{ borderBottom: "1px solid gray" }}>
        <Stack direction="row" height={"40px"} alignItems={"center"}>
            <NavLink to={"following"} style={{flex: 1, textDecoration: "none", color: "white", borderRadius: 0, textAlign: "center"}}>
                Following
            </NavLink>
            <NavLink to={"followers"} style={{flex: 1, textDecoration: "none", color: "white", borderRadius: 0, textAlign: "center"}}>
                Followers
            </NavLink>
            
        </Stack>
    </Box>
  )
}

export default FollowsPage
