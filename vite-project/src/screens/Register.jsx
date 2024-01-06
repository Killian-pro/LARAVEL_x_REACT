import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../api/axiosClient";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/signup", formData).then(({ data }) => {
                localStorage.setItem("token", data.token);
                location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-600 text-sm mb-2"
                        >
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-600 text-sm mb-2"
                        >
                            Adresse email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-600 text-sm mb-2"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-gray-600 text-sm mb-2"
                        >
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="mt-4 text-gray-600 text-sm">
                    Vous avez déjà un compte ?
                    <Link
                        to="/login"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
