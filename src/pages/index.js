import { lazy } from "react";
const pages = [
  {
    path: "/",
    Component: lazy(() => import("./Home")),
  },
  {
    path: "/drum",
    Component: lazy(() => import("./Drum")),
  },
  {
    path: "/calculator",
    Component: lazy(() => import("./Calculator")),
  },
  {
    path: "/pomodo",
    Component: lazy(() => import("./Pomodo")),
  },
];
export default pages;
