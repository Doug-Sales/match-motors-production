import { useState } from "react";

import {  VStack,  Text, FlatList } from "native-base";
import { CarAdComponent } from "@components/CarAdComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ScreenHeader } from "@components/ScreenHeader";




//lista modelo de demonstação, precisa puxar do banco de dados com base no id do anuncio.

// tem a opção de booleano no componente para renderização ver CarAdComponent
export function MyFavorites() {


    const groupList = ([
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




    return (
          
        <VStack flex={1} marginTop={5} w={'100%'}>
            <FlatList
                data={groupList}
                keyExtractor={item => item.img}
                renderItem={({ item }) => (
                    < CarAdComponent
                        img={item.img}
                        modelCar={item.model}
                        price={item.price}
                        year={item.year}
                        km={item.km}
                        state={item.state}
                        onPress={() => { }} />
                )}
                showsVerticalScrollIndicator={false}
                px={2}
                mb={15}
                contentContainerStyle={groupList.length === 0 && { flex: 1, justifyContent: 'center' }}
                ListEmptyComponent={() => (
                    <Text color={'gray.100'} textAlign={'center'}  >
                        Sua lista de favoritos parece um pouco vazia. {'\n'}{'\n'}
                        Adicione alguns carros para começar a comparar e escolher o seu favorito.
                    </Text>
                )}
            />

        </VStack>
    );
}



