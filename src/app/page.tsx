'use client';
import styles from "./page.module.css";
import TossPayments from "@/component/tosspayments";
import {TossPaymentsWidgets} from "@tosspayments/tosspayments-sdk";
import {useState} from "react";


export default function Home() {
    const [widget, setWidget] = useState<TossPaymentsWidgets>();

    const handleInit = (widget: TossPaymentsWidgets) => {
        setWidget(widget)
    }

    const handlePayClick = async () => {
        await widget?.requestPayment({
            orderId: '',
            orderName: '테스트'
        });
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <button onClick={handlePayClick}>결제</button>
                <TossPayments amount={10000} onInit={handleInit}/>
            </main>
        </div>
    );
}
