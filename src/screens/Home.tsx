import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { VStack, FlatList, Text, useTheme, Divider, Center } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HomeHeader } from "@components/HomeHeader";
import { CarAdComponent } from "@components/CarAdComponent";
import { TabHeaderFilter } from '@components/TabHeaderFilter';

export function Home() {
    const { colors } = useTheme()
    const [listCar, setListCar] = useState([
        {
            img: 'https://images.unsplash.com/photo-1657144513372-282839dc33ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMxfHxwb3JjaGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            model: 'Corsa Wind ',
            price: '9.900',
            year: '1997',
            km: '12.8207',
            state: 'São Paulo'

        },
        {
            img: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm8lMjBlc3BvcnRpdm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            model: 'Sandero 1.6  ',
            price: '26.000',
            year: '2009',
            km: '40.8721',
            state: 'São Paulo'

        },
        {
            img: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGNhcnJvJTIwZXNwb3J0aXZvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            model: 'Corolla XLi Automático',
            price: '37.000',
            year: '2022',
            km: '10.807',
            state: 'São Paulo'

        },
        {
            img: 'https://images.unsplash.com/photo-1628883714122-3b6ffeaf8f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhcnJvJTIwZXNwb3J0aXZvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            model: 'Sandero 1.6 Privilége ',
            price: '26.000',
            year: '2015',
            km: '10.8807',
            state: 'São Paulo'

        },
        {
            img: 'https://images.unsplash.com/photo-1609964729554-a02fb2a04830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxjYXJybyUyMGVzcG9ydGl2b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            model: 'Corolla XLi ',
            price: '37.000',
            year: '2023',
            km: '90.8807',
            state: 'São Paulo'

        },
        {
            img: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fycm9zfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            model: 'Sandero 1.6  CLI',
            price: '26.000',
            year: '2009',
            km: '10.207',
            state: 'São Paulo',

        },
        {
            img: 'https://images.unsplash.com/photo-1573074513856-c8e3ed0f61ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxjYXJybyUyMGVzcG9ydGl2b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            model: 'Corolla Automático',
            price: '37.000',
            year: '2000',
            km: '80.087',
            state: 'São Paulo'

        }
    ])

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenAdDetails(carModel: string, year: string, price: string, km: string, state: string, img: string): void {
        navigation.navigate('detail', { carModel, year, price, km, state, img });
    }


    const separator = () => {
        return (
            <Divider
                style={{
                    marginVertical: 10,
                    backgroundColor: colors.gray[400]
                }}
            />
        )
    }

    return (
        <VStack flex={1} >

            <HomeHeader />

            <Center >
                <TabHeaderFilter
                    length={listCar.length}
                />
            </Center>
            <VStack flex={1} py={2} bg={'gray.600'} >
                <FlatList
                    data={listCar}
                    keyExtractor={item => item.model}
                    renderItem={({ item }) => (
                        < CarAdComponent
                            img={item.img}
                            modelCar={item.model}
                            price={item.price}
                            year={item.year}
                            km={item.km}
                            state={item.state}
                            onPress={() => handleOpenAdDetails(item.model, item.year, item.price, item.km, item.state, item.img)} />
                    )}

                    ItemSeparatorComponent={separator}
                    showsVerticalScrollIndicator={false}
                    px={1}
                    contentContainerStyle={listCar.length === 0 && { flex: 1, justifyContent: 'center' }}
                    ListEmptyComponent={() => (
                        <Text color={'gray.100'} textAlign={'center'}  >
                            Parece que não há carros para ser listado no momento.

                        </Text>
                    )}
                />
            </VStack>


        </VStack>
    );
}

