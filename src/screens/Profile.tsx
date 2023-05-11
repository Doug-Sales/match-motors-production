import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";


const PHOTO_SIZE = 33;

export function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/doug-sales.png');

    const toast = useToast();

    async function handleUserPhotoSelect() {
        setIsLoading(true)
        try {
            const phtotoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [9, 7],
                allowsEditing: true,
            });

            if (phtotoSelected.canceled) {
                return;
            }

            if (phtotoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(phtotoSelected.assets[0].uri, { size: true })

                if (photoInfo.exists && photoInfo.size > 1024 * 1024 * 2 / 5000) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 2MB.',
                        placement: 'top',
                        bgColor: 'red.500',
                        duration: 2500,
                        mt: 8,


                    });
                }

                setUserPhoto(phtotoSelected.assets[0].uri)
            }


        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} >

            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }} >
                <Center mt={6} px={10} >
                    <Skeleton
                        w={PHOTO_SIZE}
                        h={PHOTO_SIZE}
                        rounded={'full'}
                        startColor='gray.600'
                        endColor='gray.400'
                        isLoaded={!isLoading}
                    >

                        <UserPhoto
                            source={{ uri: userPhoto }}
                            alt="Foto do usuário"
                            size={33}
                        />

                    </Skeleton>

                    <TouchableOpacity onPress={handleUserPhotoSelect} >
                        <Text color={'blue.500'} fontWeight={'bold'} fontSize={'md'} mt={2} mb={8} >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input
                        bg={'gray.600'}
                        placeholder="Nome"

                    />

                    <Input
                        bg={'gray.600'}
                        placeholder="usuario@email.com"
                        isDisabled
                    />


                    <Heading color={'gray.200'} fontSize={'md'} mb={2} mt={8} alignSelf={'flex-start'} fontFamily={'heading'}>
                        Alterar senha
                    </Heading>

                    <Input
                        bg={'gray.600'}
                        placeholder="Senha antiga"
                        secureTextEntry
                    />

                    <Input
                        bg={'gray.600'}
                        placeholder="Nova senha"
                        secureTextEntry
                    />

                    <Input
                        bg={'gray.600'}
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                    />

                    <Button
                        title="Atualizar"
                        mt={4}
                    />
                </Center>


            </ScrollView>
        </VStack>
    );
}
