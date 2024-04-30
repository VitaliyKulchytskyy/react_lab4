import React from "react";
import ReactDOM from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Registration from "./components/page/Registration";
import ProfileInfo from "./components/page/ProfileInfo";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Registration/>,
    }, 
    {
        path: "profileInfo",
        element: <ProfileInfo/>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
