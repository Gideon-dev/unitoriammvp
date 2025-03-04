import { useRouter } from 'next/router';
import { useEffect } from 'react';
import apiClient from './apiClient';
import { MainCourse } from '../utils/interface';
import { Session } from 'next-auth';

type handlePaymentProps = {
    gateway: string,
    course: MainCourse | null,
    session: Session | null
}
const HandlePayment = async ({gateway, course, session}:handlePaymentProps) => {
    if (!session) {
        console.error("User not authenticated");
        return;
    }
    try {
        const response = await apiClient.post("https://tutormeapi-6w2f.onrender.com/api/v2/initialize-payment/", {
            full_name: session?.full_name,
            email: session?.email,
            price: course?.price,
            course_id: course?.id,
            user_id: session?.userId,
            gateway : gateway
        });

        if (response.data.payment_url) {
            window.location.href = response.data.payment_url;
        }
    } catch (error) {
        console.error("Payment initialization failed:", error);
    }
};

const VerifyPayment = () => {
    const router = useRouter();

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const order_id = params.get("order_id");
            const reference = params.get("reference");

            if (!order_id || !reference) return;

            try {
                const response = await apiClient.post("/success-api", {
                    order_id,
                    reference,
                });

                if (response.data.status === "success") {
                    router.push("/checkout/confirmed");
                } else {
                    console.error("Payment verification failed.");
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
            }
        };

        verifyPayment();
    }, [router]);

    return null;
};

export { HandlePayment, VerifyPayment };
