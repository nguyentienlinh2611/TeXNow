import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import Header from '../components/Header';

export default class DocumentsScreen extends PureComponent {
    static navigationOptions = {
        title: 'Tài liệu gần đây'
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={{
                width: '100%',
                height: '100%',
                flexFlow: 'column'
            }}>
                <Header navigation={navigation} title="Tài liệu gần đây" />
                <View style={{
                    alignItems: 'center',
                    flexShrink: 1,
                    flexGrow: 1,
                    backgroundColor: '#EDF3F9'
                }}>
                    <Image style={{width: 200, height: 200, marginTop: 50}} source={require('../../assets/imgs/empty.jpg')} />
                    <Text style={{ fontFamily: 'OpenSans-Italic' }}>Bạn chưa có tài liệu nào được chụp gần đây!</Text>
                    <Ripple onPress={() => navigation.navigate('camera')} rippleColor='#FFFFFF' rippleOpacity={0.54} style={{
                        position: 'absolute',
                        backgroundColor: '#4652ED',
                        padding: 15,
                        borderRadius: 30,
                        overflow: 'hidden',
                        top: '80%',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 10
                    }}>
                        <Icon name='photo-camera' size={26} color='#FFFFFF'/>
                    </Ripple>
                </View>
            </View>
        )
    }
}
