import React from "react";
import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../components/home-page/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />;
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route path="/workspace" element={<AddWorkspace />} />
  //       </Routes>
  //     </Router>
  //   );
};

export default AppRoutes;
