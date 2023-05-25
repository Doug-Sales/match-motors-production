import { AdDetailsDTO } from "./AdDetailsDTO";

export type FavoritesDTO = {
    title: string;
    data_favorites_id?: AdDetailsDTO[];
}