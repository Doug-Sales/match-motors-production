import { useState } from "react";

import { Heading, VStack, SectionList, Text } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
    const [favoriteList, setFavoriteList] = useState([]);

    return (
        <VStack flex={1} >
            <ScreenHeader title='Meus favoritos /* Meus anuncios' />
            <SectionList
                sections={favoriteList}
                // keyExtractor={item => item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3} fontFamily={'heading'}>
                        {/* {section.title} */}
                    </Heading>
                )}

                px={7}
                contentContainerStyle={favoriteList.length === 0 && { flex: 1, justifyContent: 'center' }}
                ListEmptyComponent={() => (
                    <Text color={'gray.100'} textAlign={'center'}  >
                        Sua lista de favoritos parece um pouco vazia. {'\n'}{'\n'}
                        Adicione alguns carros para começar a comparar e escolher o seu favorito.
                    </Text>
                )}
                showsVerticalScrollIndicator={false}

            />

        </VStack>
    );
}



