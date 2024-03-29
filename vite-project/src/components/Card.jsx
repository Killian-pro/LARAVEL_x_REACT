import { useState } from "react";
import axiosClient from "../api/axiosClient";

const Card = ({
    id,
    drug,
    dateEnd,
    number,
    dateLast,
    reloadMedic,
    getDataTakingMedicByID,
}) => {
    const currentDate = new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counter, setCounter] = useState(1);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/takingMedication/" + id).then(() => {
                reloadMedic();
            });
        } catch (error) {
            console.error(error);
        }
        handleCloseModal();
    };

    const handleIncrementCounter = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleDecrementCounter = () => {
        if (counter > 1) {
            setCounter((prevCounter) => prevCounter - 1);
        }
    };

    const handleCloseModalOutsideClick = (e) => {
        if (e.target.classList.contains("bg-gray-500")) {
            handleCloseModal();
        }
    };

    async function disabledCard() {
        try {
            await axiosClient.put("/disabledProduct/" + id).then(() => {
                reloadMedic();
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div
                className={`relative p-4 w-80 bg-white ${
                    new Date(dateEnd) < currentDate
                        ? "transition-none"
                        : "transition-transform duration-300 hover:scale-105"
                } rounded-md shadow-md m-4 flex flex-col items-center justify-center text-center cursor-pointer`}
            >
                {new Date(dateEnd) < currentDate ? (
                    <div className="cursor-default">
                        <div
                            onClick={disabledCard}
                            className="bg-black left-2 top-2 absolute z-10 cursor-pointer"
                        >
                            Show Off
                        </div>
                        <div className="absolute top-0 left-0 w-full h-1/4 bg-red-200 opacity-50"></div>
                        <div className="absolute top-1/4 left-0 w-full h-1/4 bg-white opacity-50"></div>
                        <div className="absolute top-1/2 left-0 w-full h-1/4 bg-red-200 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-white opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold">
                            Périmé
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className="flex gap-1 items-center">
                    <div className="text-sm text-blue-500 mb-2">Nom : </div>
                    <div className="text-lg text-blue-500 mb-2">
                        {drug.name}
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="text-sm text-blue-500 mb-2">
                        date de péremption :
                    </div>
                    <div className="text-lg text-blue-500 mb-2">{dateEnd} </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="text-sm text-blue-500 mb-2">
                        Nombre dans la boite :
                    </div>
                    <div className="text-lg text-blue-500 mb-2"> {number} </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="text-sm text-blue-500 mb-2">
                        Dernière prise :
                    </div>
                    <div className="text-lg text-blue-500 mb-2">
                        {dateLast ? dateLast : "Neuf"}
                    </div>
                </div>
                <div className="flex justify-between mt-4 gap-2">
                    <button
                        onClick={() => getDataTakingMedicByID(drug.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Voir
                    </button>
                    <button
                        disabled={number < 1}
                        onClick={handleOpenModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Prendre une prise
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div
                    onClick={handleCloseModalOutsideClick}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h2 className="text-2xl text-blue-500 font-semibold mb-4">
                            Êtes-vous sûr de valider ?
                        </h2>
                        <div className="flex items-center justify-center my-8">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleDecrementCounter}
                            >
                                -
                            </button>
                            <span className="mx-4 text-lg text-blue-500 font-semibold">
                                {counter}
                            </span>
                            <button
                                disabled={true}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleIncrementCounter}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex justify-end mt-14">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                                onClick={handleSubmit}
                            >
                                Valider
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleCloseModal}
                            >
                                Refuser
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Card;
