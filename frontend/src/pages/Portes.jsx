import { useEffect, useState } from "react";
import { getPortes } from "../services/api";

function Portes(){
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
        <div>
            <h1>Accueil Portes MCA</h1>

            {error && (
                <p>{error}</p>
            )}

            {portes.map((porte) => (
                <div key={porte.id}>
                    <h3>{porte.description}</h3>
                </div>
            ))}

            <p>Portes chargées depuis FastAPI</p>
        </div>
    );
    
}
export default Portes;