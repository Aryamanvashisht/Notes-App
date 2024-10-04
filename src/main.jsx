import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import Home from './Components/Home.jsx'
import Paste from './Components/Paste.jsx'
import Viewpaste from './Components/Viewpaste.jsx';
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Toaster/>
        <Navbar />
        <Home/>
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Toaster/>
        <Navbar />
        <Paste/>
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        {" "}
        <Toaster/>
        <Navbar />
        <Viewpaste/>
      </div>
    ),
  },
]);


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
