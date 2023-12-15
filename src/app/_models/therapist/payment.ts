import { PaymentMethod } from "./payment-method";

export class Payment{
    pid: string;
    bookingId: string;
    amount: number;
    razorPaymentId: string;
    paymentMethod: PaymentMethod;
    paymentDate: any;
}