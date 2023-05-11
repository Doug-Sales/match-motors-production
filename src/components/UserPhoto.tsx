import { Image, IImageProps } from "native-base";


type Props = IImageProps & {// Forma de passar as propriedades para o componente pelo ...rest
    size: number;

}



export function UserPhoto({ size, ...rest }: Props) {
    return (
        <Image
            w={size}
            h={size}
            rounded='full'
            borderWidth={2}
            borderColor='gray.400'

            {...rest}
        />
    );
}


