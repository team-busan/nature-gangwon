import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import LocationInfo from "./Pages/LocationInfo.jsx";
import LocationDetail from "./Pages/LocationDetail.jsx";
import MyPage from "./Pages/MyPage.jsx";
import SearchResult from "./Pages/SearchResult.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/SignUp.jsx";
import Plan from "./Pages/Plan.jsx";
import FestivalInfo from "./Pages/FestivalInfo.jsx";
import FestivalDetail from "./Pages/FestivalDetail.jsx";
import PlanInfo from "./Pages/PlanInfo.jsx";
import PlanDetail from "./Pages/PlanDetail.jsx";
import Landing from "./Pages/Landing.jsx";
import OAuth from "./Pages/OAuth.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import FindPassword from "./Pages/FindPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth/oauth-response/:token/:expirationTime",
        element: <OAuth />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/destination/list",
        element: <LocationInfo />,
      },
      {
        path: "/festival/list",
        element: <FestivalInfo />,
      },
      {
        path: "/destination/:id",
        element: <LocationDetail />,
      },
      {
        path: "/festival/:id",
        element: <FestivalDetail />,
      },
      {
        path: "/plan/list",
        element: <PlanInfo />,
      },
      {
        path: "/plan/:id",
        element: <PlanDetail />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path : "/FindPassword",
        element : <FindPassword/>,
      },
      {
        path: "/SignUp",
        element: <Signup />,
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/myPage/:id",
            element: <MyPage />,
          },
          {
            path: "/plan",
            element: <Plan />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
