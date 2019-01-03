import React, {Component} from 'react';
import {
    View,
    Image, StatusBar,
    ActivityIndicator, Text
} from 'react-native';
import {getTeXFromImage} from "../api";
import MathJax from 'react-native-mathjax';

const inlineStyle =`
html, body {
  display: flex;
  background-color: #fafafa;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  font-size: 4em;
  margin: 0;
  display: flex;
}
`;

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
        const imageBase64 = navigation.getParam('imageBase64');
        setTimeout(() => {
            this.setState({
                expression: '',
                loading: false
            });
        }, 2000)
        getTeXFromImage(imageBase64).then((data) => {
            console.log(data);
            this.setState({
                loading: false
            });
        })
    }

    render() {
        const {imageUri, loading} = this.state;
        let texView;
        if (loading) {
            texView = (
                <View style={{margin: 'auto'}}>
                    <ActivityIndicator size="large" color="#0097A7"/>
                    <Text style={{marginTop: 10, fontFamily: 'OpenSans-Regular'}}><Text style={{fontStyle: 'italic'}}>"Đợi
                        tý, đang xử lý!"</Text>. Tài said :v</Text>
                </View>
            );
        } else {
            const {expression} = this.state;
            console.log(expression);
            texView = (
                <MathJax
                    style={{flex: 1, width: 100, height: 100}}
                    html={''}
                />
            );
        }

        return (
            <View style={{
                width: '100%',
                height: '100%',
                flexFlow: 'column'
            }}>
                <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
                <View style={{width: '100%', height: '50%'}}>
                    <Image source={{uri: imageUri}} style={{maxWidth: '100%', maxHeight: '100%', height: '100%'}}/>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1
                }}>
                    {texView}
                </View>

            </View>
        );
    }
}
