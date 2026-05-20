
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import HomePage from './pages/HomePage';


import './App.css'
import BlogsPage from "./pages/BlogsPage/BlogsPage";

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

