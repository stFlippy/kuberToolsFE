import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/layout"
import PodsPage from "../modules/pods/PodsPage"
import DeploymentsPage from "../modules/deployments/DeploymentsPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "pods",
        element: <PodsPage />,
      },
      {
        path: "deployments",
        element: <DeploymentsPage />,
      },
    ],
  },
]);