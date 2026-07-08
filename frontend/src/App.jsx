import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Portes from "./pages/Portes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {

    return (

        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route 
                        path="/" 
                        element={<Home />} 
                    />

                    <Route 
                        path="/portes" 
                        element={<Portes />} 
                    />

                    <Route 
                        path="/login" 
                        element={<Login />} 
                    />

                    <Route 
                        path="/dashboard" 
                        element={<Dashboard />} 
                    />

                </Routes>

            </Layout>
            
        </BrowserRouter>

    );
}


export default App;