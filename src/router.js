import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import User from "./components/User";
import UserEmail from "./components/UserEmail";
import UserPhoneNumber from "./components/UserPhoneNumber";
import UserAllergies from "./components/UsereAllergies";
import NoteFound from "./components/NoteFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout><Home /></Layout>,
    },
    {
        path: "/user",
        element: <Layout><User /></Layout>,
    },
    {
        path: "/users/:userId/email",
        element: <Layout><UserEmail /></Layout>,
    },
    {
        path: "/users/:userId/phone",
        element: <Layout><UserPhoneNumber /></Layout>,
    },
    {
        path: "/users/:userId/allergies",
        element: <Layout><UserAllergies /></Layout>,
    },
    {
        path: "*",
        element: <Layout><NoteFound /></Layout>,
    },
  ]);

  export default router;