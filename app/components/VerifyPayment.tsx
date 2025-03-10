// "use client";
// import apiClient from '@/app/lib/apiClient';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React, { useEffect } from 'react'



// const VerifyPaymentPage = () => {
    
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     useEffect(() => {
//         const verifyPayment = async () => {
//             const order_id = searchParams.get("order_id");
//             const reference = searchParams.get("reference");

            
//             console.log("Extracted order_id:", order_id);
//             console.log("Extracted reference:", reference);
//             if (!order_id || !reference) return;

//             try {
//                 const response = await apiClient.post("https://tutormeapi-6w2f.onrender.com/api/v2/payment-success/", {
//                     order_id,
//                     reference,
//                 });
                
//                 if (response.data.status){
//                     const course = response.data.course; 
//                     const payment_method = response.data.payment_portal;
//                     router.replace(`/auth/checkout/confirmed?order_id=${order_id}&course_slug=${course.slug}&payment_method=${payment_method}`);
//                 } else {
//                     console.error("Payment verification failed.");
//                     router.replace("/auth/checkout/failed");
//                 }
//             } catch (error) {
//                 console.error("Error verifying payment:", error);
//             }
//         };

//         verifyPayment();
//     }, [router]);

//   return (
//     <div className="flex h-screen items-center justify-center">
//         <p className="text-lg font-semibold">Verifying your payment...</p>
//     </div>
//   )
// }

// export default VerifyPaymentPage;