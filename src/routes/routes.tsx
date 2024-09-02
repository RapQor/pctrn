import {RouteObject} from "react-router-dom"
import Home from "../pages/Home"
// import About from "../pages/About"
import RouteLayout from "../layout/RouteLayout"
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Detail from "../pages/Detail";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Follows from "../pages/Follows";
import Following from "../components/follows/following";
import Followers from "../components/follows/followers";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RouteLayout/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
               path: "search",
               element: <Search/>,
            },
            {
               path: "follows",
               element: <Follows/>,
               children: [
                  {
                     path: "following",
                     element: <Following/>,
                  },
                  {
                     path: "followers",
                     element: <Followers/>,
                  }
               ]
            },
            {
               path: "profile",
               element: <Profile/>,
            },
            {
               path: "detail/:id",
               element: <Detail/>,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
           {
              path: "register",
              element: <Register />,
           },
           {
              path: "login",
              element: <Login />,
           },
        ],
     },
];

export default routes