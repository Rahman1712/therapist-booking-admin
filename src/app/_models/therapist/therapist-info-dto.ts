import { Address } from "./address";
import { CategoryDTO } from "./category-dto";

export class TherapistInfoDTO {
  id: number;
  bio: string;
  experience_years: number;
  hourly_rate: number;
  is_certified: boolean;
  qualification: string;
  address: Address;
  languages: string[];
  categories: CategoryDTO[];
  therapistId: number;

  educationalCertificate: any;
  experienceCertificate: any;
  additionalCertificate: any;
  
  experienceCertificateType: string;
	educationalCertificateType: string;
	additionalCertificateType: string;

}