import { ReactNode, createContext, useEffect, useState } from "react";
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser'
import { UserDTO } from "@dtos/UserDTO"

export type AuthContextDataProps = {
    user: UserDTO;

    signIn: (email: string, password: string) => Promise<void>;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    signOut: () => void;

    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({
        id: '1',
        name: 'user',
        email: '',
        contact: '',
        avatar: ''
    } as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false);



    async function signIn(email: string, password: string) {
        //data = API-POST, validar senha e email. e carregar dadoos do usuário para contexto.

        try {
            setUser({
                id: '1',
                name: 'user',
                email,
                contact: '',
                avatar: ''
            })
            await storageUserSave({
                id: '1',
                name: 'user',
                email,
                contact: '',
                avatar: ''
            })

        } catch (error) {
            throw error;
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);

            //Limpar storage e token se tiver. ===> Icaro
            setUser({} as UserDTO);
            await storageUserRemove();

        } catch (error) {
            throw error;

        } finally {
            setIsLoadingUserStorageData(false);

        }

    }

    async function updateUserProfile(userUpdated: UserDTO) {
        // aplicar lógica de atualização do token e contexto
        try {
            setUser(userUpdated);
            await storageUserSave(userUpdated);

        } catch (error) {
            throw error;
        }
        

    }

    async function loadUserData() {//manter logado
        const userLogged = await storageUserGet();

        if (userLogged) {
            setUser(userLogged)
            console.log(userLogged);//acompanhar
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            updateUserProfile,
            isLoadingUserStorageData
        }} >
            {children}
        </AuthContext.Provider>
    );

}