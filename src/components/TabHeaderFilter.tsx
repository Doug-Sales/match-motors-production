import { useState } from "react";
import { HStack, Text, useTheme, Divider, Box, Select, CheckIcon, VStack, Icon, Center, useDisclose, Button, Actionsheet, FlatList } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Group } from "./Group";


//Não vamos usar



export function TabHeaderFilter() {
    const [options, setOptions] = useState('')
    const [groupSelected, setGroupSelected] = useState<string>('');
    const [groups, setGroups] = useState<string[]>(['Volkswagen', 'Chevrolet', 'Fiatzz', 'Ford ', 'Toyota', 'Honda ', 'Hyundai ', 'Renault ', 'Mitsubishi', 'Nissan ', 'Outros']);
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const { Item } = Actionsheet

    return (
        <HStack width={'full'} alignItems={"center"} backgroundColor={'gray.500'} h={10} px={1}  >
            <Box flex={0.5} flexDirection={"row"} paddingLeft={4} >
                <Text color={'gray.200'} mr={1} fontSize={12} /* dados filtrados lenght*/ >
                    +2000
                </Text>
                <Text color={'gray.200'} fontSize={12}> resultados</Text>
            </Box>

            <Divider bg="gray.400" thickness="6" roundedTop={20} h={37} marginTop={1} orientation="vertical" marginRight={2} />

            <HStack flex={0.7} justifyContent={"center"} alignItems={"center"}>
                <Button hitSlop={{ left: 30, right: 30 }} onPress={onOpen} _text={{ fontSize: 14 }} borderWidth={0} backgroundColor={'gray.500'}>
                    Filtrar
                </Button>
                <Icon as={MaterialCommunityIcons} size="5" name="filter-menu" />
            </HStack>

   

        </HStack >

    )
}
