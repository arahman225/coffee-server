import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './Components/AddCoffee.jsx';
import Update from './Components/Update.jsx';
import Coffees from './Components/Coffees.jsx';
import Details from './Components/Details.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: '/add-coffee',
    element: <AddCoffee></AddCoffee>
  },
  {
    path: '/coffees',
    element: <Coffees></Coffees>,
    loader: () => fetch('http://localhost:5000/coffees')
  },
  {
    path: '/coffees/:id',
    element: <Details></Details>,
    loader: ({ params }) => fetch(`http://localhost:5000/coffees/${params.id}`)
  },
  {
    path: '/update/:id',
    element: <Update></Update>,
    loader: ({params}) => fetch(`http://localhost:5000/coffees/${params.id}`)
    
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
