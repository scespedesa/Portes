import { useEffect, useState } from "react";
import { getTypeIncidents } from "../services/api";
import Card from "../components/Card";


function TestEnums() {

    const [types, setTypes] = useState([]);


    useEffect(() => {

        getTypeIncidents()
            .then(data => {
                setTypes(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <div>


            <h1>
                Types d'incidents
            </h1>

            <Card title="Informations de la porte">
                Porte : <span className="font-medium">jscdce</span>
            </Card>


            <select>

                {types.map((type) => (

                    <option key={type}>
                        {type}
                    </option>

                ))}

            </select>


        </div>
    );
}

export default TestEnums;