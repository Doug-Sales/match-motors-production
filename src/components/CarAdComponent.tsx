import { HStack, Heading, Image, Text, VStack, Icon, Center } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
    modelCar: string;
    price: string;
    date: string;
};

export function CarAdComponent({ modelCar, price, date, ...rest }: Props) {
    return (
        <TouchableOpacity  {...rest} >
            <Center>
                <VStack
                    bg={"gray.500"}
                    alignItems={"center"}
                    justifyContent={'center'}
                    rounded={"md"}
                    mb={6}
                    h={96}
                    w={80}
                >
                    <Image
                        source={{ uri: "https://img.olhardigital.com.br/wp-content/uploads/2022/04/tesla-roadster.webp" }}
                        alt="Anuncio de carros"
                        w={80}
                        h={56}
                        rounded={"md"}
                        resizeMode="cover"
                    />
                    <HStack mt={3} >
                        <Heading fontSize={"lg"} color={"white"} flex={0.8} fontFamily={'heading'} numberOfLines={1} >
                            {modelCar}
                        </Heading>

                    </HStack>

                    <HStack mt={2}>
                        <Text flex={0.8} fontSize={"lg"} color={"gray.200"} numberOfLines={3} >
                            R$ {price}
                        </Text>

                        <Icon
                            as={Entypo}
                            name="chevron-thin-right"
                            color={'gray.300'}
                            size={6}
                        />
                    </HStack>

                    <HStack  alignItems={"center"}  mt={8}>

                        <Icon
                            as={Entypo}
                            name="calendar"
                            color={'gray.300'}
                            size={4}
                            mr={2}
                        />
                        <Text color={'gray.200'} fontSize={'xs'} flex={0.8} numberOfLines={1}>
                            Anunciado em {date}
                        </Text>
                    </HStack>

                </VStack>
            </Center>
        </TouchableOpacity>

    );
}


