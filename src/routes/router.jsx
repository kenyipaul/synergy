import App from "../app";
import Login from "../views/account_views/Login";
import Signup from "../views/account_views/Signup";
import { createHashRouter } from "react-router-dom";
import HomeView from "../views/HomeView";
import EventView from "../views/EventView";
import JobView from "../views/JobView";
import CommunityView from "../views/community_views/CommunityView";
import CommunityViewContent from "../views/community_views/CommunitViewContent";
import CommunityProfile from "../views/community_views/CommunityProfile";
import ProfileView from "../views/account_views/ProfileView";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomeView />
            },
            {
                path: "/events",
                element: <EventView />
            },
            {
                path: "/jobs",
                element: <JobView />
            },
            {
                path: "/communities",
                element: <CommunityView />,
                children: [
                    {
                        path: "/communities",
                        element: <CommunityViewContent />
                    },
                    {
                        path: "/communities/community",
                        element: <CommunityProfile />
                    }
                ]
            },
            {
                path: "/about",
                element: <h1>ABOUT US</h1>
            },
            {
                path: "/profile",
                element: <ProfileView />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
])