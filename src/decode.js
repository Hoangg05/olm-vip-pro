import * as AES from "crypto-js/aes";
import * as enc from "crypto-js/enc-utf8";

export default function decode(str, pass) {
	try {
		return JSON.parse(AES.decrypt(str, pass).toString(enc).toString());
	} catch (err) {
		return AES.decrypt(str, pass).toString(enc).replaceAll('"', "");
	}
}
