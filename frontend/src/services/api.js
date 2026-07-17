const API_URL= "http://127.0.0.1:8000/api";

export async function getPortes(){
    const response = await fetch(`${API_URL}/portes/`);
    if (!response.ok){
        throw new Error("chargement des portes echoué");
    }
    return await response.json();
}
export async function getBatiments(){
    const response = await fetch(`${API_URL}/batiments/`);
    if (!response.ok){
        throw new Error("chargement des portes echoué");
    }
    return await response.json();
}

export async function getEnum(endpoint){
    const response = await fetch(`${API_URL}/enums/${endpoint}/`);
    if (!response.ok){
        throw new Error("chargement des symptomes echoué");
    }
    return await response.json();
}

export const getTypeIncidents = () => getEnum("type-incident")
export const getLocalisations = () => getEnum("localisation")
export const getPriorites = () => getEnum("priorite")
export const getSecurite = () => getEnum("securite")
export const getStatuts = () => getEnum("statut")
export const getSymptomes = () => getEnum("symptome")
export const getEtat = () => getEnum("etat")

export async function creationIncident(incident){
    const response = await fetch(`${API_URL}/portes/${incident.porte_id}/incident`,{
        method : "POST",
        headers: {"Content-Type": "application/json"
    },
    body: JSON.stringify(incident)});
    if (!response.ok){
        throw new Error("Erreur lors de la creation de l'incident")
    }
    return await response.json();

}

export async function getIncidents(){

    
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    const response = await fetch(`${API_URL}/incidents/`);
    if (!response.ok){
        throw new Error(`chargement incidents de porte `);
    }
    return await response.json();

}


export async function getIncidentsByPorte(porte_id){

    
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    const response = await fetch(`${API_URL}/incidents/porte/${porte_id}`);
    if (!response.ok){
        throw new Error(`chargement incidents de porte ${porte_id}`);
    }
    return await response.json();

}

export async function deleteIncident(id) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/incidents/${id}/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}




