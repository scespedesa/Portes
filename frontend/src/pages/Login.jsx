import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { DoorClosed, LogIn } from "lucide-react";
import { inputClass } from "../components/RowActions.jsx";

function Login() {

    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect");

    const navigate = useNavigate();

    const { login, logout, loading } = useAuth();

    const [email, setEmail] = useState("admin@portes.com");
    const [password, setPassword] = useState("1234");


    const submit = async () => {
        try {
            await login(email, password);

            console.log("Login correcto");

            if (redirect) {
                navigate(redirect);
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            console.error("Erreur de connexion", error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600">

            <div className="w-full max-w-md">

                <Link 
                    to="/" 
                    className="mb-8 flex items-center justify-center gap-2 text-white"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/25 bg-white/15">
                        <DoorClosed className="h-5 w-5" />
                    </div>

                    <div 
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        PortesMCA
                    </div>
                </Link>


                <div className="rounded-xl bg-white shadow-2xl">


                    <div className="border-b border-slate-200 px-6 py-5">

                        <h1 
                            className="text-lg font-semibold text-slate-900"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Connexion au portail
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Accédez à la gestion de la maintenance.
                        </p>

                    </div>



                    <div className="px-6 py-6">


                        <div className="space-y-4">


                            <div className="space-y-1.5">

                                <label 
                                    htmlFor="email"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>


                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                />

                            </div>



                            <div className="space-y-1.5">

                                <label 
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Mot de passe
                                </label>


                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClass}
                                />

                            </div>



                            <button
                                type="button"
                                onClick={submit}
                                disabled={loading}
                                className="
                                    inline-flex w-full items-center justify-center 
                                    gap-2 rounded-md bg-blue-600 px-4 py-2.5 
                                    text-sm font-medium text-white shadow 
                                    hover:bg-blue-700 disabled:opacity-60
                                "
                            >

                                <LogIn className="h-4 w-4" />

                                {loading 
                                    ? "Connexion…" 
                                    : "Se connecter"
                                }

                            </button>


                            <button
                                type="button"
                                onClick={logout}
                                className="
                                    w-full rounded-md border border-slate-200 
                                    px-4 py-2 text-sm text-slate-600 
                                    hover:bg-slate-50
                                "
                            >
                                Déconnexion
                            </button>


                        </div>




                        <div className="mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-600">

                            <div className="font-medium text-slate-900">
                                Comptes de démonstration
                            </div>

                            <div>
                                Admin — admin@portespro.fr / admin123
                            </div>

                            <div>
                                Technicien — tech@portespro.fr / tech123
                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;