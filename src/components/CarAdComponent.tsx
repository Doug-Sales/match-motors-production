import { HStack, Heading, Image, Text, Icon, Center, AspectRatio } from "native-base";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type Props = TouchableOpacityProps & {
    modelCar: string;
    price: string;
    year: string;
    img: string;
    km: string;
    state: string;
    isFavorite?: boolean;
};



const styles = StyleSheet.create({
    container: {
        padding: 2,
        paddingLeft: 8,
        paddingTop: 8,
        flex: 1,
        borderWidth: 1,
        height: '100%',
        backgroundColor: ' rgba(6, 18, 39, 0.77);',
        borderRadius: 10
    },
})

export function CarAdComponent({ modelCar, price, year, img, km, state, isFavorite = false, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} >
            <Center width={'full'} marginY={2} px={2} >
                <HStack
                    h={150}
                    overflow="hidden"
                    rounded={10}
                    alignItems={'center'}
                    bg={'rgba(4, 12, 26, 0.644)'}
                    borderColor={'rgba(255, 255, 255, 0.24)'}
                    borderRadius={12}
                    borderWidth={1}
                    borderStyle={"solid"}
                >
                    <AspectRatio bg={'rgba(17, 25, 40, 0.658)'} rounded={8} h={'85%'} mx={1} ratio={5 / 4}  >
                        <Image
                            source={{ uri: `${img}` }}
                            alt="Anuncio de carros"
                            h={90}
                            resizeMode="cover"
                            size={'full'}
                            rounded={8}
                        />
                    </AspectRatio>

                    <LinearGradient
                        colors={['hsl(210.37, 72%, 35%)', 'transparent']}
                        locations={[0, 0.58]}
                        style={styles.container}
                    >
                        <HStack  >
                            <Text fontSize={"xs"} color={"white"} fontFamily={'mono'} numberOfLines={2} >
                                {modelCar}
                            </Text>
                        </HStack>

                        <HStack mt={4} alignItems={"center"}  >
                            <Heading flex={1} fontSize={"2xl"} color={"gray.50"} fontWeight={'normal'} numberOfLines={1} >
                                R$ {price}
                            </Heading>

                            <Icon
                                as={MaterialCommunityIcons}
                                name={isFavorite ? "delete-off-outline" : "arrow-right-bold-circle-outline"}
                                size={isFavorite ? 7 : 6}
                                color={isFavorite ? "red.500" : 'gray.200'}
                                mr={2}
                            />
                        </HStack>
                        <HStack alignItems={"center"} mt={1}  >
                            <Text color={'gray.200'} fontSize={'2xs'} numberOfLines={1}>
                                {year} - {km} Km - {state}
                            </Text>
                        </HStack>

                    </LinearGradient>
                </HStack>
            </Center>

        </TouchableOpacity>

    );
}



