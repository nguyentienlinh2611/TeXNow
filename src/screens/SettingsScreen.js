import React, {PureComponent} from 'react';
import {View, Text, TextInput} from 'react-native';
import Header from '../components/Header';
import {readSettingConfig, updateSettingConfig} from "../api";

export default class SettingsScreen extends PureComponent {
    static navigationOptions = {
        title: 'Cài đặt'
    };

    constructor() {
        super();
        this.state = {
            serverAddr: ''
        }
    }

    componentWillMount() {
        var serverAddr = readSettingConfig();
        this.setState({serverAddr});
    }

    onChangedSetting = (serverAddr) => {
        updateSettingConfig(serverAddr);
        this.setState({serverAddr});
    };

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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>Địa chỉ Server:</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, minWidth: 200, marginLeft: 20}}
                            defaultValue={this.state.serverAddr}
                            onSubmitEditing={event => {this.onChangedSetting(event.nativeEvent.text)}}/>
                    </View>
                </View>
            </View>
        )
    }
}
