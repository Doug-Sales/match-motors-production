import { TouchableOpacity } from "react-native";
import { VStack, HStack, Heading, Text, Icon } from "native-base"; 
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";


export function HomeHeader() {
    return (
        <HStack bg='gray.600' alignItems="center" pb={5} pt={16} px={8} >
            <UserPhoto
                source={{ uri: 'https://github.com/doug-sales.png' }}
                size={16}
                alt="Foto do usuario"
                mr={4}
            />
            <VStack flex={1} >
                <Text color="gray.100" fontSize="md" >
                    Olá,
                </Text>

                <Heading color="gray.100" fontSize="md" fontFamily={'heading'}>
                    Douglas
                </Heading>
            </VStack>

            <TouchableOpacity>
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


