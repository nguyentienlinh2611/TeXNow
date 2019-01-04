import React, {Component, Fragment} from 'react';
import {
    View,
    Image, StatusBar,
    ActivityIndicator, Text,
    TextInput
} from 'react-native';
import {getTeXFromImage, updateDocumentHistory} from "../api";
import MathJax from 'react-native-mathjax';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Ripple from 'react-native-material-ripple';

export default class ScannedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUri: './assets/empty.jpg',
            loading: true
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const imageUri = navigation.getParam('imageUri');
        this.setState({
            imageUri: imageUri
        });
        const expression = navigation.getParam('expression');
        if (expression !== undefined) {
            this.setState({
                expression: expression,
                err: false,
                loading: false
            });
        }
        const imageBase64 = navigation.getParam('imageBase64');
        if(imageBase64 !== '' && imageBase64 !== undefined) {
            getTeXFromImage(imageBase64).then((data) => {
                if (data !== undefined) {
                    updateDocumentHistory({imageUri: imageUri, expression: data});
                    this.setState({
                        expression: data,
                        err: false,
                        loading: false
                    });
                }
            }).catch(err => {
                this.setState({
                    err: true,
                    loading: false
                });
            })
        }
    }

    render() {
        const {imageUri, loading} = this.state;
        const {navigation} = this.props;
        let texView;
        if (loading) {
            texView = (
                <View style={{margin: 'auto'}}>
                    <ActivityIndicator size="large" color="#0097A7"/>
                    <Text style={{marginTop: 10, fontFamily: 'OpenSans-Italic'}}>
                        Đang gửi dữ liệu
                    </Text>
                </View>
            );
        } else {
            const {err} = this.state;
            if (err) {
                texView = (
                    <View style={{margin: 'auto', alignItems: 'center'}}>
                        <Image source={require('../../assets/imgs/sorry.png')} style={{width: 80, height: 80}}/>
                        <Text style={{marginTop: 10, fontFamily: 'OpenSans-Bold'}}>Sorry!</Text>
                        <Text style={{marginTop: 10, fontFamily: 'OpenSans-Regular', fontStyle: 'italic'}}>TeXNow không nhận
                            dạng được bức ảnh này.</Text>
                    </View>
                )
            } else {
                const {expression} = this.state;
                texView = (
                    <Fragment>
                        <Text style={{fontFamily: 'OpenSans-Regular'}}>Kết quả</Text>
                        <MathJax
                            style={{width: '100%'}}
                            html={'$$' + expression + '$$'}
                        />
                        <Text style={{fontFamily: 'OpenSans-Regular'}}>LaTex Code</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, minWidth: 200}}
                            value={this.state.expression}
                        />
                    </Fragment>
                );
            }
        }

        return (
            <View style={{
                width: '100%',
                height: '100%',
                flexFlow: 'column'
            }}>
                <StatusBar backgroundColor="#0097A7" barStyle="light-content"/>
                <View style={{
                    height: 56,
                    width: '100%',
                    backgroundColor: '#00BCD4',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexShrink: 1,
                    flexGrow: 0
                }}>
                    <Ripple onPress={() => {
                        navigation.goBack()
                    }} rippleColor='#FFFFFF' rippleOpacity={0.54}
                            style={{
                                width: 56,
                                height: 56,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                        <Icon name='keyboard-backspace' size={26} color='#FFFFFF'/>
                    </Ripple>
                    <Text style={{fontSize: 18, fontFamily: 'OpenSans-Regular', color: '#FFFFFF'}}>Tạo mã Latex</Text>
                </View>
                <View style={{flexGrow: 2, flexShrink: 0, backgroundColor: 'black'}}>
                    <Image source={{uri: imageUri}}
                           style={{maxWidth: '100%', maxHeight: '100%', flex: 1, resizeMode: 'contain'}}/>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    flexShrink: 0
                }}>
                    {texView}
                </View>
            </View>
        );
    }
}
