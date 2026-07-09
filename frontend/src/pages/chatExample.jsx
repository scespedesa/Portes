import React, { useState } from "react";

export default function IncidentReportForm() {
  const [autre, setAutre] = useState(false);
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

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200">

        {/* HEADER */}

        <div className="border-b border-slate-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Incident Report Form
          </h1>

          <p className="text-slate-500 mt-1">
            Déclaration d'incident industriel
          </p>
        </div>

        <form className="p-8 space-y-8">

          {/* TYPE INCIDENT */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700">
              Type d'incident *
            </label>

            <div className="grid md:grid-cols-2 gap-3">

              {incidentTypes.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 border border-slate-300 rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (item === "Autre") {
                        setAutre(e.target.checked);
                      }
                    }}
                  />

                  {item}
                </label>
              ))}
            </div>

            {autre && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Précisez l'incident"
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
              rows={5}
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
              placeholder="Décrivez les circonstances et les dommages observés..."
            />
          </div>

          {/* LOCALISATION */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700">
              Localisation du dommage *
            </label>

            <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
              <option>Toile</option>
              <option>Guide gauche</option>
              <option>Guide droit</option>
              <option>Motorisation</option>
              <option>Capteurs sécurité</option>
              <option>Structure</option>
              <option>Autre</option>
            </select>
          </div>

          {/* DEFAUTS */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700">
              Défauts observés
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              {defects.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 border border-slate-300 rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                >
                  <input type="checkbox" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* AUTO */}

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

          {/* MANUEL */}

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

          {/* NIVEAU */}

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
                  className={`p-4 rounded-xl border transition-all ${
                    degradation === index + 1
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white border-slate-300"
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
              Installation sécurisée pour les personnes ?
            </label>

            <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
              <option>Oui</option>
              <option>Non</option>
              <option>Sécurisation temporaire</option>
            </select>
          </div>

          {/* SUBMIT */}

          <div className="pt-4 border-t border-slate-200">

            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Soumettre le rapport
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}