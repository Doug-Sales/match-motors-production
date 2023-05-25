import { HStack, Heading, Text, VStack } from "native-base";



export function HistoryCard() {
    return (
        <HStack
            bg={'gray.600'}
            w={250}
            px={5}
            py={4}
            m={1}
            
            rounded={'md'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backgroundColor={'red.400'}
        >

            <VStack mr={10} flex={1} >
                <Heading color={'white'} fontSize={'md'} textTransform={'capitalize'} numberOfLines={1} fontFamily={'heading'}>
                  Parte
                </Heading>

                <Text color={'gray.100'} fontSize={'lg'} numberOfLines={2}>
                   Do Henrique
                </Text>
            </VStack>

            <Text color={'gray.300'} fontSize={'md'}>
                08:56
            </Text>

        </HStack>
    );
}

