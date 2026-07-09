import { useEffect, useState } from "react";
import { getBatiments } from "../../services/api";
import "../portes/Portes.css";

function Batiments(){
    const[batiments, setBatiments] = useState([]);
    const[erreur,setErreur] = useState(null);
    useEffect(()=>{
        getBatiments().then(data=>{
            setBatiments(data);
        }).catch(err=>{
            setErreur(err.message);
        });
    },[]);
    return (
        <div className="container">
            <h1>Accueil batiments MCA</h1>

            {erreur && (
                <p>{erreur}</p>
            )}

            {batiments.map((batiment) => (
                <div className="porte-card" key={batiment.id}>
                    {batiment.nom}  et 
                    {batiment.description}
                </div>
            ))}
        </div>

    );
    
}
export default Batiments;