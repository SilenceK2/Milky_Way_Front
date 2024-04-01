import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/RoutePage/Loading";
import SignupEmail from "../pages/Join/SignupEmail";
import SignupIdCompare from "../pages/Join/SignupIdCompare";
import SignupInfo from "../pages/Join/SignupInfo";
import Search from "../pages/Search";

const ViewPortPage = lazy(() => import("../layouts/ViewPort"));
const LayoutPage = lazy(() => import("../layouts/Layout"));
const LoginPage = lazy(() => import("../pages/LogIn"));
const HomePage = lazy(() => import("../pages/Home"));
const StudyDetailPage = lazy(() => import("../pages/StudyDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewPortPage />,
    children: [
      {
        path: "users/login",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <LayoutPage type={"home"} />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          { path: "search", element: <Search /> },
        ],
      },
      {
        path: "/detail",
        element: <LayoutPage type={"detail"} />,
        children: [
          {
            path: "",
            element: <StudyDetailPage />,
          },
        ],
      },

      {
        path: "/loading",
        element: <Loading />,
      },
      {
        path: "users/signupemail/",
        element: <SignupEmail />,
      },
      {
        path: "users/signupcompare/",
        element: <SignupIdCompare />,
      },
      {
        path: "users/signupinfo/",
        element: <SignupInfo />,
      },
    ],
  },
]);

export default router;
