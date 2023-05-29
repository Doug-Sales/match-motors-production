import {  Heading,Icon,HStack } from "native-base";
import { TouchableOpacity } from "react-native";

import { useAuth } from "@hooks/useAuth";
import { MaterialIcons } from '@expo/vector-icons'



type Props = {
    title: string;
}

export function ScreenHeader({ title }: Props) {
    const { signOut } = useAuth();

    return (
        <HStack bg={'gray.600'} pb={6} justifyContent={"space-around"} alignItems={"center"} pt={16}  >
            <Heading color={'gray.100'}  fontSize={'xl'}  fontFamily={'heading'} >
                {title}
            </Heading>
            <TouchableOpacity onPress={signOut} >
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color='gray.200'
                    size={6}
                />
            </TouchableOpacity>
        </HStack>

    );
}


