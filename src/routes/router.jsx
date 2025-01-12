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

import CommunityPage from "../pages/components/comm_components/commPage";
import CommunityPostPage from "../pages/components/comm_components/commPostPage";
import CommunityTopicPage from "../pages/components/comm_components/commTopicPage";
import CommunityProfile from "../pages/components/comm_components/commProfile";


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
                        path: "/communities/:topic",
                        element: <CommunityTopicPage />
                    },
                    {
                        path: "/communities/community/:id",
                        element: <CommunityProfile />
                    },
                    {
                        path: "/communities/community/:id/:id/",
                        element: <CommunityPostPage />
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