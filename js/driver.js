var driveMethod = document.getElementById("drivemethod"),
	driveACar = document.getElementById("driveacar"),
	takeACar = document.getElementById("takeacar"),
	carContent = document.getElementById("carcontent"),
	carLike = document.getElementById("carlike"),
	info = document.getElementById("information"),
	coding = "morse";

// 改变编码	
driveMethod.onchange = function () {
	coding = driveMethod.value;
}

// 发车
driveACar.onclick = function () {
	if (carContent.value == "") {
		return;
	}
	if (coding == "morse") {
		carLike.value = morse(carContent.value, "encode");
	} else if (coding == "ascii"){
		carLike.value = ascii(carContent.value, "encode");
	}
	else {
		carLike.value = "这个车太超前了，不敢飙车";
	}
}

// 上车
takeACar.onclick = function () {
	if (carLike.value == "") {
		return;
	}
	if (coding == "morse") {
		carContent.value = morse(carLike.value, "decode");
	} else if (coding == "ascii") {
		carContent.value = ascii(carLike.value, "decode");
	}
	else {
		carContent.value = "这个飙车姿势太高了还未掌握";
	}
}

//莫尔斯电码
function morse(text, method) {
	function morseOne(value, method) {
		var textCode = ['a','b','c','d','e',
					'f','g','h','i','j',
					'k','l','m','n','o',
					'p','q','r','s','t',
					'u','v','w','x','y',
					'z','1','2','3','4',
					'5','6','7','8','9',
					'0','.',',','?',"'",
					'!','/','(',')','&',
					':',';','=','+','-',
					'_','"','$','@'],
			morseCode = ['.-','-...','-.-.','-..','.',
					'..-.','--.','....','..','.---',
					'-.-','.-..','--','-.','---',
					'.--.','--.-','.-.','...','-',
					'..-','...-','.--','-..-','-.--',
					'--..','.----','..---','...--','....-',
					'.....','-....','--...','---..','----.',
					'-----','.-.-.-','--..--','..--..','.---.',
					'-.-.--','-..-.','-.--.','-.--.-','.-...',
					'---...','-.-.-.','-...-','.-.-.','-....-',
					'..--.-','.-..-.','...-..-','.--.-.'];
		if (method == "encode") {
			for (var i = 0; i < textCode.length; ++i) {
				if (textCode[i] == value) {
					return morseCode[i];
				}
			}
			info.innerText = "疑似有未解析成功的字符";
			return "......";
		} else if (method == "decode") {
			for (var i = 0; i < morseCode.length; ++i) {
				if (morseCode[i] == value) {
					return textCode[i];
				}
			}
			return "Error";
		}
	}
	
	var output = "";
	if (method == "encode") {
		for (var i = 0; i < text.length; ++i) {
			output += morseOne(text[i], "encode") + ' ';
		}
		output = output.substring(0, output.length - 1); // 去掉最后的空格
	} else if (method == "decode") {
		var textArray = text.split(' ');
		for (var i = 0; i < textArray.length; ++i) {
			output += morseOne(textArray[i], "decode");
		}
	}
	return output;
}

//ASCII码
function ascii(value, method) {
	var text = [' ','!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','/',
				'0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?',
				'@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
				'P','Q','R','S','T','U','V','W','X','Y','Z','[',' ',']','^','_',
				'`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',
				'p','q','r','s','t','u','v','w','x','y','z','{','|','}','~'],
		ascii = ['20','21','22','23','24','25','26','27',
				'28','29','2A','2B','2C','2D','2E','2F',
				'30','31','32','33','34','35','36','37',
				'38','39','3A','3B','3C','3D','3E','3F',
				'40','41','42','43','44','45','46','47',
				'48','49','4A','4B','4C','4D','4E','4F',
				'50','51','52','53','54','55','56','57',
				'58','59','5A','5B','5C','5D','5E','5F',
				'60','61','62','63','64','65','66','67',
				'68','69','6A','6B','6C','6D','6E','6F',
				'70','71','72','73','74','75','76','77',
				'78','79','7A','7B','7C','7D','7E','7F'];

	if (method == "encode") {
		for (var i = 0; i < text.length; ++i) {
			if (text[i] == value) {
				return ascii[i];
			}
		}
		return "00";
	} else if (method == "decode") {
		for (var i = 0; i < ascii.length; ++i) {
			if (ascii[i] == value) {
				return text[i];
			}
		}
		return "Error";
	}
}
