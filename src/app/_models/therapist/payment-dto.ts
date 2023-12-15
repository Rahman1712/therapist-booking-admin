import { PaymentMethod } from "./payment-method";
import { RazorPayment } from "./razor-payment";

export class PaymentDto {

  pid: string;
  bookingId: string;
  amount: number;
  razorPaymentId: string;
  razorPayment: RazorPayment;
  paymentMethod: PaymentMethod;
  paymentDate:any;
}