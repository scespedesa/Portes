import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";




function Login() {

    const [searchParams] = useSearchParams();

    const redirect = searchParams.get("redirect");
    
    const navigate = useNavigate();

    const { login, logout } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, loading } = useAuth();


    const handleSubmit = async () => {
    try {
        await login(email, password);
        if (redirect){
            navigate(redirect);
        }else{
            navigate("/dashboard");
        }
        console.log("Login correcto");
    } catch (error) {
        console.error("Error de login", error);
    }
    };



    return (
    <div>
        <h1>Conexion</h1>

        <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button onClick={handleSubmit}>
        login
        </button>
        
        <button onClick={logout}>
        logout
        </button>

    </div>
  );
}

export default Login;