import { JSEncrypt } from 'jsencrypt'
import Config from './Config'

const RSA = require('node-rsa');

const Auth_Base64 = {
    encryptBase64: function(username, password){
        return btoa(username+":"+password);
    },

    getHeader : function(username, password){
        console.log('username ', username);
        console.log('password ', password);
        return{
            'Content-Type': 'application/json',
            'Authorization' : 'Basic '+btoa(username+":"+password)
        }
    }
}

const Auth_SAMA = {
    getBody: function (username, password) {
        let encrypted_password;
        try {
            encrypted_password = RSAEncrypt(password);
        }
        catch (err) {
            //swal('Token generation failed', err, 'error');
            return;
        }
        let postData = "grant_type=password&username=" + username + "&password=" + encrypted_password;

        //postData = 'username=Npcuserh351&password=ZDDEOL%2BHu4bc4Wig6FWT%2BSqeL5QZz06LgDKnCfPsUBnwx7wHQeAS8ysp8K%2FMO%2B1q7DmegezTu2%2Fo%0Ak93Sms0wR6rw5GnSt5cPwZ0M3%2F%2BIn%2Bm99UT6riCxhDkPH0JFP612z1zAEt2x%2BQfuCAGuszS05ea5%0AMAg6MuNwJ95w98GFvrr3kAZ9EH2G1V4%2Fv%2Bc3c7r0%2FzoiGAhl5OU1xsgAJMM2uDty%2BVmvzH0Z%2FYTn%0AZshZVYoVUwMJ0KmlNkPiFxU0UYlTP5aGJzvFHV2gCPok9NGkpUfbGQVkbVjk5EHaHlCZVXkutasJ%0AuiyASkXky4%2B3aL8AMoP7EtfYy1tAIQ7Wm5UYBw%3D%3D%0A&app_key=7&grant_type=password';
        //let postData  = "username=salsabila&password=b6M8ehWSbeCkok0dVc5SiztRBZTZP+zgBt1ZtO/mgRIC0TM+NcRVzJhThYoJe9mmzg+1r4DtUOxZQJvJTBA3Sh8UyeCVu0u5c/58nfb/0ovbCQDBliQ59vPOX8y51KZ09yN5/3ameVyKDsMozZYYSptMK274Tt8EdqGPVgezCcr+xveXaQlu7vYIIHCqWpVWA9qPIE5ChaqtucCDRxLs97kWgpnBkKT1c2sz8h1O6KRCVKxS6fcDxl5V/ydIr4RWUAmaz8ZwiQVRQqpPMDzz9KAbK5N2l9j4GqYzwcE2Ap9RnrQk/FhIJaJThehC15HDgZl1H5AwE+Dmza1xhmGPqw==&grant_type=password&app_key=1"
        return postData;
    },

    getHeader: function () {
        let hash = Base64.encode(Config.CLIENT_ID + ':' + Config.CLIENT_SECRET);
        return {
            'Content-Type': 'text/plain',
            'Authorization': "Basic " + hash
        }
    }
}

const Auth_PSSAPI = {

    getBody: function (username, password) {
        return {
            "Password": encryptRsaToBase64(password, process.env.MODULUSBASE64, process.env.EXPONENTBASE64),
            "UserID": username,
            "ApplicationCode": 0
        }
    },

    getHeader: function () {
        return {
            'Content-Type': 'application/json'
        }
    }
}

const Services = {
    Auth_SAMA,
    Auth_PSSAPI,
    Auth_Base64
}

export default Services

//#region Auth SAMA
let RSAEncrypt = (data) => {
    var jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(Config.PUB_KEY);
    var encrypted = jsEncrypt.encrypt(data);
    if (typeof encrypted === 'boolean') {
        throw "Encryption failed.";
    }
    encrypted = URLSafeEncode(encrypted);
    return encrypted;
}



let URLSafeEncode = (data) => {
    var s = data.split('=', 1).toString();
    var re = /\+/g;
    s = s.replace(re, '-');
    re = /\//g;
    s = s.replace(re, '_');
    return s;
}

let Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};
//#endregion

//#region Auth PSSAPI

let base64ToHex = (base64, uppercase) => {
    var raw = atob(base64);
    var HEX = '';

    for (var i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16)
        HEX += (_hex.length == 2 ? _hex : '0' + _hex);

    }
    if (uppercase)
        return HEX.toUpperCase();
    return HEX;
}

let hexToBase64 = (hexval) => {
    var hex = hexval.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return btoa(str);
}

let encryptRsaToBase64 = (plaintext, modulusBase64, exponentBase64) => {
    var n = base64ToHex(modulusBase64);
    var e = base64ToHex(exponentBase64);

    var encryptedHex = RSA.encrypt(plaintext, n, e);
    return hexToBase64(encryptedHex);
}

//#endregion
