import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, StatusBar, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class Splash extends PureComponent {
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        setTimeout(() => {
            const {navigation} = this.props;
            navigation.reset([NavigationActions.navigate({ routeName: 'main' })], 0)
        },2000);
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <StatusBar backgroundColor="#0097A7" barStyle="light-content" ></StatusBar>
                <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    >
                        <Image
                            style={{
                            flex: 1,
                            resizeMode: 'stretch'
                            }}
                            source={require('../../assets/imgs/splash-background.jpg')}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        >
                        <Image style={{ width: 100, height: 100, borderRadius: 16 }} source={require('../../assets/imgs/logo.jpg')}/>
                        <Text style={{fontFamily: 'serif', fontSize: 26, color: '#424242', marginTop: 5}}>TeXNow</Text>
                    </View>
            </View>
        )
    }
}
