import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getPortes,
    getIncidentsByPorte,
    getIncidents,
    deleteIncident
} from "../services/api";

function Incidents() {
    const { porteId } = useParams();
    const navigate = useNavigate();

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [portes, setPortes] = useState([]);
    const [search, setSearch] = useState("");

    const [porteFilter, setPorteFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [dateOrder, setDateOrder] = useState("recent");


    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Voulez-vous supprimer cet incident ?"
        );

        if (!confirmDelete) return;

        try {
            await deleteIncident(id);

            setIncidents((prev) =>
                prev.filter((incident) => incident.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleCreate() {
        try {
            const data = await getPortes();

            setPortes(Array.isArray(data) ? data : []);
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function loadIncidents() {
            setLoading(true);

            try {
                const data = porteId
                    ? await getIncidentsByPorte(porteId)
                    : await getIncidents();

                setIncidents(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadIncidents();
    }, [porteId]);

    const filteredPortes = portes.filter((porte) =>
        JSON.stringify(porte)
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const availableTypes = [
        ...new Set(
            incidents.flatMap(
                (incident) => incident.type_incident || []
            )
        )
    ];

    const filteredIncidents = [...incidents]
        .filter((incident) => {
            const matchesPorte =
                !porteFilter ||
                incident?.porte?.nom
                    ?.toLowerCase()
                    .includes(
                        porteFilter.toLowerCase()
                    );

            const matchesType =
                !typeFilter ||
                incident?.type_incident?.includes(
                    typeFilter
                );

            return matchesPorte && matchesType;
        })
        .sort((a, b) => {
            const dateA = new Date(
                a.date_creation
            );

            const dateB = new Date(
                b.date_creation
            );

            return dateOrder === "recent"
                ? dateB - dateA
                : dateA - dateB;
        });


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
            <div className="flex justify-between items-start mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Incidents
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        {filteredIncidents.length} incident(s)
                    </p>
                </div>

                <button
                    onClick={handleCreate}
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2.5
                        rounded-lg
                        hover:bg-blue-700
                        transition
                        shadow
                    "
                >
                    + Nouvel incident
                </button>

            </div> 
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <div className="grid md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        placeholder="Nom de la porte..."
                        value={porteFilter}
                        onChange={(e) =>
                            setPorteFilter(e.target.value)
                        }
                        className="
                            border
                            rounded-lg
                            px-4
                            py-2
                            focus:ring-2
                            focus:ring-blue-500
                            outline-none
                        "
                    />

                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(e.target.value)
                        }
                        className="
                            border
                            rounded-lg
                            px-4
                            py-2
                        "
                    >
                        <option value="">
                            Tous les types
                        </option>

                        {availableTypes.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        value={dateOrder}
                        onChange={(e) =>
                            setDateOrder(
                                e.target.value
                            )
                        }
                        className="
                            border
                            rounded-lg
                            px-4
                            py-2
                        "
                    >
                        <option value="recent">
                            Plus récents d'abord
                        </option>

                        <option value="old">
                            Plus anciens d'abord
                        </option>
                    </select>

                </div>
            </div>
            

            {incidents.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">
                        Aucun incident trouvé.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredIncidents.map((incident) => (
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

                                    <p className="text-sm text-blue-600 font-medium">
                                        Incident #{incident.id}
                                    </p>


                                    <p className="text-sm text-gray-600 font-medium">
                                        🚪 Porte : {incident.porte.nom}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(
                                            incident.date_creation
                                        ).toLocaleDateString("fr-FR")}
                                    </p>

                                    <p className="text-gray-600 mt-2">
                                        {incident.description ||
                                            "Aucune description"}
                                    </p>
                                </div>

                        <div className="flex flex-col items-end gap-2">

                            <span
                                className="
                                    bg-red-100
                                    text-red-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                "
                            >
                                {incident.status}
                            </span>

                            {incident.type_incident?.map(
                                (type) => (
                                    <span
                                        key={type}
                                        className="
                                            bg-blue-100
                                            text-blue-700
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                        "
                                    >
                                        {type}
                                    </span>
                                )
                            )}

                        </div>
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
                                    onClick={() =>
                                        handleDelete(incident.id)
                                    }
                                    className="
                                        bg-red-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded
                                        hover:bg-red-700
                                    "
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold">
                                Choisir une porte
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Sélectionnez la porte concernée par l'incident.
                            </p>
                        </div>

                        <div className="p-6">
                            <input
                                type="text"
                                placeholder="Rechercher une porte..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                            <div className="mt-4 border rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                                {filteredPortes.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">
                                        Aucune porte trouvée
                                    </div>
                                ) : (
                                    filteredPortes.map((porte) => (
                                        <button
                                            key={porte.id}
                                            onClick={() => {
                                                setShowModal(false);
                                                setSearch("");

                                                navigate(
                                                    `/portes/${porte.id}/technique`
                                                );
                                            }}
                                            className="
                                                w-full
                                                text-left
                                                p-4
                                                border-b
                                                hover:bg-blue-50
                                                transition
                                            "
                                        >

                                            <div className="text-sm text-gray-500">
                                                {porte.nom ||
                                                    "Sélectionner cette porte"}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSearch("");
                                }}
                                className="
                                    px-5
                                    py-2
                                    rounded-xl
                                    bg-gray-200
                                    hover:bg-gray-300
                                "
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Incidents;