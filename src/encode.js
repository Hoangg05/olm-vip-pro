import * as AES from "crypto-js/aes";

export default function encode(str, pass, console_refresh = true) {
	let _e_ = AES.encrypt(JSON.stringify(str), pass).toString();

	let c = _e_.indexOf("/");
	while (c > -1) {
		if (console_refresh) {
			console.log("Refresh: " + _e_);
		}
		_e_ = AES.encrypt(JSON.stringify(str), pass).toString();
		c = _e_.indexOf("/");
	}

	return _e_;
}
