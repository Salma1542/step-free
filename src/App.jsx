
// import './App.css'
// import HomePage from './pages/HomePage'
// function App() {
 

//   return (
//     <>
//     <HomePage/>
//     </>
//   )
// }

// export default App


import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlacesPage from "./pages/PlacesPage/PlacesPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlacesPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}