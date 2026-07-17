import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { creationIncident, getEtat , getLocalisations , getSymptomes , getTypeIncidents , getPriorites , getSecurite , getStatuts } from "../services/api";

function CreateIncident() {
  const { porteId } = useParams();

  const [porte, setPorte] = useState(null);
  const [loading, setLoading] = useState(true);

  const [autreIncident, setAutreIncident] = useState(false);
  const [autreLocalisation, setAutreLocalisation] = useState(false);

  const [degradation, setDegradation] = useState(3);

  const [typeIncidents,setTypeIncidents] = useState([]);
  const [symptomes,setSymptomes] = useState([]);
  const [localisations,setLocalisations] = useState([]);
  const [securite,setSecurite] = useState([]);
  const [etat,setEtat] = useState([]);

  
  const [formulaire,setFormulaire] = useState(
    { porte_id:parseInt(porteId),
      type_incident:[],
      autre_incident:"",
      localisation_dommage:"",
      autre_localisation:"",
      symptomes:[],
      fonctionne_auto:null,
      fonctionne_manuel:null,
      niveau_degradation:1,
      securite:"",
      description:""
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // const data = {
        //     ...formulaire,
        //     porte_id : Number(porteId)
        // };
        console.log("el numero de la puerta : ",porteId);
        console.log("este es el forms que envia");
        console.log(formulaire);
        const result = await creationIncident(formulaire);
        console.log(result);
        alert("incident cree avec succes");
    }
    catch(error){
        console.log(error);
        console.error("Error completo:", error);
        
        console.log("STATUS", error.response?.status);
        console.log("DATA", error.response?.data);


        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }

    }


  // const incidentTypes = [
  //   "Déchirure de la toile",
  //   "Perforation",
  //   "Usure anormale",
  //   "Désalignement du tablier",
  //   "Déformation guides latéraux",
  //   "Problème système d'enroulement",
  //   "Moteur en défaut",
  //   "Défaut capteurs de sécurité",
  //   "Porte ne s'ouvre pas",
  //   "Porte ne se ferme pas",
  //   "Autre",
  // ];

  const defects = [
    "Blocage moteur",
    "Vibrations",
    "Perte d'étanchéité",
    "Bruits anormaux",
    "Vitesse réduite",
    "Décrochage du tablier",
  ];


  // useEffect(() => {
  //     getTypeIncidents()
  //         .then(data => {
  //           setIncident({
  //             ...incident,
  //             type_incident: data
  //           });
  //           console.log(data)
  //         })
  //         .catch(error => {
  //             console.log(error);
  //         });
  // }, []);

  useEffect(() => {
      getSymptomes().then(setSymptomes).catch(error => {console.log(error);});
      getTypeIncidents().then(setTypeIncidents);
      getLocalisations().then(setLocalisations);
      getSecurite().then(setSecurite);
      getEtat().then(setEtat);
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/portes/${porteId}`)
      .then((response) => response.json())
      .then((data) => {
        setPorte(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [porteId]);

  if (loading) {
    return (
      <div className="p-8">
        <h2>Chargement...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200">

        {/* HEADER */}

        <div className="border-b border-slate-200 px-8 py-6">
          <h1 className="text-4xl font-bold text-slate-900">
            Déclaration d'incident
          </h1>

          {porte && (
            <div className="mt-4 text-sm text-slate-600">
                <Card title="Informations de la porte">
                    Porte : <span className="font-medium">{porte.nom}</span>
                </Card>
            </div>
          )}
        </div>

        <form className="p-8 space-y-8">

          {/* TYPE INCIDENT */}

          <div>
            <label className="block mb-4 font-semibold text-slate-700">
              Quel problème observez-vous ?
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              {typeIncidents.map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-3 border border-slate-300 rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    value={item.value}
                    checked ={formulaire.type_incident.includes(item.value)}
                    onChange={(e) => {
                    const checked = e.target.checked;
                    
                    console.log(item.value);
                    console.log(item.label);


                    setFormulaire((prev) => ({
                      ...prev,
                      type_incident: checked
                        ? [...prev.type_incident, item.value]
                        : prev.type_incident.filter((i) => i !== item.value),
                    }));

                    if (item.label === "Autre") {
                      console.log(checked)
                      console.log(formulaire)
                      setAutreIncident(checked);
                    }

                    }}
                  />

                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            {autreIncident && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-slate-600">
                  Précisez l'incident
                </label>

                <input
                  type="text"
                  placeholder="Décrivez l'incident"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3"
                  onChange={(e) => {
                  setFormulaire((prev) => ({
                    ...prev,
                      autre_incident: e.target.value,
                  })); 
                  console.log(formulaire);
                }}
                />
              </div>
            )}
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700">
              Description de l'incident *
            </label>

            <textarea
              rows={6}
              placeholder="Décrivez les circonstances et les dommages observés..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
              value={formulaire.description}           
              onChange={(e) => {
                  setFormulaire((prev) => ({
                    ...prev,
                    description: e.target.value
                  }));
                  console.log(formulaire);
                }}
            />
          </div>

          {/* LOCALISATION */}

          <div>
            <label
            className="block mb-3 font-semibold text-slate-700">
              Localisation du dommage *
            </label>

            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
              onChange={(e) =>{
                
                const selectedLabel =
                    e.target.options[e.target.selectedIndex].text;

                setAutreLocalisation(selectedLabel === "Autre")
                console.log(autreLocalisation)
                console.log(e.target.value)
                console.log(selectedLabel)
                setFormulaire((prev) => ({
                  ...prev,
                  localisation_dommage: e.target.value
                }));
                console.log()
                  
              }}
            >
              {localisations.map((type) => (
                    <option                 
                      key={type.value}
                      value={type.value}                   
                    >
                        {type.label}
                    </option>
                ))}
            </select>

            {autreLocalisation && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-slate-600">
                  Localisation précise du dommage
                </label>
                <input
                  type="text"
                  placeholder="Ex : axe supérieur, rail interne, support latéral..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-3"
                  onChange={(e) =>
                    setFormulaire((prev) => ({
                      ...prev,
                      autre_localisation: e.target.value,
                    }))
                  }

                />
              </div>
            )}
          </div>

          {/* DEFAUTS OBSERVES */}

          <div>
            <label className="block mb-4 font-semibold text-slate-700">
              Défauts observés
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              {symptomes.map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-3 border border-slate-300 rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
                >
                  <input type="checkbox"

                      value={item.value}
                      checked ={formulaire.symptomes.includes(item.value)}
                      onChange={(e) => {
                      const checked = e.target.checked;
                      
                      console.log(item.value);
                      console.log(item.label);


                      setFormulaire((prev) => ({
                        ...prev,
                        symptomes: checked
                          ? [...prev.symptomes, item.value]
                          : prev.symptomes.filter((i) => i !== item.value),
                      }));
                      }}
                  
                  />

                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* FONCTIONNEMENT */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-3 font-semibold text-slate-700">
                Marche en automatique ?
              </label>

              <select className="w-full border border-slate-300 rounded-lg px-4 py-3"
                onChange={(e) =>{
                console.log("auto aqui")
                console.log(e.target.value)
                setFormulaire((prev) => ({
                  ...prev,
                  fonctionne_auto: e.target.value
                }));
                console.log()
                  
              }}
              
              >
              {etat.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                    >
                        {type.label}
                    </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-slate-700">
                Marche en manuel ?
              </label>

              <select className="w-full border border-slate-300 rounded-lg px-4 py-3"
                 onChange={(e) =>{
                console.log(e.target.value)
                setFormulaire((prev) => ({
                  ...prev,
                  fonctionne_manuel: e.target.value
                }));
                console.log()
                  
              }}             
              >
              {etat.map((type) => (
                    <option 
                      key={type.value}
                      value={type.value}   
                    >
                        {type.label}
                    </option>
                ))}
              </select>
            </div>

          </div>

          {/* DEGRADATION */}

          <div>
            <label className="block mb-4 font-semibold text-slate-700">
              Niveau de dégradation
            </label>

            <div className="grid grid-cols-5 gap-3">
              {[
                "Très léger",
                "Léger",
                "Modéré",
                "Important",
                "Critique",
              ].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    console.log(index + 1)
                    setDegradation(index + 1)
                    setFormulaire((prev)=>({
                    ...prev,
                    niveau_degradation: index + 1
                  }))          
                  }
                  }
                  className={`rounded-xl border p-4 transition ${
                    degradation === index + 1
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white border-slate-300 hover:border-slate-500"
                  }`}
                >
                  <div className="text-xl font-bold">
                    {index + 1}
                  </div>

                  <div className="text-xs mt-1">
                    {label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SECURITE */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700">
              La porte est-elle sécurisée pour les personnes ?
            </label>

            <select className="w-full border border-slate-300 rounded-lg px-4 py-3"
                onChange={(e) =>{
              console.log(e.target.value)
              setFormulaire((prev) => ({
                ...prev,
                securite: e.target.value
              }));
              console.log(formulaire)
                
            }}   
            
            
            >
              {securite.map((type) => (
                    <option 
                    key={type.value}
                    value={type.value}
                    >
                        {type.label}
                    </option>
                ))}
            </select>
          </div>

          {/* ACTIONS */}

          <div className="border-t border-slate-200 pt-6 flex justify-end">
            <Button
              onClick={handleSubmit}
            >
                envoie
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateIncident;