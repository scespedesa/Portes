import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function Porte(){

    const { porteId } = useParams();

    const [porte, setPorte] = useState(null);


    useEffect(() => {

        fetch(
            `http://127.0.0.1:8000/api/portes/${porteId}`
        )
        .then(response => response.json())
        .then(data => {
            setPorte(data);
        });

    }, [porteId]);



    return (

        <div>

            <h1>
                Information porte
            </h1>


            {
                porte && (

                    <div>

                        <h2>
                            Porte {porte.nom}
                        </h2>

                        <p>
                            Bâtiment : {porte.batiment_id}
                        </p>

                        <p>
                            Zone : {porte.description}
                        </p>

                    </div>

                )
            }


        </div>

    );
}


export default Porte;