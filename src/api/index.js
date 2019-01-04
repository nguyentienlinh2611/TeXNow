const RNFS = require('react-native-fs');
const settingFile = "setting.conf";
const documentsHistory = "documentsHistory";

var TEX_NOW_API = '';

RNFS.exists(`${RNFS.CachesDirectoryPath}/${settingFile}`).then((isExisted) => {
    if(isExisted) {
        RNFS.readFile(`${RNFS.CachesDirectoryPath}/${settingFile}`).then((content) => {
            TEX_NOW_API = JSON.parse(content).server;
        });
    } else {
        RNFS.writeFile(`${RNFS.CachesDirectoryPath}/${settingFile}`, '{"server":"http://192.168.0.102"}').then(() => {
            TEX_NOW_API = "http://192.168.0.102";
        });
    }
});

RNFS.exists(`${RNFS.CachesDirectoryPath}/${documentsHistory}`).then((isExisted) => {
    if(!isExisted) {
        RNFS.writeFile(`${RNFS.CachesDirectoryPath}/${documentsHistory}`, '{"documents":[]}');
    }
});


export const readSettingConfig = () => {
    RNFS.readFile(`${RNFS.CachesDirectoryPath}/${settingFile}`).then((content) => {
        TEX_NOW_API = JSON.parse(content).server;
    });
    return TEX_NOW_API;
};

export const updateSettingConfig = (serverAddress) => {
    RNFS.writeFile(`${RNFS.CachesDirectoryPath}/${settingFile}`, `{"server":"${serverAddress}"}`).then(() => {
        TEX_NOW_API = serverAddress;
    });
};

export const readDocumentsHistory = async () => {
    var content = await RNFS.readFile(`${RNFS.CachesDirectoryPath}/${documentsHistory}`);
    var documents = JSON.parse(content).documents;
    return documents;
};

export const updateDocumentHistory = async (newDocument) => {
    var documents = await readDocumentsHistory();
    documents.push(newDocument);
    RNFS.writeFile(`${RNFS.CachesDirectoryPath}/${documentsHistory}`,JSON.stringify({"documents":documents}));
}


const request = async (body) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
    });
    const defaults = {headers: headers};
    body = Object.assign({}, defaults, body);
    try {
        const response = await fetch(body.url, body);
        if(response.ok) {
            return response._bodyText;
        } else {
            return Promise.reject(response.status);
        }
    } catch(err) {
        return Promise.reject(err);
    }
};

export const getTeXFromImage = async (image) => {
    let body = {format: 'file' , img_encode: image};
    return request({url: `${TEX_NOW_API}/api/classify`, method: 'POST', body: JSON.stringify(body)});
};
