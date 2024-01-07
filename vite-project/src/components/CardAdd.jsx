import { useState } from "react";
import axiosClient from "../api/axiosClient";

const CardAdd = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        drug_id: "",
        outdated_date: "",
        nb_in_box: "",
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/addToUserWallet", formData).then(() => {
                setFormData({
                    drug_id: "",
                    outdated_date: "",
                    nb_in_box: "",
                });
                location.reload();
            });
        } catch (error) {
            console.error(error);
        }
        handleCloseModal();
    };

    const handleCloseModalOutsideClick = (e) => {
        if (e.target.classList.contains("bg-gray-500")) {
            handleCloseModal();
        }
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
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
                >
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h2 className="text-2xl font-semibold mb-4">
                            Ajouter un médicament
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="drug_id"
                                    className="block text-blue-500 text-sm mb-2"
                                >
                                    Drug ID
                                </label>
                                <input
                                    type="text"
                                    id="drug_id"
                                    name="drug_id"
                                    value={formData.drug_id}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
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
