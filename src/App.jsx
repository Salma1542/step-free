
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import HomePage from './pages/HomePage';


import './App.css'

function App() {

  return (
     <Routes>
      <Route path="/" element={<Layout />}>

      

           <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

      </Route>
    </Routes>
  );
}

export default App;

