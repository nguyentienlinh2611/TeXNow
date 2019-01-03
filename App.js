/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Splash from './src/screens/SplashScreen';
import Main from './src/screens/MainScreen';
import Camera from "./src/screens/CameraScreen";
import Scanned from "./src/screens/ScannedScreen";

const AppNavigator = createStackNavigator(
    {
        splash: {
            screen: Splash
        },
        main: {
            screen: Main
        },
        camera: {
            screen: Camera
        },
        scanned: {
            screen: Scanned
        }
    },
    {
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
