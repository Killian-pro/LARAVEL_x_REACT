import { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosClient from "../api/axiosClient";
import CardAdd from "../components/CardAdd";

export default function HomePage() {
    const [dataWallet, setDataWallet] = useState([]);

    useEffect(() => {
        getDataWallet();
    }, []);

    async function getDataWallet() {
        await axiosClient.get("/showUserWallet").then((res) => {
            setDataWallet(res.data.data);
        });
    }

    return (
        <div>
            {dataWallet?.map((it, index) => (
                <div key={index}>
                    <Card
                        name={it.name}
                        dateEnd={it.outdated_date}
                        number={it.nb_in_box}
                        dateLast={it.last_use}
                    />
                </div>
            ))}
            <CardAdd />
        </div>
    );
}
