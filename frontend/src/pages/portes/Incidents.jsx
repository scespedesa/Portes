import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIncidentsByPorte , deleteIncident } from "../../services/api";

export default function Incidents() {

    const { porteId } = useParams();

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    async function handleDelete(id) {

    const confirmDelete =
        window.confirm(
            "Voulez-vous supprimer cet incident ?"
        );

    if (!confirmDelete) return;

    await deleteIncident(id);

    setIncidents(
        incidents.filter(
            incident => incident.id !== id
        )
    );
}
    useEffect(() => {

        async function loadIncidents() {

            try {

                const data =
                    await getIncidentsByPorte(porteId);

                setIncidents(data);

            } catch(error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        }

        loadIncidents();

    }, [porteId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-lg text-gray-500">
                    Chargement...
                </p>
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-gray-800">
                        Incidents
                    </h1>

                    <p className="text-gray-500">
                        Porte #{porteId}
                    </p>

                </div>

                <button
                    className="
                        bg-blue-600
                        text-white
                        px-5
                        py-3
                        rounded-lg
                        hover:bg-blue-700
                        transition
                    "
                >
                    + Nouvel Incident
                </button>

            </div>

            <div className="grid gap-4">

                {incidents.map((incident) => (

                    <div
                        key={incident.id}
                        className="
                            bg-white
                            rounded-xl
                            shadow-md
                            p-6
                            border
                            hover:shadow-lg
                            transition
                        "
                    >

                        <div className="flex justify-between">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Incident #{incident.id}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {incident.description}
                                </p>

                            </div>

                            <span className="
                                bg-red-100
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                h-fit
                            ">
                                {incident.status}
                            </span>

                        </div>

                        <div className="flex gap-3 mt-5">

                            <button
                                className="
                                    bg-yellow-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                    hover:bg-yellow-600
                                "
                            >
                                Modifier
                            </button>

                            <button
                                className="
                                    bg-red-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                    hover:bg-red-700
                                "
                                onClick={() => handleDelete(incident.id)}
                            >
                                Supprimer
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}