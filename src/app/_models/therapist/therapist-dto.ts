import { FileHandle } from "../file/FileHandle"
import { TherapistInfoDTO } from "./therapist-info-dto";

export class TherapistDTO{
  id: number;
	fullname: string;
	email: string;
	mobile: string;
	username: string;
	role: string;

	// image: any;
	// imageName: string;
	// imageType: string;
  imageUrl: string;

	enabled: boolean;
	nonLocked: boolean;
	activated: boolean;
	submited: boolean;
	created: any;

	therapistInfoDto: TherapistInfoDTO;

  userImage: FileHandle


	// Add an index signature to inform TypeScript about the dynamic property access
  [key: string]: number | string | boolean | TherapistInfoDTO | FileHandle;
}