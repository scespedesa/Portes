import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Portes from "./pages/portes/Portes";
import Porte from "./pages/portes/Porte";
import DoorLanding from "./pages/portes/DoorLanding";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Batiments from "./pages/batiments/Batiment";
import TestEnums from "./pages/TestEnums";
import CreateIncident from "./pages/CreateIncident";
import ProtectedRoute from "./pages/ProtectedRoute"
import {AuthProvider} from "./context/AuthContext"
import CreateIncidentTechnique from "./pages/CreateIncidentTechnique";
import Incidents from "./pages/portes/Incidents";


function App() {

    return (
        <AuthProvider>

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
                            element={
                                <ProtectedRoute>
                                <Dashboard />
                                </ProtectedRoute>
                            }
 
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
                            path="/portes/:porteId/technique" 
                            element={<CreateIncidentTechnique />} 
                            />

                        <Route 
                            path="/incidents/porte/:porteId" 
                            element={<Incidents />} 
                            />

                        <Route 
                            path="/portes/:porteId" 
                            element={<DoorLanding />} 
                            />

                    </Routes>

                </Layout>
                
            </BrowserRouter>
        </AuthProvider>

    );
}


export default App;