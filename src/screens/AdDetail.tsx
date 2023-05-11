import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Heading, Icon, Image, Text, VStack, ScrollView, Pressable, useToast, Center } from "native-base";
import { Octicons, Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";




type RouteParams = {
    modelCar: string;
    price: string;
    date: string;
}


export function AdDetail() {
    const [isClicked, setIsClicked] = useState(false);

    const toast = useToast();

    const route = useRoute();
    const { modelCar, date, price } = route.params as RouteParams;
    const navigation = useNavigation<AppNavigatorRoutesProps>();


    function handleGoBack() {
        navigation.goBack();
    }

    function handleFavoriteAd() {
        setIsClicked(prevState => !prevState);

        if (!isClicked) {
            toast.show({
                title: 'Adicionado aos favoritos.',
                placement: 'top',
                duration: 3000,
                variant: 'solid',
                backgroundColor: 'blue.600',
                marginTop:8,
                marginRight:-10,

            })
        }

        //criar ação para listar favoritos (adicionar e remover)
    }

    return (
        <VStack flex={1} >
            <VStack px={8} bg={'gray.600'} pt={12} >
                <TouchableOpacity onPress={handleGoBack} >
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color={'blue.500'}
                        size={6}
                    />
                </TouchableOpacity>

                <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems={'center'} >
                    <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1} fontFamily={'heading'}>
                        Anúncio
                    </Heading>

                    <Pressable onPress={handleFavoriteAd}  >
                        <Icon
                            as={Octicons}
                            name={isClicked ? 'heart-fill' : "heart"}
                            color={isClicked ? 'red.500' : 'red.500'}
                            size={7}
                        />

                    </Pressable>

                </HStack>
            </VStack>

            <ScrollView>
                <VStack p={8} >
                    <Image
                        w={'full'}
                        h={80}
                        source={{ uri: "https://img.olhardigital.com.br/wp-content/uploads/2022/04/tesla-roadster.webp" }}
                        alt="Treinando puxada frontal"
                        mb={3}
                        resizeMode="cover"
                        rounded={'lg'}
                        overflow={'hidden'}
                    />
                    <Box bg={'gray.600'} rounded={'md'} pb={4} px={4} >
                        <HStack justifyContent={'space-around'} alignItems={'center'} mb={6} mt={5} >
                            <HStack>
                                
                                <Text color={'white'} ml={2} >
                                   {modelCar}
                                </Text>
                            </HStack>

                        </HStack>
                            <HStack>
                                
                                <Text color={'gray.200'} mr={2} >
                                    {price}
                                </Text>
                            </HStack>
                        {/* <Button
                            title="Marcar como realizado"
                        /> */}
                    </Box>
                </VStack>
            </ScrollView>

        </VStack >
    );
}

