import { AdDetailsDTO } from "./AdDetailsDTO";

export type UserDTO = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    contact: string;
    data?: AdDetailsDTO[];
}