import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import LogoSvg from '@assets/logo.svg'
import BackgroundImg from "@assets/background.png"

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.',),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve conter pelo menos 6 dígitos.'),
    password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
});

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp({ email, name, password }: FormDataProps) {
        console.log({ email, name, password });
    }

    return (
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} >
            <VStack flex={1} px={10} pb={16} >
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Segurando chave do carro"
                    resizeMode="contain"
                    position={'absolute'}
                />

                <Center my={20}>
                    <LogoSvg />

                    <Text color='gray.100' fontSize='sm' >
                        Encontre o carro dos seus sonhos com facilidade
                    </Text>

                </Center >

                <Center>
                    <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'  >
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />


                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                                errorMessage={errors.password_confirm?.message}
                            />
                        )}
                    />

                    <Button
                        mt={2}
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                    />

                </Center>

                <Button
                    title="Voltar para o login"
                    variant='outline'
                    mt={32}
                    onPress={handleGoBack}
                />

            </VStack>
        </ScrollView>
    );
}


