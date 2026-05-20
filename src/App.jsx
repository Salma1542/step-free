import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import PlacesPage from "./pages/PlacesPage/PlacesPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blogs" element={<BlogsPage />} />
      </Route>
    </Routes>
  );
}

export default App;





