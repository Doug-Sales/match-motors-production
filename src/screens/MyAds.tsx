

import { VStack, FlatList, Text, SectionList, Center, HStack } from "native-base";
import { HistoryCard } from "@components/HistoryCard";


export function MyAds() {
    return (
        <Center flex={1} backgroundColor={'gray.300'}>
            <HStack backgroundColor={'blue.300'} m={2}>
                <HistoryCard />
            </HStack>
            
        </Center>
    )
}

