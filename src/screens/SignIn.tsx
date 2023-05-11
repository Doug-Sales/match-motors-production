import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from "@assets/background.png"

import { Input } from "@components/Input";
import { Button } from "@components/Button";



export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    return (
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} >
            <VStack flex={1} px={10} pb={16} >
                
                    <Image
                        source={BackgroundImg}
                        defaultSource={BackgroundImg}
                        alt="Entregando a chave do carro"
                        resizeMode="cover"
                        position={'absolute'}
                        opacity={0.8}
                    />
                   
                <Center my={24}>
                    <LogoSvg />

                    <Text color='gray.100' fontSize='sm'>
                        Encontre o carro dos seus sonhos com facilidade
                    </Text>

                </Center >

                <Center>
                    <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading' >
                        Acesse sua conta
                    </Heading>

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        returnKeyType="send"
                    />

                    <Button
                        mt={2}
                        title="Acessar"
                    />

                </Center>

                <Center mt={32} >

                    <Text
                        color='gray.100'
                        fontSize='sm'
                        mb={3}
                        fontFamily='body'
                    >
                        Ainda não tem acesso?
                    </Text>

                    <Button
                        title="Criar conta"
                        variant='outline'
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}


