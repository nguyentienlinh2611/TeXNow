const TEX_NOW_API = 'http://192.168.0.102';

const request = async (body) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
    });
    const defaults = {headers: headers};
    body = Object.assign({}, defaults, body);
    try {
        const response = await fetch(body.url, body);
        const json = await response.json();
        if (!response.ok) {
            return json;
        }
    } catch(err) {
        return Promise.reject(err);
    }
};

export const getTeXFromImage = async (image) => {
    let body = {format: 'file' , img_encode: image};
    return request({url: `${TEX_NOW_API}/api/classify`, method: 'POST', body: JSON.stringify(body)});
};
