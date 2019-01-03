import {StatusBar, Text, View} from "react-native";
import React, {Fragment, PureComponent} from "react";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Ripple from 'react-native-material-ripple';

export default class Header extends PureComponent {
    render() {
        console.log(this.props.title);
        return (
            <Fragment>
                <StatusBar backgroundColor="#0097A7" barStyle="light-content"></StatusBar>
                <View style={{
                    height: 56,
                    width: '100%',
                    backgroundColor: '#00BCD4',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexShrink: 1,
                    flexGrow: 0
                }}>
                    <Ripple onPress={() => {this.props.navigation.openDrawer()}} rippleColor='#FFFFFF' rippleOpacity={0.54}
                            style={{
                                width: 56,
                                height: 56,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                        <Icon name='menu' size={26} color='#FFFFFF'/>
                    </Ripple>
                    <Text style={{fontSize: 18, fontFamily: 'OpenSans-Regular', color: '#FFFFFF'}}>{this.props.title}</Text>
                </View>
            </Fragment>
        )
    }
}
