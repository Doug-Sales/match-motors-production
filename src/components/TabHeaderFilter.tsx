import { HStack, Text, Box } from "native-base";

type Props = {
    length: number;
}

export function TabHeaderFilter({ length }: Props) {


    return (
        <HStack width={'full'} alignItems={"center"} backgroundColor={'gray.500'} h={10} px={1}  >
            <Box flex={0.5} flexDirection={"row"} paddingLeft={4} >
                <Text color={'gray.200'} mr={1} fontSize={12} /* dados filtrados lenght*/ >
                    {length?length:'Sem'}
                </Text>
                <Text color={'gray.200'} fontSize={12}> {length > 1 ? 'veículos' : 'veículo no momento'}</Text>
            </Box>
        </HStack >

    )
}
