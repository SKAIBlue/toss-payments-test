'use client';
import styles from "./page.module.css";
import TossPayments from "@/component/tosspayments";

export default function Home() {

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <TossPayments amount={10000}/>
            </main>
        </div>
    );
}
