import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';



import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react';
import { Box } from 'native-base';



import { MyFavorites } from '@screens/MyFavorites';
import { MyAds } from '@screens/MyAds';
import Ads from '@assets/bullhorn.svg'

import { Icon } from "native-base";
import { useSafeAreaInsets } from 'react-native-safe-area-context';



import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
// import { MySpace } from '@screens/MySpace';
import { AdDetail } from '@screens/AdDetail';



type AppRoutes = {
    home: undefined;
    space: undefined;
    profile: undefined;
    meus_anuncios: undefined;
    detail: {
        carModel: string;
        price: string;
        year: string;
        img: string;
        km: string;
        state: string;
    };
    favorites: {
        img: string;
        add_remove: boolean;
    }
}



export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes> & MaterialTopTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();





export function AppRoutes() {
    const { sizes, colors } = useTheme();
    const iconSize = sizes[7]

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.blue[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6],
            },
            tabBarHideOnKeyboard: true,


        }}
        >
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={iconSize} height={iconSize} />
                    ),
                }}

            />

            <Screen
                name='space'
                component={MySpace}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}

            />

            <Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={iconSize} height={iconSize} />
                    ),

                }}
            />

            <Screen
                name='detail'
                component={AdDetail}
                options={{
                    tabBarButton: () => null,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}

            />


        </Navigator>
    );
}


export function MySpace() {
    const { Navigator, Screen } = createMaterialTopTabNavigator<AppRoutes>();


    const [isClicked, setIsClicked] = useState(false);


    const insets = useSafeAreaInsets();
    const { colors, fonts, fontSizes } = useTheme();

    const handleFocusChange = (value: number) => {
        value === 1
            ? setIsClicked(true)
            : setIsClicked(false)
    };



    return (
        <Navigator
            initialRouteName='favorites'

            screenOptions={{
                tabBarIndicatorStyle: { height: 3, width: '25%', marginHorizontal: '8%' },
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
                listeners={{ focus: () => handleFocusChange(1) }}
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
                listeners={{ focus: () => handleFocusChange(0) }}
                name='meus_anuncios'
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
