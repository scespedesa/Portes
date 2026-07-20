import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import Portes from "./pages/portes/Portes";
import Porte from "./pages/portes/Porte";
import DoorLanding from "./pages/portes/DoorLanding";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Batiments from "./pages/batiments/Batiment";
import TestEnums from "./pages/TestEnums";
import CreateIncident from "./pages/CreateIncident";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import CreateIncidentTechnique from "./pages/CreateIncidentTechnique";
import Incidents from "./pages/Incidents";
import Usine from "./pages/Usine";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        {/* Sin menú */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portes/:porteId/incident" element={<CreateIncident />} />
        <Route path="/usine" element={ <ProtectedRoute> <Usine /> </ProtectedRoute>} />

        {/* Con menú */}
        <Route element={<AppLayout />}>
            <Route path="/batiments" element={<Batiments />} />
            <Route path="/portes" element={<Portes />} />
            <Route path="/incidents" element={<Incidents />} />
            

            <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
            }
            />

            <Route path="/test-enums" element={<TestEnums />} />
            
            <Route path="/portes/:porteId/technique" element={<CreateIncidentTechnique />} />
            <Route path="/incidents/porte/:porteId" element={<Incidents />} />
            <Route path="/portes/:porteId" element={<DoorLanding />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;