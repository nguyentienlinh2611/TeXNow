import React, {Fragment, PureComponent} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import Header from '../components/Header';
import ImagePicker from 'react-native-image-picker';
import Cropper from 'react-native-image-crop-picker';
import {readDocumentsHistory} from "../api";
import * as dp from '../styles/utils';


export default class DocumentsScreen extends PureComponent {
    static navigationOptions = {
        title: 'Tài liệu gần đây'
    };

    constructor() {
        super();
        this.state = {
            documents: []
        }
    }

    onPress = (imageUri, expression) => {
        const {navigation} = this.props;
        navigation.navigate('scanned', {imageUri: imageUri, expression: expression});
    };

    componentDidMount() {
        readDocumentsHistory().then(documents => {
            if (documents === undefined) {
                documents = [];
            }
            this.setState({documents: documents});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        readDocumentsHistory().then(documents => {
            if (documents === undefined) {
                documents = [];
            }
            this.setState({documents: documents});
        });
    }

    renderItem = (document) => {
        return (
            <TouchableOpacity style={{
                flex: 1,
                margin: 5,
                minWidth: 170,
                maxWidth: 170,
                height: 240,
                maxHeight: 240,
                backgroundColor: '#CCC',
            }} onPress={() => this.onPress(document.item.imageUri, document.item.expression)}>
                <Image source={{uri: document.item.imageUri}}
                       style={{maxWidth: '100%', maxHeight: '100%', flex: 1}}/>
                <Text style={{textAlign: "center", fontFamily: "OpenSans-Regular"}}>{document.item.expression}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {documents} = this.state;
        const {navigation} = this.props;
        var listView;
        if (documents.length === 0) {
            listView = (
                <Fragment>
                    <Image style={{width: 200, height: 200, marginTop: 50}}
                           source={require('../../assets/imgs/empty.jpg')}/>
                    <Text style={{fontFamily: 'OpenSans-Italic'}}>Bạn chưa có tài liệu nào được chụp gần đây!</Text>
                </Fragment>
            );
        } else {
            listView = (<FlatList
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                    contentContainerStyle={{
                                      justifyContent: 'flex-start',
                                      // flexDirection: 'row',
                                      width: dp.widthPercentageToDP('100%')
                                  }}
                                  data={documents} renderItem={this.renderItem}/>)
        }
        return (
            <View style={{
                width: '100%',
                height: '100%',
                flexFlow: 'column'
            }}>
                <Header navigation={navigation} title="Tài liệu gần đây"/>
                <View style={{
                    alignItems: 'center',
                    flexShrink: 1,
                    flexGrow: 1,
                    backgroundColor: '#EDF3F9'
                }}>
                    {listView}
                    <Ripple onPress={this.takePicture} rippleColor='#FFFFFF' rippleOpacity={0.54} style={{
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

    takePicture = () => {
        const {navigation} = this.props;
        const options = {
            title: "Chọn ảnh",
            takePhotoButtonTitle: "Từ máy ảnh",
            chooseFromLibraryButtonTitle: "Từ thư viện",
            mediaType: "photo",
            storageOptions: {
                skipBackup: true,
                path: 'TeXNow'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel) {
                Cropper.openCropper({
                    path: response.uri,
                    width: 400,
                    height: 300,
                    includeBase64: true,
                    enableRotationGesture: true
                }).then(image => {
                    navigation.navigate('scanned', {imageUri: image.path, imageBase64: image.data});
                });

            }
        });
    }
}
