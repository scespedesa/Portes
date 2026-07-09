import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Portes from "./pages/portes/Portes";
import Porte from "./pages/portes/Porte";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Batiments from "./pages/batiments/Batiment";
import TestEnums from "./pages/TestEnums";
import CreateIncident from "./pages/CreateIncident";


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
                        path="/batiments" 
                        element={<Batiments />} 
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
                    <Route 
                        path="/test-enums" 
                        element={<TestEnums />} 
                    />

                    <Route 
                        path="/portes/:porteId/incident" 
                        element={<CreateIncident />} 
                    />

                    <Route 
                        path="/portes/:porteId" 
                        element={<Porte />} 
                    />

                </Routes>

            </Layout>
            
        </BrowserRouter>

    );
}


export default App;