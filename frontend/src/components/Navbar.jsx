import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav 
            style={{
                padding: "15px",
                boderBottom: "1px solid #150505",
                marginBottom: "20px",
                display: "flex",
                gap: "20px"
            }}
            >   <Link to = "/">Accueil</Link>
                <Link to = "/batiments">Batiment</Link>
                <Link to = "/portes">Portes</Link>
                <Link to = "/dashboard">Dashboard</Link>
                <Link to = "/login">Login</Link>
                <Link to = "/test-enums">Enums</Link>
            </nav>
    );
}
export default Navbar;