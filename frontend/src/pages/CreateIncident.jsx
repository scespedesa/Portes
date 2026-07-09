import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

function CreateIncident() {
  const { porteId } = useParams();

  const [porte, setPorte] = useState(null);
  const [loading, setLoading] = useState(true);

  const [autreIncident, setAutreIncident] = useState(false);
  const [autreLocalisation, setAutreLocalisation] = useState(false);

  const [degradation, setDegradation] = useState(3);

  const incidentTypes = [
    "Déchirure de la toile",
    "Perforation",
    "Usure anormale",
    "Désalignement du tablier",
    "Déformation guides latéraux",
    "Problème système d'enroulement",
    "Moteur en défaut",
    "Défaut capteurs de sécurité",
    "Porte ne s'ouvre pas",
    "Porte ne se ferme pas",
    "Autre",
  ];

  const defects = [
    "Blocage moteur",
    "Vibrations",
    "Perte d'étanchéité",
    "Bruits anormaux",
    "Vitesse réduite",
    "Décrochage du tablier",
  ];

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
              {incidentTypes.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 border border-slate-300 rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (item === "Autre") {
                        setAutreIncident(e.target.checked);
                      }
                    }}
                  />

                  <span>{item}</span>
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
            />
          </div>

          {/* LOCALISATION */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700">
              Localisation du dommage *
            </label>

            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
              onChange={(e) =>
                setAutreLocalisation(e.target.value === "Autre")
              }
            >
              <option value="">Sélectionner</option>
              <option value="Toile">Toile</option>
              <option value="Guide gauche">Guide gauche</option>
              <option value="Guide droit">Guide droit</option>
              <option value="Motorisation">Motorisation</option>
              <option value="Capteurs sécurité">Capteurs sécurité</option>
              <option value="Structure">Structure</option>
              <option value="Autre">Autre</option>
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
              {defects.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 border border-slate-300 rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
                >
                  <input type="checkbox" />
                  <span>{item}</span>
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

              <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
                <option>Oui</option>
                <option>Non</option>
                <option>Partiellement</option>
              </select>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-slate-700">
                Marche en manuel ?
              </label>

              <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
                <option>Oui</option>
                <option>Non</option>
                <option>Partiellement</option>
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
                  onClick={() => setDegradation(index + 1)}
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

            <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
              <option>Oui</option>
              <option>Non</option>
              <option>Sécurisation temporaire</option>
            </select>
          </div>

          {/* ACTIONS */}

          <div className="border-t border-slate-200 pt-6 flex justify-end">
            <Button>
                envoie
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateIncident;