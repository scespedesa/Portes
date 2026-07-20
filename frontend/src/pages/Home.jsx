import {
    Factory,
    Stethoscope,
    AlertTriangle,
    Wrench,
    ArrowRight,
    ShieldCheck,
    Clock,
    Cog
} from "lucide-react";

import { Link } from "react-router-dom";


import { useState } from "react";

import { useNavigate } from "react-router-dom";

const cards = [
{
    title: "Incidents",
    desc: "Signalements en cours, anomalies détectées et suivi des problèmes terrain.",
    icon: AlertTriangle,
    openModal: true,
},
{
    to: "/diagnostics",
    title: "Diagnostics",
    desc: "Contrôles techniques, inspections et analyse de l'état des portes.",
    icon: Stethoscope,
    openModal: false,
},
{
    to: "/interventions",
    title: "Interventions",
    desc: "Gestion des opérations de maintenance et suivi des réparations.",
    icon: Wrench,
    openModal: false,
},
];

function Home() {



    const [openModal, setOpenModal] = useState(false);

    const [portes, setPortes] = useState([
    1,
    2,
    3
    ]);

    const navigate = useNavigate();

    const handleSelectPorte = (porteId) => {
        navigate(`/portes/${porteId}/incident`);
        setOpenModal(false);
    };

    return (

        <div className="min-h-screen bg-gray-50">


            {/* HEADER */}

            <header className="
                border-b
                bg-white/80
                backdrop-blur
                sticky
                top-0
                z-40
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    flex
                    items-center
                    justify-between
                    px-6
                    h-16
                ">


                    <div className="flex items-center gap-3">


                        <div className="
                            h-10
                            w-10
                            rounded-lg
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                        ">

                            <Factory size={22}/>

                        </div>


                        <div className="leading-tight">

                            <div className="
                                font-bold
                                text-lg
                            ">

                                PortesMCA

                            </div>


                            <div className="
                                text-[11px]
                                text-gray-500
                            ">

                                Maintenance industrielle

                            </div>


                        </div>


                    </div>




                    <nav className="flex items-center gap-3">


                        <Link
                            to="/login"
                            className="
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                                hover:bg-gray-100
                            "
                        >

                            Connexion

                        </Link>



                        <Link
                            to="/usine"
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-lg
                                border
                                border-blue-600
                                text-blue-600
                                text-sm
                                hover:bg-blue-50
                            "
                        >

                            Vue de l'usine

                            <ArrowRight size={16}/>

                        </Link>


                    </nav>


                </div>


            </header>





            {/* HERO */}


            <section className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-blue-700
                to-blue-900
                text-white
            ">


                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-24
                ">


                    <div className="max-w-3xl">


                        <span className="
                            inline-block
                            rounded-full
                            border
                            border-white/30
                            bg-white/10
                            px-3
                            py-1
                            text-xs
                        ">

                            Plateforme interne de maintenance

                        </span>



                        <h1 className="
                            mt-6
                            text-4xl
                            md:text-6xl
                            font-bold
                            leading-tight
                        ">

                            Supervision des portes industrielles depuis un seul espace.

                        </h1>



                        <p className="
                            mt-6
                            text-lg
                            text-white/80
                            max-w-2xl
                        ">

                            Centralisation de l'état des portes,
                            ses incidents, ses diagnostics et les interventions
                            de maintenance.

                        </p>



                        <div className="
                            mt-8
                            flex
                            flex-wrap
                            gap-4
                        ">


                            <Link
                                to="/usine"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-white
                                    text-blue-700
                                    px-6
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    hover:bg-gray-100
                                "
                            >

                                Accéder à la vue usine

                                <ArrowRight size={18}/>

                            </Link>



                            <a
                                href="#modules"
                                className="
                                    border
                                    border-white/40
                                    px-6
                                    py-3
                                    rounded-lg
                                    hover:bg-white/10
                                "
                            >

                                Voir les modules

                            </a>


                        </div>


                    </div>


                </div>


            </section>





            {/* FACTORY BUTTON */}


            <div className="
                max-w-7xl
                mx-auto
                px-6
                mt-10
            ">


                <Link

                    to="/usine"

                    className="
                        block
                        bg-blue-700
                        text-white
                        rounded-2xl
                        p-8
                        hover:bg-blue-800
                        transition
                    "

                >


                    <div className="
                        flex
                        items-center
                        justify-between
                    ">


                        <div>


                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-3
                            ">


                                <Factory size={32}/>


                                <h3 className="
                                    text-2xl
                                    font-bold
                                ">

                                    Vue de l'usine

                                </h3>


                            </div>



                            <p className="
                                text-blue-100
                                max-w-xl
                            ">

                                Accéder à la vue globale des portes,
                                visualiser leur état et ouvrir leur fiche technique.

                            </p>


                        </div>



                        <ArrowRight size={35}/>


                    </div>


                </Link>


            </div>






            {/* INFORMATIONS */}


            <section className="
                border-b
                bg-white
                mt-10
            ">


                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-8
                    grid
                    md:grid-cols-3
                    gap-6
                ">


                {[
                    {
                        icon: ShieldCheck,
                        title:"Suivi fiable",
                        desc:"Historique complet des incidents et interventions."
                    },

                    {
                        icon: Clock,
                        title:"Réactivité",
                        desc:"Détection rapide des anomalies terrain."
                    },

                    {
                        icon: Cog,
                        title:"Gestion centralisée",
                        desc:"Toutes les portes regroupées dans une seule interface."
                    }

                ].map((item)=>{


                    const Icon = item.icon;


                    return (

                        <div
                            key={item.title}
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >

                            <div className="
                                h-10
                                w-10
                                rounded-lg
                                bg-blue-100
                                text-blue-700
                                flex
                                items-center
                                justify-center
                            ">

                                <Icon size={20}/>

                            </div>


                            <div>

                                <h3 className="font-semibold">

                                    {item.title}

                                </h3>


                                <p className="
                                    text-sm
                                    text-gray-500
                                ">

                                    {item.desc}

                                </p>


                            </div>


                        </div>

                    )


                })}


                </div>


            </section>





            {/* MODULES */}


            <section
                id="modules"
                className="py-20"
            >


                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                ">


                    <div className="
                        text-center
                        mb-12
                    ">


                        <h2 className="
                            text-3xl
                            md:text-4xl
                            font-bold
                        ">

                            Gestion de maintenance

                        </h2>


                    </div>





                    <div className="
                        grid
                        md:grid-cols-3
                        gap-6
                    ">



                    {cards.map((card)=>{


                        const Icon = card.icon;


                        return (

                                <div
                                key={card.title}
                                onClick={() => {
                                    if (card.openModal) {
                                        setOpenModal(true);
                                    } else {
                                        navigate(card.to);
                                    }
                                }}
                                className="
                                    bg-white
                                    border
                                    rounded-xl
                                    p-6
                                    hover:shadow-xl
                                    transition
                                    cursor-pointer
                                "
                                >


                                <div className="
                                    h-12
                                    w-12
                                    rounded-lg
                                    bg-blue-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <Icon size={24}/>

                                </div>



                                <h3 className="
                                    mt-5
                                    text-xl
                                    font-semibold
                                ">

                                    {card.title}

                                </h3>



                                <p className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                ">

                                    {card.desc}

                                </p>



                                <div className="
                                    mt-5
                                    flex
                                    items-center
                                    text-blue-600
                                    text-sm
                                    font-medium
                                ">

                                    Ouvrir

                                    <ArrowRight
                                        size={16}
                                        className="ml-2"
                                    />

                                </div>
                            </div>




                        )


                    })}

                                {openModal && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                                    <div className="bg-white rounded-xl p-6 w-96 shadow-xl">

                                    <h2 className="text-xl font-bold mb-4">
                                        Sélectionnez une porte
                                    </h2>

                                    <div className="flex flex-col gap-2">

                                        {portes.map((porte) => (
                                        <button
                                            key={porte}
                                            onClick={() => handleSelectPorte(porte)}
                                            className="
                                            p-3
                                            border
                                            rounded-lg
                                            hover:bg-gray-100
                                            "
                                        >
                                            {porte}
                                        </button>
                                        ))}

                                    </div>

                                    <button
                                        onClick={() => setOpenModal(false)}
                                        className="
                                        mt-4
                                        w-full
                                        bg-red-500
                                        text-white
                                        p-3
                                        rounded-lg
                                        hover:bg-red-600
                                        "
                                    >
                                        Fermer
                                    </button>

                                    </div>

                                </div>
                                )}


                    </div>


                </div>


            </section>


        </div>

    );

}


export default Home;