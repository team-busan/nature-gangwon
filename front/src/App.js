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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/LocationInfo",
        element: <LocationInfo />,
      },
      {
        path: "/LocationDetail/:id",
        element: <LocationDetail />,
      },
      {
        path: "/myPage/:id",
        element: <MyPage />,
      },
      {
        path : "/Login",
        element : <Login/>,
      },
      {
        path : "/SignUp",
        element : <Signup/>,
      }
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
