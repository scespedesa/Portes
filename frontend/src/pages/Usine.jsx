import { useNavigate } from "react-router-dom";

function Usine() {
    const navigate = useNavigate();

    const portes = [
        {
            id: 1,
            nom: "T1",
            x: 120,
            y: 180,
            hasIncident: false
        },
        {
            id: 2,
            nom: "T2",
            x: 280,
            y: 120,
            hasIncident: true
        },
        {
            id: 3,
            nom: "T3",
            x: 450,
            y: 230,
            hasIncident: false
        },
        {
            id: 4,
            nom: "T4",
            x: 650,
            y: 180,
            hasIncident: true
        },
        {
            id: 5,
            nom: "T5",
            x: 350,
            y: 340,
            hasIncident: true
        },
        {
            id: 6,
            nom: "T6",
            x: 580,
            y: 420,
            hasIncident: false
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-8">

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Plan de l'usine
                </h1>

                <p className="text-gray-500 mt-1">
                    Vue globale des portes
                </p>
            </div>

            <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Porte opérationnelle</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>Incident ouvert</span>
                </div>
            </div>

            <div
                className="
                    relative
                    bg-white
                    border
                    rounded-2xl
                    shadow-lg
                    overflow-hidden
                "
            >
                <img 
                    src="usine-plan.png"
                    alt="Plan de l'usine"
                    className="w-full"
                />

                {portes.map((porte) => (
                    <button
                        key={porte.id}
                        className="
                            absolute
                            group
                            -translate-x-1/2
                            -translate-y-1/2
                        "
                        style={{
                            left: `${porte.x}px`,
                            top: `${porte.y}px`
                        }}
                        onClick={() =>
                            navigate(`/portes/${porte.id}`)
                        }
                    >
                        <div
                            className={`
                                w-6
                                h-6
                                rounded-full
                                border-2
                                border-white
                                shadow-lg
                                transition
                                hover:scale-125
                                ${
                                    porte.hasIncident
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                }
                            `}
                        />

                        <div
                            className="
                                absolute
                                left-1/2
                                top-8
                                -translate-x-1/2
                                hidden
                                group-hover:block
                                bg-white
                                px-3
                                py-2
                                rounded-lg
                                shadow-xl
                                whitespace-nowrap
                                text-sm
                                z-50
                            "
                        >
                            <div className="font-semibold">
                                {porte.nom}
                            </div>

                            <div className="text-gray-500">
                                {porte.hasIncident
                                    ? "Incident ouvert"
                                    : "Opérationnelle"}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Usine;