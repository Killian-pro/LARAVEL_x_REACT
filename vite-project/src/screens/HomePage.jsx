import { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosClient from "../api/axiosClient";
import CardAdd from "../components/CardAdd";
import Calendar from "../components/Calendar";

export default function HomePage() {
    const [dataWallet, setDataWallet] = useState([]);
    const [dateMedication, setDateMedication] = useState([]);

    useEffect(() => {
        getDataWallet();
        getDataTakingMedic();
    }, []);

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

    return (
        <div className="flex max-h-screen bg-slate-950">
            <div>
                {dataWallet?.map((it, index) => (
                    <div key={index}>
                        <Card
                            id={it.id}
                            name={it.name}
                            dateEnd={it.outdated_date}
                            number={it.nb_in_box}
                            dateLast={it.last_use}
                        />
                    </div>
                ))}
                <CardAdd />
            </div>
            <div className="w-full">
                <Calendar events={dateMedication} />
            </div>
        </div>
    );
}
