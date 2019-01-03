import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    StatusBar
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default class CameraScreen extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <TouchableOpacity
                    onPress={() => this.takePicture(navigation)}
                    style={styles.capture}
                >
                    <Icon name='photo-camera' size={60} color='#FFFFFF'/>
                </TouchableOpacity>
            </View>
        );
    }

    takePicture = async function(navigation) {
        if (this.camera) {
            const options = { base64: true };
            const data = await this.camera.takePictureAsync(options);
            navigation.navigate('scanned',{imageUri: data.uri, imageBase64: data.base64});
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center'
    }
});
