import { FileHandle } from "../file/FileHandle"

export class UserDTO{
  id: number
	fullname: string
	email: string
	mobile: string
	username: string
	role: string
	provider: string
	// image: any
	// imageName: string
	// imageType: string
  imageUrl: string
	enabled: boolean
	nonLocked: boolean

  userImage: FileHandle
}