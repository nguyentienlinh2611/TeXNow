import React from 'react';
import {createDrawerNavigator} from "react-navigation";
import DocumentsScreen from './DocumentsScreen';
import SettingsScreen from './SettingsScreen';


export default createDrawerNavigator(
    {
        Documents: {
            screen: DocumentsScreen
        },
        Settings: {
            screen: SettingsScreen
        }
    },
    {
        initialRouteName: 'Documents',
        contentOptions:
            {
                activeTintColor: '#00BCD4',
            }
    }
);
