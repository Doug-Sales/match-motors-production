import { useState } from "react";
import { Pressable, TouchableOpacity, useWindowDimensions } from "react-native";
import { Center, ScrollView, VStack, Text, Heading, useToast, HStack, Icon, Box, Fab, View, Image, IImageProps, FlatList, Select, TextArea, ISelectProps } from "native-base";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";



import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

import { useAuth } from "@hooks/useAuth";
import { FullDescriptionAdDTO } from "@dtos/FullDescriptionAdDTO";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Feather, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

type FormDataProps = FullDescriptionAdDTO

const profileSchema = yup.object({
    com_ipva_pago: yup.string().required('Selecione')

})
type Props = IImageProps & {
    url: string;
}

type SelectFieldProps = ISelectProps & {
    control: any;
    name: string;
    label: string;
    onChange: (value: string) => void;
    value: string;

};



export function CreateNewAd() {
    const { control, handleSubmit } = useForm<FormDataProps>({});
    const [uploadCardShow, setUploadCardShow] = useState(false)


    // AQUI ESTA A LISTA PARA CARREGAR OS DADOS E RENDERIZAR NO FLATLIST
    const [listCar, setListCar] = useState([
        {
            img: 'https://images.unsplash.com/photo-1657144513372-282839dc33ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMxfHxwb3JjaGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'

        },
        // {
        //     img: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm8lMjBlc3BvcnRpdm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'

        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGNhcnJvJTIwZXNwb3J0aXZvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'

        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1628883714122-3b6ffeaf8f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhcnJvJTIwZXNwb3J0aXZvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'

        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1609964729554-a02fb2a04830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxjYXJybyUyMGVzcG9ydGl2b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'

        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fycm9zfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'

        // },
        // {
        //     img: 'https://images.unsplash.com/photo-1573074513856-c8e3ed0f61ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxjYXJybyUyMGVzcG9ydGl2b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'

        // }
    ])


    //Remover usestates desnecessários

    // const [isUpdating, setIsUpdating] = useState(false);
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const toast = useToast();


    //useAuth é do contexto, se quiser utilizar.
    const { user } = useAuth();

    async function handlePhotoToNewAd() {
        setPhotoIsLoading(true)
        try {
            const phtotoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
                aspect: [4, 4],
                allowsEditing: true,
                selectionLimit: 6,
            });

            if (phtotoSelected.canceled) {
                return;
            }

            if (phtotoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(phtotoSelected.assets[0].uri, { size: true })

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: 'red.500',
                        duration: 1000,
                        mt: 8,
                    });
                }

                const fileExtension = phtotoSelected.assets[0].uri.split('.').pop();

                //colocar nome ou id do usuario para identificar a imagem

                const photoFile = {
                    name: `${'user.name'}.${fileExtension}`.toUpperCase(),
                    uri: phtotoSelected.assets[0].uri,
                    type: `${phtotoSelected.assets[0].type}/${fileExtension}`
                } as any;

                const newAdPhotoUploadForm = new FormData();
                newAdPhotoUploadForm.append('anuncio', photoFile);

                console.log(photoFile);



                //armazenar na api
                const avatarUpdatedResponse = `api.patch("/users/anuncios", newAdPhotoUploadForm, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                });`



                toast.show({
                    title: 'SUCESSO!',
                    placement: 'top',
                    bgColor: 'green.500'
                })
            }
        } catch (error) {
            throw error;

        } finally {
            setPhotoIsLoading(false)
        }
    }

    function handleGoBack() {
        navigation.goBack();

    }


    function handleNewAd(data: FormDataProps) {
        const newData = JSON.stringify(data)



        //ICARO ===> TRATAR OS DADOS RECEBIDOS 




    }

    return (
        <VStack safeAreaTop flex={1} backgroundColor={"gray.900"} >

            <HStack marginTop={1} marginBottom={2} padding={6} backgroundColor={"gray.400:alpha.80"}>
                <TouchableOpacity onPress={handleGoBack} >
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color={'blue.500'}
                        size={7}
                    />
                </TouchableOpacity>
                <Box flex={0.9} alignItems={"center"} justifyContent={"center"} >
                    <Heading color={'gray.100'} fontSize={'xl'} fontFamily={'heading'}>
                        Cadastrar Anúncio
                    </Heading>
                </Box>
            </HStack>




            <Center borderBottomWidth={1} display={!uploadCardShow ? "none" : null} background={"coolGray.900:alpha.20"}>
                <Box
                    backgroundColor={"coolGray.500:alpha.10"}
                    height={[280, 400]}
                    width={[400, 500, 600]}
                    rounded={8}
                    marginBottom={8}
                    paddingY={2}
                    marginX={2}
                    alignItems={"center"}
                >
                    <Fab
                        renderInPortal={false}
                        _focusVisible={{ borderColor: 'white', }}
                        shadow={5}
                        right={2}
                        backgroundColor={"gray.500"}
                        bottom={-30}
                        borderBottomWidth={1}
                        borderBottomColor={'gray.100:alpha.40'}
                        onPress={handlePhotoToNewAd}
                        icon={<Icon
                            color="white:alpha.60"
                            as={MaterialCommunityIcons}
                            name="plus"
                            size="lg"
                            shadow={2}
                        />}

                    />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={listCar}
                        keyExtractor={item => item.img}
                        renderItem={({ item }) => (
                            <UploadCardImage
                                url={item.img}
                                size={'100%'}
                                alt="fotos do anúncio"
                            />
                        )}
                        contentContainerStyle={listCar.length === 0 && { flex: 1, justifyContent: 'center' }}
                        ListEmptyComponent={() => (
                            <Center >
                                <Icon
                                    color="coolGray.400:alpha.30"
                                    as={Ionicons}
                                    name="md-images"
                                    size={120} />
                                <Text color={'gray.200'} textAlign={'center'}  >
                                    Imagens tornam o anúncio ainda mais atrativo!
                                </Text>
                            </Center>
                        )}
                    />
                </Box>
            </Center>
            <Box mt={2} pb={5} alignItems={"center"}>

                <Pressable onPress={() => setUploadCardShow(value => !value)}>
                    <Icon
                        color="white:alpha.60"
                        as={AntDesign}
                        name={uploadCardShow ? "upcircleo" : "rightcircleo"}
                        size={6}
                        shadow={2}
                    />
                </Pressable>
                <Text color={'gray.100:alpha.50'}>{uploadCardShow ? 'Ocultar adicionar fotos' : 'Adicionar Fotos'}</Text>
            </Box>

            <ScrollView contentContainerStyle={{ paddingBottom: '40%', paddingHorizontal: 20, paddingTop: 40 }}>

                <Controller
                    control={control}
                    name="descricao"
                    render={({ field: { onChange } }) => (
                        <>
                            <Text color="gray.300" ml={5} fontSize="lg">Descrição:</Text>
                            <TextArea
                                h={'7%'}
                                mx={1}
                                mb={8}
                                maxW="400"
                                maxH="400"
                                bg='gray.700:alpha.90'
                                onChangeText={onChange}
                                type="text"
                                color={'white'}
                                fontSize={'md'}
                                borderColor={'gray.200:alpha.30'}
                                numberOfLines={8}
                                focusOutlineColor={'blue.500:alpha.60'}
                                placeholderTextColor={'gray.300'}
                                placeholder="Conte aos compradores o que torna seu carro especial..."
                                clearButtonMode="always"
                                autoCompleteType={'text'}
                            />
                        </>

                    )}
                />

                <Controller
                    control={control}
                    name="marca"
                    render={({ field: { onChange } }) => (
                        <>
                            <Text color="gray.300" ml={4} fontSize="xs">Marca do veículo</Text>
                            <Input
                                placeholder="  Honda, VolksWagen, Fiat ..."
                                onChangeText={onChange}
                            />
                        </>

                    )}
                />
                <Controller
                    control={control}
                    name="modelo"
                    render={({ field: { onChange } }) => (
                        <>
                            <Text color="gray.300" ml={4} fontSize="xs">Modelo do veículo</Text>
                            <Input
                                placeholder="  Civic, Fox, Toro ..."
                                onChangeText={onChange}
                            />

                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="ano"
                    render={({ field: { onChange } }) => (
                        <>
                            <Text color="gray.300" ml={4} fontSize="xs">Ano do veículo</Text>
                            <Input
                                placeholder="  Exemplo: 2020"
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="versao"
                    render={({ field: { onChange } }) => (
                        <>
                            <Text color="gray.300" ml={4} fontSize="xs">Versão do veículo</Text>
                            <Input
                                placeholder="  EXL, SLI, XLI ..."
                                onChangeText={onChange}
                            />
                        </>

                    )}
                />

                <Controller
                    control={control}
                    name="ar_condicionado"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Ar condicionado ?"
                            name="ar_condicionado"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="computador_de_bordo"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Computador de bordo ?"
                            name="computador_de_bordo"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="vidros_eletricos"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Vidros elétricos ?"
                            name="vidros_eletricos"
                            onChange={onChange}
                            value={value}

                        />
                    )}
                />
                <Controller
                    control={control}
                    name="alarme"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Alarme ?"
                            name="alarme"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="freio_abs"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Freio ABS ?"
                            name="freio_abs"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="air_bag"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Air Bag ?"
                            name="air_bag"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="sensor_de_estacionamento"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Sensor de estacionamento ?"
                            name="sensor_de_estacionamento"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="limpador_traseiro"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Limpador traseiro ?"
                            name="limpador_traseiro"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bancos_em_couro"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Bancos em couro ?"
                            name="bancos_em_couro"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="piloto_automatico"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Piloto automático ?"
                            name="piloto_automatico"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="com_garantia_de_fabrica"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Garantia de fábrica ?"
                            name="com_garantia_de_fabrica"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="com_garantia_mecanica"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Garantia mecânica ?"
                            name="com_garantia_mecanica"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="unico_dono"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Único dono ?"
                            name="unico_dono"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="preco_negociavel"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Preço negociável ?"
                            name="preco_negociavel"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="aceita_troca"

                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="Aceita troca ?"
                            name="aceita_troca"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                <Controller
                    control={control}
                    name="com_ipva_pago"
                    render={({ field: { onChange, value } }) => (
                        <SelectField
                            control={control}
                            label="IPVA pago ?"
                            name="com_ipva_pago"
                            onChange={onChange}
                            value={value}


                        />
                    )}
                />
                < Button
                    title="Cadastrar"
                    mt={4}
                    onPress={handleSubmit(handleNewAd)}
                />
            </ScrollView >
        </VStack >
    );
}

function UploadCardImage({ url, ...rest }: Props) {
    return (
        <View h={[250, 350]} width={350} marginX={4} marginY={2} justifyContent={"center"} alignItems={"center"} rounded={6} backgroundColor={"gray.200"}>
            <Image
                source={{ uri: `${url}` }}
                resizeMode="cover"
                rounded={6}
                {...rest}
            />
        </View>
    )
}

function SelectField({ label, onChange, value }: SelectFieldProps) {
    return (
        <Box mt={2} mb={4} >
            <Text color="gray.300" ml={4} fontSize="xs">{label}</Text>
            <Select
                minWidth="200"
                accessibilityLabel={label}
                placeholder={'Selecione o valor.'}
                bg='gray.700'
                variant="unstyled"
                _selectedItem={{
                    bg: 'gray.700:alpha.50',
                    endIcon: <Icon as={MaterialCommunityIcons} name="checkbox-marked" size="5" />,
                    borderWidth: 1,
                    borderColor: 'gray.300'

                }}
                _actionSheetContent={{
                    backgroundColor: 'coolGray.800',
                    rounded: 20,
                    mb: '5%',
                    px: 5,
                    shadow: 9,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: 'gray.300',

                }}
                _actionSheet={{
                    px: 5,
                    backgroundColor: 'coolGray.200:alpha.50',
                    rounded: 20,
                    borderWidth: 1,
                    borderColor: 'gray.100',
                }}
                fontSize="sm"
                color="gray.100"
                h={14}
                px={6}
                mt={1}

                onValueChange={(value) => onChange(value)}
                selectedValue={value}
            >
                <Select.Item
                    backgroundColor={'gray.300:alpha.20'}
                    justifyContent={"center"}
                    my={2}
                    _text={{ fontSize: "md", fontWeight: "bold", color: 'green.600', mr: '70%' }}
                    _icon={{ color: 'green.600' }}
                    endIcon={<Icon
                        as={MaterialCommunityIcons}
                        name="checkbox-blank-outline"
                        size="5"
                        color={'gray.200'}
                    />}
                    rounded={10}
                    label="SIM "
                    value="true"
                />

                <Select.Item
                    backgroundColor={'gray.300:alpha.20'}
                    my={2}
                    justifyContent={"center"}
                    _text={{ fontSize: "md", fontWeight: "bold", color: 'red.500', mr: '70%' }}
                    endIcon={<Icon
                        as={MaterialCommunityIcons}
                        name="checkbox-blank-outline"
                        size="5"
                        color={'gray.200'}
                    />}
                    _icon={{ color: 'red.500' }}
                    rounded={10}
                    label="NÃO"
                    value="false"
                />
            </Select>
        </Box>
    );
};