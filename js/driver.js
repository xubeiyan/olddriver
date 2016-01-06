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
		var start = carContent.value,
			result = "";
		for (var i = 0; i < start.length; ++i) {
			result += morseCode(start[i], 'encode') + " ";
		}
		carLike.value = result.substring(0, result.length - 1);
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
		var start = carLike.value.split(" "),
			result = "";
		for (var element in start) {
			result += morseCode(start[element], 'decode');
		}
		carContent.value = result;
	} else {
		carContent.value = "这个飙车姿势太高了还未掌握";
	}
}

function morseCode(value, method) {
	var text = ['a','b','c','d','e',
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
		morse = ['.-','-...','-.-.','-..','.',
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
		for (var i = 0; i < text.length; ++i) {
			if (text[i] == value) {
				return morse[i];
			}
		}
		info.innerText = "疑似有未解析成功的字符";
		return "......";
	} else if (method == "decode") {
		for (var i = 0; i < morse.length; ++i) {
			if (morse[i] == value) {
				return text[i];
			}
		}
		return "Error";
	}

}


	