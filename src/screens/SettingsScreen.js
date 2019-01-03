import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

export default class SettingsScreen extends PureComponent {
    static navigationOptions = {
        title: 'Cài đặt'
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{
                width: '100%',
                height: '100%',
                flexFlow: 'column'
            }}>
                <Header navigation={navigation} title="Cài đặt" />
                <View style={{
                    alignItems: 'center',
                    flexShrink: 1,
                    flexGrow: 1
                }}>
                </View>
            </View>
        )
    }
}
