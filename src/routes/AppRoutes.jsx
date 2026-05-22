import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AboutPage from "../pages/AboutPage";
import PlacesPage from "../pages/PlacesPage/PlacesPage";
import BlogsPage from "../pages/BlogsPage/BlogsPage";
import ExplorePage from "./pages/ExplorePage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="about" element={<PlacesPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="explore" element={<ExplorePage />} />
      </Route>
    </Routes>
  );
}