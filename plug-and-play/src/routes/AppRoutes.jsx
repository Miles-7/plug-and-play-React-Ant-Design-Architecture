import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";


// Import Layouts
import MainLayout from "../Layout/MainLayout";




export default function AppRoutes() {
    return (
       
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />


                        {/* Default Redirect */}
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
           
    );
}