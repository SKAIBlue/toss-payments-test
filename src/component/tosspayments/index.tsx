'use client';

import React, {useEffect, useState} from 'react';
import {
    loadTossPayments,
    TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';

interface Props {
    amount: number;
    onInit?: (widget: TossPaymentsWidgets) => void;
    onReady?: (isReady: boolean) => void;
}

export default function TossPayments(props: Props) {
    const {amount} = props;
    const [widget, setWidget] = useState<TossPaymentsWidgets>();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            const clientKey = '[Client Key]';
            const variantKey = '[Variant Key]';
            const customerId = 'TEST'

            if (!clientKey) {
                alert('Toss Payments API 키가 설정되지 않았습니다.');
                return;
            }
            const tossPayments = await loadTossPayments(clientKey);

            const widget = tossPayments.widgets({
                brandpay: {
                    redirectUrl: `http://localhost:3000/api/v2/payments/toss`,
                },
                customerKey: customerId,
            });

            await widget.setAmount({
                value: amount,
                currency: 'KRW',
            });

            await widget.renderPaymentMethods({
                selector: '#toss-payments',
                variantKey: variantKey,
            });

            const agreements = await widget.renderAgreement({
                selector: '#toss-agreements',
                variantKey: 'AGREEMENT',
            });

            agreements.on('agreementStatusChange', (event) => {
                setIsReady(event.agreedRequiredTerms);
            });

            props.onInit?.(widget);

            setWidget(widget);
        };
        init().then();
    }, []);

    useEffect(() => {
        props.onReady?.(isReady);
    }, [isReady]);

    useEffect(() => {
        if (widget == null) return;

        widget.setAmount({
            value: amount,
            currency: 'KRW',
        }).then();
    }, [amount, widget]);

    return (
        <>
            <div id="toss-payments"/>
            <section className="payment-methods">
                <div id="toss-agreements"/>
            </section>
        </>
    );
}
