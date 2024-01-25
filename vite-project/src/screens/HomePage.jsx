import { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosClient from "../api/axiosClient";
import CardAdd from "../components/CardAdd";
import Calendar from "../components/Calendar";

export default function HomePage() {
    const [dataWallet, setDataWallet] = useState([]);
    const [dateMedication, setDateMedication] = useState([]);
    const [isReload, setIsReload] = useState(true);
    const [moreViewMedic, setMoreViewMedic] = useState(false);

    useEffect(() => {
        if (isReload) {
            getDataWallet();
            getDataTakingMedic();
            setIsReload(false);
        }
    }, [isReload]);

    function reloadMedic() {
        setIsReload(true);
    }

    async function getDataWallet() {
        await axiosClient.get("/showUserWallet").then((res) => {
            setDataWallet(res.data.data);
        });
    }

    async function getDataTakingMedic() {
        await axiosClient.get("/showUserTakingMedication").then((res) => {
            setDateMedication(res.data.data);
        });
    }

    async function getDataTakingMedicByID(id) {
        console.log(id);
        await axiosClient
            .get("/ShowOnlyOneUserTakingMedication/" + id)
            .then((res) => {
                setDateMedication(res.data.data);
            });
    }

    return (
        <div className="flex max-h-screen bg-slate-950">
            <div
                style={{
                    flex: moreViewMedic ? 4 : 0,
                    transition: "flex 2s",
                }}
                className="flex flex-wrap bg-slate-200 flex-col overflow-hidden min-w-96 overflow-x-visible"
            >
                {dataWallet?.map((it, index) => (
                    <div key={index}>
                        <Card
                            id={it.id}
                            drug={it.drug}
                            dateEnd={it.outdated_date}
                            number={it.nb_in_box}
                            dateLast={it.last_use}
                            reloadMedic={reloadMedic}
                            getDataTakingMedicByID={getDataTakingMedicByID}
                        />
                    </div>
                ))}
                <CardAdd reloadMedic={reloadMedic} />
            </div>
            <div
                className="w-full flex-1 relative"
                style={{ minWidth: "40vw" }}
            >
                <div
                    onClick={() => {
                        setMoreViewMedic(!moreViewMedic);
                    }}
                    className="w-10 h-10 -left-4 top-1/2 flex items-center justify-center bg-blue-600 absolute rounded-full"
                    style={{
                        transform: moreViewMedic ? "scaleX(-1)" : "scaleX(1)",
                    }}
                >
                    {">"}
                </div>
                <div>
                    <Calendar events={dateMedication} />
                </div>
            </div>
        </div>
    );
}
