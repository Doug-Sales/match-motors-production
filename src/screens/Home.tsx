import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {  VStack, FlatList, Text, SectionList } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { CarAdComponent } from "@components/CarAdComponent";

export function Home() {

    const [groups, setGroups] = useState(['todos', 'sedan', 'hatch', 'picape', 'suv', 'van'])
    const [groupSelected, setGroupSelected] = useState('todos')
    const [listCar, setListCar] = useState([
        {
            title: 'Corsa Wind 1997',
            data: [{ price: '9.900', date: '19.04.23' }]
        },
        {
            title: 'Sandero 1.6 Privilége 2009',
            data: [{ price: '26.000', date: '25.01.23' }]
        },
        {
            title: 'Corolla XLi Automático',
            data: [{ price: '37.000', date: '12.11.22' }],
        }
    ])

    const navigation = useNavigation<AppNavigatorRoutesProps>();



    function handleOpenAdDetails(carModel: string, date: string, price: string): void {
        navigation.navigate('detail', { carModel, date, price });
    }


    return (
        <VStack flex={1} >
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={4}
                maxHeight={10}
                minH={10}
            />

            <VStack flex={1} px={8} pt={4} >
                <SectionList
                    sections={listCar}
                    keyExtractor={item => item.price}
                    renderItem={({ section, item }) => (
                        <CarAdComponent
                            modelCar={section.title}
                            price={item.price}
                            date={item.date}
                            onPress={() => handleOpenAdDetails(section.title, item.price, item.date)} />
                    )}
                    showsVerticalScrollIndicator={false}
                    px={7}
                    contentContainerStyle={listCar.length === 0 && { flex: 1, justifyContent: 'center' }}
                    ListEmptyComponent={() => (
                        <Text color={'gray.100'} textAlign={'center'}  >
                            Parece que não há carros que correspondam à sua pesquisa no momento.  {'\n'}{'\n'}
                            Por que não tenta ampliar sua pesquisa?
                        </Text>
                    )}
                />


            </VStack>


        </VStack>
    );
}

