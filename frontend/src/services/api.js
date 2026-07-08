const API_URL= "http://127.0.0.1:8000/api";

export async function getPortes(){
    const response = await fetch(`${API_URL}/portes`);
    if (!response.ok){
        throw new Error("chargement des portes echoué");
    }
    return await response.json();
}