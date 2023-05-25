import { FullDescriptionAdDTO } from './FullDescriptionAdDTO';
import { UserDTO } from './UserDTO'

export type AdDetailsDTO = {
    id_ad: string; //chave única para cada anúncio (Não coloque contato) ==> Icaro
    user_ad: UserDTO[];//Chave do úsuario que fez o anúncio (Pode contato), facilita na listagem dos meus anúncios.

    description:FullDescriptionAdDTO[];
    created_at: string;
    is_ad_active: boolean;
}