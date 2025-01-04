import App from "../app";
import { createHashRouter } from "react-router-dom";

import JobPage from "../pages/JobPage";
import HomePage from "../pages/HomePage";
import CommPage from "../pages/CommPage";
import EventPage from "../pages/EventPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

import { CommunityPage, CommunityProfile } from "../pages/CommPage";

// import CommunityView from "../views/community_views/CommunityView";
// import CommunityViewContent from "../views/community_views/CommunitViewContent";
// import CommunityProfile from "../views/community_views/CommunityProfile";
// import ProfileView from "../views/account_views/ProfileView";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/events",
                element: <EventPage />
            },
            {
                path: "/jobs",
                element: <JobPage />
            },
            {
                path: "/communities",
                element: <CommPage />,
                children: [
                    {
                        path: "/communities",
                        element: <CommunityPage />
                    },
                    {
                        path: "/communities/community",
                        element: <CommunityProfile />
                    }
                ]
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    }
])