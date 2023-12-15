import { BookingStatus } from "./booking-status";
import { BookingType } from "./booking-type";
import { Payment } from "./payment";
import { PaymentStatus } from "./payment-status";
import { TherapistInfoUserDto } from "./therapist-info-user-dto";
import { TimeSlot } from "./time-slot";
import { UserData } from "./user-data";

export class BookingDTO{

	id: string;
	appointmentDateTime: any;
	rescheduleDateTime: any;
	cancellationDateTime: any;
	date: string;
	notes: string;
	minutes: number;
	amount: number;
	timeSlot: TimeSlot;
	userData: UserData;
	therapistInfo: TherapistInfoUserDto; // therapistInfo ithanu name vendathu
	bookingStatus: BookingStatus;
	paymentStatus: PaymentStatus;
	bookingType: BookingType;
	payment: Payment; 
}