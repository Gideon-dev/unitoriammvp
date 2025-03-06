"use client";
import apiClient from '@/app/lib/apiClient';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'



const HandleSuccessPage = () => {
    const router = useRouter();

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const order_id = params.get("order_id");
            const reference = params.get("reference");

            if (!order_id || !reference) return;

            try {
                const response = await apiClient.post("https://tutormeapi-6w2f.onrender.com/api/v2/payment-success/", {
                    order_id,
                    reference,
                });

                if (response.data.status === "success") {
                    router.push("/auth/checkout/confirmed");
                } else {
                    console.error("Payment verification failed.");
                    router.push("/auth/checkout/failed");
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
            }
        };

        verifyPayment();
    }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Verifying your payment...</p>
    </div>
  )
}

export default HandleSuccessPage;