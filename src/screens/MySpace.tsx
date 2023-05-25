import { useState } from 'react';
import { Box, useTheme } from 'native-base';


import { MaterialIcons } from '@expo/vector-icons'

import { MyFavorites } from '@screens/MyFavorites';
import { MyAds } from '@screens/MyAds';
import Ads from '@assets/bullhorn.svg'

import { Icon } from "native-base";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MySpaceAppRouter = {
    favorites: { //testando meus favoritos
        img: string;
        add_remove: boolean;
    };
    anuncios: undefined;
}

export type AppTabNavigatorRoutesProps = MaterialTopTabNavigationProp<MySpaceAppRouter>;

const { Navigator, Screen } = createMaterialTopTabNavigator<MySpaceAppRouter>();


export function MySpace() {
    const [isClicked, setIsClicked] = useState(false);

    const insets = useSafeAreaInsets();
    const { colors, fonts, fontSizes } = useTheme();

    const handleFocusChange = () => {
        setIsClicked(!isClicked);
    };


    return (
        <Navigator
            initialRouteName='favorites'
            screenOptions={{
                tabBarIndicatorStyle: { height: 3, width: '25%', marginHorizontal: '8%', /* marginBottom: 50, position:'absolute'  */ },
                tabBarStyle: {
                    margin: insets.top,
                    backgroundColor: colors.gray[500],
                    top: 35,
                    borderRadius: 15,
                    height: 53,
                },
                tabBarPressColor: colors.blue[700],
            }}

        >
            <Screen
                listeners={{ focus: () => setIsClicked(!isClicked) }}
                name='favorites'
                component={MyFavorites}
                options={
                    isClicked
                        ? {
                            tabBarIcon: () => (
                                <Icon
                                    as={MaterialIcons}
                                    name="favorite-border"
                                    color={'red.400'}
                                    size={7}
                                    flex={1}
                                />
                            ),
                            tabBarShowLabel: false
                        }
                        :
                        {
                            title: 'Favoritos',
                            tabBarLabelStyle: {
                                fontSize: fontSizes.xs,
                                fontFamily: fonts.heading,
                                color: colors.gray[200],
                            },
                        }
                }
            />

            <Screen
                listeners={{ focus: handleFocusChange }}
                name='anuncios'
                component={MyAds}
                options={
                    isClicked
                        ?
                        {
                            title: 'Anúncios',
                            tabBarLabelStyle: {
                                fontSize: fontSizes.xs,
                                fontFamily: fonts.heading,
                                color: colors.gray[200],
                            },

                        }
                        : {
                            tabBarIcon: () => (
                                <Box justifyContent={'center'} alignItems={'center'}>
                                    <Ads height={20} width={20} fill={colors.yellow[400]} />
                                </Box>
                            ),
                            tabBarShowLabel: false
                        }
                }
            />
        </Navigator>
    )
}

