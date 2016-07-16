var driveMethod = document.getElementById("drivemethod"),
	driveACar = document.getElementById("driveacar"),
	takeACar = document.getElementById("takeacar"),
	carContent = document.getElementById("carcontent"),
	carLike = document.getElementById("carlike"),
	info = document.getElementById("information"),
	driveOption = document.getElementById("driveoption"),
	coding = "morse",
	split = " ";

// 改变编码	
driveMethod.onchange = function () {
	coding = driveMethod.value;
	if (coding == "morse") {
		driveOption.style.display = "inline-block";
		driveOption.innerHTML = '<option value="space">空格</option><option value="slash">/</option>';
	} else if (coding == "ascii") {
		driveOption.style.display = "inline-block";
		driveOption.innerHTML = '<option value="space">空格</option><option value="slash">/</option>';
	} else {
		driveOption.style.display = "none";
	}
}

driveOption.onchange = function () {
	if (driveOption.value == "slash") {
		split = "/";
	} else {
		split = " ";
	}
}

driveMethod.onchange();

// 发车
driveACar.onclick = function () {
	if (carContent.value == "") {
		return;
	}
	if (coding == "morse") {
		carLike.value = morse(carContent.value, "encode", split);
	} else if (coding == "ascii") {
		carLike.value = ascii(carContent.value, "encode", split);
	} else if (coding == "story") {
		carLike.value = story(carContent.value);
	} else if (coding == "base64") {
		carLike.value = base64(carContent.value, "encode");
	} else {
		carLike.value = "这个车太超前了，不敢飙车";
	}
}

// 上车
takeACar.onclick = function () {
	if (carLike.value == "") {
		return;
	}
	if (coding == "morse") {
		carContent.value = morse(carLike.value, "decode", split);
	} else if (coding == "ascii") {
		carContent.value = ascii(carLike.value, "decode", split);
	} else if (coding == "base64") {
		carContent.value = base64(carLike.value, "decode");
	} else if (coding == "story") {
		carContent.value = "正常人都能看出来的就不用劳烦了吧";
	} else {
		carContent.value = "这个飙车姿势太高了还未掌握";
	}
}

//莫尔斯电码
function morse(text, method, splitChar) {
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
			output += morseOne(text[i], "encode") + splitChar;
		}
		output = output.substring(0, output.length - 1); // 去掉最后的空格
	} else if (method == "decode") {
		text = text.replace(/\n/g, splitChar); //替换其中的换行为空格
		var textArray = text.split(splitChar);
		for (var i = 0; i < textArray.length; ++i) {
			output += morseOne(textArray[i], "decode");
		}
	}
	return output;
}

//ASCII码
function ascii(text, method, splitChar) {
	function asciiOne(value, method) {
		var textCode = [' ','!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','/',
					'0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?',
					'@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
					'P','Q','R','S','T','U','V','W','X','Y','Z','[',' ',']','^','_',
					'`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',
					'p','q','r','s','t','u','v','w','x','y','z','{','|','}','~'],
			asciiCode = ['20','21','22','23','24','25','26','27',
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
			for (var i = 0; i < textCode.length; ++i) {
				if (textCode[i] == value) {
					return asciiCode[i];
				}
			}
			return "00";
		} else if (method == "decode") {
			for (var i = 0; i < asciiCode.length; ++i) {
				if (asciiCode[i] == value) {
					return textCode[i];
				}
			}
			return "Error";
		}
	}
	// 转换十六进制到二进制
	function hexToBin (hex) {
		var hexList = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
			binList = [	'0000','0001','0010','0011','0100','0101','0110','0111',
						'1000','1001','1010','1011','1100','1101','1110','1111'],
			output = "";
		for (var i = 0; i < hex.length; ++i) {
			for (var j = 0; j < hexList.length; ++j) {
				if (hex[i] == hexList[j]) {
					output += binList[j];
					break;
				}
			}
		}
		return output.substring(1, output.length);
	}
	// 转换二进制到十六进制
	function binToHex (bin) {
		if (bin.length == 7) {
			bin = '0' + bin;
		}
		if (bin.length != 8) {
			return "00";
		}
		var hexList = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
			binList = [	'0000','0001','0010','0011','0100','0101','0110','0111',
						'1000','1001','1010','1011','1100','1101','1110','1111'],
			output = "",
			first = bin.substring(0, 4),
			second = bin.substring(4, 8);
		for (var i = 0; i < binList.length; ++i) {
			if (first == binList[i]) {
				output += hexList[i];
			}
		}
		for (var i = 0; i < binList.length; ++i) {
			if (second == binList[i]) {
				output += hexList[i];
			}
		}
		//console.log(output);
		return output;
	}
	var output = "";
	if (method == "encode") {
		for (var i = 0; i < text.length; ++i) {
			output += hexToBin(asciiOne(text[i], "encode")) + splitChar;
		}
		output = output.substring(0, output.length - 1); // 去掉最后的空格
	} else if (method == "decode") {
		var textArray = text.split(splitChar);
		for (var i = 0; i < textArray.length; ++i) {
			output += asciiOne(binToHex(textArray[i]), "decode");
		}
	}
	return output;
}

// base64加解密
function base64(text, method) {
	if (method == 'encode') {
		return btoa(text);
	} else if (method == 'decode') {
		return atob(text);
	}
}


// 故事会型
function story(text) {
	var storyText = ["审判长：播放器代码是你写的吗？\n被告：是的。\n审判长：念一遍。\n被告：%text%",
	"我翻开近代历史一看，这历史没有年代，歪歪斜斜的每页上都写着“氏王目田”几个字。我横竖睡不着，仔细看了半夜，才从字缝里看出字来，满本都写着两个字:'%text%'!",
	"pi=3.141592653589793238462643383279502384197169399375105820974944592307816404498465797948949%text%2273191"],
		length = storyText.length,
		rand = Math.floor(Math.random() * length),
		str = storyText[rand].replace('%text%', text);
	return str;
		
}