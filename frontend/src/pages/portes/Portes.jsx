import { useEffect, useState } from "react";
import { getPortes } from "../../services/api";
import "./Portes.css";
import { useAuth } from "../../context/AuthContext";

function Portes(){
    const { user, loading, logout } = useAuth();
    const[portes, setPortes] = useState([]);
    const[erreur,setErreur] = useState(null);
    useEffect(()=>{
        getPortes().then(data=>{
            setPortes(data);
        }).catch(err=>{
            setErreur(err.message);
        });
    },[]);
    return (
        <div className="container">
            <h1>Accueil Portes MCA</h1>

            {erreur && (
                <p>{erreur}</p>
            )}

            {portes.map((porte) => (
                <div className="porte-card" key={porte.id}>
                    {porte.nom}  et 
                    {porte.description}
                </div>
            ))}
        </div>

    );
    
}
export default Portes;