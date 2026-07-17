import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function DoorLanding(){

    const { porteId } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();


    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-2xl font-bold">
                    Porte {porteId}
                </h1>


                <p className="mt-2">
                    Que souhaitez-vous faire ?
                </p>


                <button

                    className="mt-6 w-full bg-blue-600 text-white p-3 rounded"

                    onClick={() =>
                        navigate(
                            `/portes/${porteId}/incident`
                        )
                    }

                >

                    👷 Déclarer un incident

                </button>



                {

                user ? (

                    <button

                        className="mt-4 w-full bg-gray-800 text-white p-3 rounded"

                        onClick={() =>
                            navigate(
                                `/portes/${porteId}/technique`
                            )
                        }

                    >

                        🔧 Espace technicien

                    </button>

                )

                :

                (

                    <button

                        className="mt-4 w-full border p-3 rounded"

                        onClick={() =>
                            navigate(
                                `/login?redirect=/portes/${porteId}`
                            )
                        }

                    >

                        🔧 Accès technicien

                    </button>

                )

                }


            </div>

        </div>

    );

}

export default DoorLanding;