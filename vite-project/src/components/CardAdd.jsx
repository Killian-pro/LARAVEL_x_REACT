import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const CardAdd = ({ reloadMedic }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState({
        name: "",
        id: "",
    });
    const [formData, setFormData] = useState({
        drug_id: "",
        outdated_date: "",
        nb_in_box: "",
    });

    useEffect(() => {
        if (searchTerm.id !== formData.drug_id) {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setFormData({
            drug_id: "",
            outdated_date: "",
            nb_in_box: "",
        });
        setSearchTerm({
            name: "",
            id: "",
        });
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchData = async () => {
        try {
            const response = await axiosClient.get(
                `http://localhost:8000/api/searchDrug?term=${searchTerm.name}`
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/addToUserWallet", formData).then(() => {
                reloadMedic();
                handleCloseModal();
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModalOutsideClick = (e) => {
        if (e.target.classList.contains("bg-gray-500")) {
            handleCloseModal();
        }
    };

    const handleItemClick = (result) => {
        setFormData({
            ...formData,
            drug_id: result.id,
        });
        setSearchTerm({ name: result.name, id: result.id });
        setSearchResults([]);
    };

    return (
        <div>
            <div
                className="w-80 h-40 bg-white transition-transform duration-300 hover:scale-105 rounded-md shadow-md m-4 flex flex-col items-center justify-center text-center cursor-pointer"
                onClick={handleOpenModal}
            >
                <div className="text-4xl text-blue-900">+</div>
                <div className="mt-2">
                    <p className="text-lg font-semibold text-blue-900">
                        Ajouter un nouveau médicament
                    </p>
                    <p className="text-gray-600">à ma wallet</p>
                </div>
            </div>

            {isModalOpen && (
                <div
                    onClick={handleCloseModalOutsideClick}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h2 className="text-2xl font-semibold mb-4">
                            Ajouter un médicament
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <div className="mb-4 relative">
                                    <label
                                        htmlFor="drug_id"
                                        className="block text-blue-500 text-sm mb-2"
                                    >
                                        Médicament
                                    </label>
                                    <input
                                        type="text"
                                        id="drug_id"
                                        name="drug_id"
                                        value={searchTerm.name}
                                        onChange={(e) => {
                                            setSearchTerm({
                                                name: e.target.value,
                                            });
                                        }}
                                        className="w-full border p-2 rounded"
                                        placeholder="Recherchez un médicament..."
                                    />
                                    {searchResults.length > 0 ? (
                                        <ul className="absolute top-full left-0 bg-white border border-gray-300 rounded-b-md shadow-md mt-1 w-full">
                                            {searchResults.map((result) => (
                                                <li
                                                    onClick={() =>
                                                        handleItemClick(result)
                                                    }
                                                    key={result.id}
                                                    className="text-blue-950 p-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {result.name}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        searchResults.length == 0 &&
                                        searchTerm.id !== formData.drug_id &&
                                        searchTerm.name && (
                                            <ul className="absolute top-full left-0 bg-white border border-gray-300 rounded-b-md shadow-md mt-1 w-full">
                                                <li className="text-blue-950 p-2 cursor-pointer hover:bg-gray-200">
                                                    Aucun résultat
                                                    <div className="text-blue-500 text-xs right-2 absolute bottom-0">
                                                        + créé un nouveau
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    )}
                                </div>
                                {searchResults.length > 0 && (
                                    <ul>
                                        {searchResults.map((result) => (
                                            <li
                                                className="text-black"
                                                key={result.id}
                                            >
                                                {result.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="outdated_date"
                                    className="block text-blue-500 text-sm mb-2"
                                >
                                    Date de péremption
                                </label>
                                <input
                                    type="text"
                                    id="outdated_date"
                                    name="outdated_date"
                                    value={formData.outdated_date}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="nb_in_box"
                                    className="block text-blue-500 text-sm mb-2"
                                >
                                    Nombre dans la boite
                                </label>
                                <input
                                    type="text"
                                    id="nb_in_box"
                                    name="nb_in_box"
                                    value={formData.nb_in_box}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardAdd;
