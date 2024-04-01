import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BasketPage, HomePage, ProductPage, Root } from 'routes';
import { AdminPage, DashboardPage, ProductsPage as AdminProductsPage } from 'routes/admin';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{
      path: "/",
      element: <HomePage />,
    }, {
      path: "/product/:id",
      element: <ProductPage />,
    }, {
      path: "/basket",
      element: <BasketPage />,
    }, {
      path: "/admin",
      element: <AdminPage />,
    }, {
      path: "/admin/dashboard",
      element: <DashboardPage />,
    }, {
      path: "/admin/products",
      element: <AdminProductsPage />,
    }]
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
