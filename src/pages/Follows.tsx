import { Outlet } from "react-router-dom"
import FollowsPage from "../components/follows"


const Follows = () => {
  return (
    <>
    <FollowsPage/>
    <Outlet/>
    </>
  )
}

export default Follows
