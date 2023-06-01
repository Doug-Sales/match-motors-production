import { TouchableOpacity } from "react-native";
import { HStack, Box } from "native-base";
import { Button } from "@components/Button";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";



import { useAuth } from "@hooks/useAuth";

import defaultUserPhoto from '@assets/userPhotoDefault.png'
import { UserPhoto } from "./UserPhoto";


export function HomeHeader() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenProfile() {
        navigation.navigate("profile")
    }

    function handleNewAdRoute(){
        navigation.navigate("new_ad")
    }
    return (
        <HStack bg='gray.600' alignItems="center" pb={5} pt={16} px={8} >
            <TouchableOpacity onPress={handleOpenProfile}>
                <UserPhoto
                    source={
                        user.avatar
                            ? { uri: `$"{api.defaults.baseURL}"/avatar/${user.avatar}` }
                            : defaultUserPhoto}
                    size={16}
                    alt="Foto do usuario"
                    mr={4}
                />
            </TouchableOpacity>

            <Box flex={1} height={14} alignItems={"flex-end"} justifyContent={"center"}>
                <Button
                    title="    Criar anúncio    +"
                    onPress={handleNewAdRoute}
                    rounded={10}
                    width={'60%'}
                    height={'80%'}
                />
            </Box>
        </HStack>
    );
}


