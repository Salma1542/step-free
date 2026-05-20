import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AboutPage from "../pages/AboutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}