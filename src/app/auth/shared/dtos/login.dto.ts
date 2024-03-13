import { UserDto } from "./user.dto";

export interface loginDto {
    access_token: string;
    item:UserDto;
}