import { useState } from "react";

import { TouchableOpacity, ImageBackground, View, Dimensions } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Box, HStack, Heading, Icon, Text, VStack, Pressable, useToast, FlatList, AspectRatio, Image, useTheme } from "native-base";

import { Octicons, Feather } from '@expo/vector-icons'

import { SafeAreaView } from "react-native-safe-area-context";
import { AppTabNavigatorRoutesProps } from "./MySpace";



type RouteParams = {
    id: string;
    img: string;
    modelCar: string;
    price: string;
    year: string;
    km: string;
    state: string;
    add_remove: boolean;
}


export function AdDetail() {
    const route = useRoute();
    const { colors } = useTheme()
    const navigation = useNavigation<AppTabNavigatorRoutesProps>();
    const { img } = route.params as RouteParams;
    const { width } = Dimensions.get('window')
    const [isClicked, setIsClicked] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [userAdImage, setUserAdImage] = useState([
        {
            id: '1',
            url: img

        },
        {
            id: '2',
            url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fycm9zfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '3',
            url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnJvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '4',
            url: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNhcnJvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '5',
            url: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNhcnJvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '6',
            url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGNhcnJvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },

    ]);

    const toast = useToast();

    function handleGoBack() {
        navigation.goBack();
    }
    function handleFavoriteAd() {

        if (!isClicked) {

            toast.show({
                title: 'Adicionado aos favoritos.',
                placement: 'top',
                duration: 2000,
                variant: 'solid',
                backgroundColor: 'blue.600',
                marginTop: 8,
                marginRight: -10,
            })
            

        } else {
            toast.show({
                title: 'Removido dos favoritos.',
                placement: 'top',
                duration: 2000,
                variant: 'solid',
                backgroundColor: 'red.600',
                marginTop: 8,
                marginRight: -10,
            })
            
        }
        setIsClicked(prevState => !prevState);
        //criar ação para listar favoritos (adicionar e remover)
    }

    if (userAdImage[0].url !== img) {
        // lógica para teste... criar estrutura para renderizar as fotos do anuncio
        userAdImage[0].url = img;

        setUserAdImage(userAdImage);
    }


    return (
        <VStack flex={0.8} safeArea>
            <VStack px={8} pt={8} bg={'gray.600'} my={1}  >
                <HStack justifyContent={'space-between'} mt={2} mb={6} alignItems={'center'} >
                    <TouchableOpacity onPress={handleGoBack} >
                        <Icon
                            as={Feather}
                            name="arrow-left"
                            color={'blue.500'}
                            size={6}
                        />
                    </TouchableOpacity>

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
            <SafeAreaView>
                <FlatList
                    pagingEnabled
                    horizontal
                    snapToAlignment="center"
                    centerContent
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        setActiveIndex(parseInt((event.nativeEvent.contentOffset.x / width).toString()))
                    }}
                    scrollEventThrottle={16}
                    data={userAdImage}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <HStack height={width} width={width} justifyContent={"center"}  >
                            <AspectRatio justifyContent={"center"} alignItems={"center"} ratio={5 / 6}  >
                                <ImageBackground
                                    source={{ uri: `${item.url}` }}
                                    imageStyle={{
                                        resizeMode: 'cover',
                                        opacity: 0.2,
                                        borderRadius: 15,
                                        backgroundColor: 'rgba(14, 21, 29, 0.58)',
                                        borderColor: 'rgba(255, 255, 255, 0.125)',
                                        marginHorizontal: -35,
                                        paddingHorizontal: -10,

                                    }}
                                >
                                    <View style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    >
                                        <Image
                                            source={{ uri: `${item.url}` }}
                                            alt="detalhes do anuncio"
                                            resizeMode="cover"
                                            size={'100%'}
                                            maxHeight={'85%'}
                                            maxWidth={'96%'}
                                            rounded={10}
                                            borderWidth={2}
                                            borderColor='rgba(255, 255, 255, 0.13)'
                                        />
                                    </View>
                                </ImageBackground>
                            </AspectRatio>
                        </HStack>
                    )}
                />
                {
                    userAdImage.length > 1 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -20, alignItems: "center" }}>
                            {
                                userAdImage.map((_, i) => (
                                    <View
                                        style={[{
                                            backgroundColor: i === activeIndex ? colors.blue[500] : colors.gray[300],
                                            width: i === activeIndex ? 15 : 8,
                                            height: i === activeIndex ? 15 : 8,
                                            marginHorizontal: i === activeIndex ? 5 : 3,
                                            opacity: i === activeIndex ? 1 : 0.5,
                                            borderRadius: 10,
                                            padding: 5,
                                        }]}
                                    />

                                ))
                            }
                        </View>
                        : null
                }
            </SafeAreaView>

            <Box bg={'gray.600'} rounded={'md'} p={4} m={3} >
                <HStack justifyContent={'space-around'} alignItems={'center'} mb={6} mt={5} >
                    <HStack>
                        <Text color={'gray.200'} ml={2} >
                            {/* {modelCar} */}
                        </Text>
                    </HStack>

                </HStack>
                <HStack>

                    <Text color={'gray.200'} mr={2} >
                        {/* {price} */}
                    </Text>
                </HStack>

            </Box>
        </VStack >
    );
}

