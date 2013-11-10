(function($){
	$(function(){
		var BIN_TOTAL = 128;
			//HEX_TOTAL = BIN_TOTAL/4,
			//CHAR_ASCII_START = 64;
		var $mask = $('#mask'),
			$range = $('.range'),
			$ip = $('input[name=ip]');
		var $minIp = $('.subnet-min'),
			$maxIp = $('.subnet-max');

		
		var binToHex = function (bin) {
			var hex = '';
			var binArr = bin.match(/\w{1,4}/g);
			for( var i=0; i<binArr.length; i++ ) {
				hex += parseInt(binArr[i], 2).toString(16).toUpperCase();
			}
			return hex;
		};
		var hexToBin = function (hex) {
			var bin = '';
			for(var i=0; i<hex.length; i++){
				var b = parseInt(hex[i], 16).toString(2)
				bin += completeChar(4-b.length, '0') + b;
			}
			return bin;
		};
/*
		var getConcatBin = function (mask) {
			var charIndex = keyHexIndex(mask),
					concatBinNum = mask%4;
			var concatHex = ip.charAt(charIndex);
			return hexToBin(concatHex).substr(0, concatBinNum);
		};
		var keyHexIndex = function(mask) {
			return Math.floor(mask/4);
		};
		var calKeyHex = function( mask, theBin ) {
			var bin = getConcatBin(mask);
			return binToHex(bin);
		};
*/
/*		var buildIP = function(mask) {
			var keyIndex = keyHexIndex(mask);
			var newIpStart = ip.substr(0, keyIndex),
				placeholderNum = HEX_TOTAL - keyIndex - 1;
			var minIp = newIpStart + calKeyHex(mask, 0),
				maxIp = newIpStart + calKeyHex(mask, 1);
			//var newMinIp = [], newMaxIp = [];

			minIp += completeChar(placeholderNum, '0');
			maxIp += completeChar(placeholderNum, 'F');
			for(var i=0; i<HEX_TOTAL/4; i++) {
				newMinIp.push( minIp.substr(4*i, 4) );
				newMaxIp.push( maxIp.substr(4*i, 4) );
			}
			$minIp.text(minIp.split(/\w[4]/).join(':'));
			$maxIp.text(maxIp.split(/\w[4]/).join(':'));
		};


		var ip = '', getIp = function() {
			$ip.each(function(){
				var inputHex = $(this).val().toUpperCase();
				var inputLengthLack = 4 - inputHex.length;
				ip += completeChar(inputLengthLack, '0') + inputHex;
			});
		};
		*/
		var getRange = function() {
			var ip = '';
			var mask = $mask.val();
			var minIp = '', maxIp = '', baseIp = '';
			
			// Get the input IP
			$ip.each(function(){
				var inputHex = $(this).val();
				var inputLengthLack = 4 - inputHex.length;
				ip += completeChar(inputLengthLack, '0') + inputHex;
			});
			
			// Get the IP
			baseIp = hexToBin(ip).substr(0, mask);
			minIp = buildIp(baseIp, '0');
			maxIp = buildIp(baseIp, '1');
						
			// Insert the range
			$minIp.text(minIp);
			$maxIp.text(maxIp);
		};

		var completeChar = function( num, character ) {
			return new Array(num+1).join(character);
		};
		
		var buildIp = function(binaryBaseIp, char) {
			var completeNum = BIN_TOTAL - binaryBaseIp.length;
			var binaryIp = binaryBaseIp + completeChar(completeNum, char);
			var hexIp = binToHex( binaryIp );
			return hexIp.match(/\w{4}/g).join(':');
		};

		// Init mask slider

		$range.slider({
			min: 0,
			max: BIN_TOTAL,
			range: 'min',
			// value: $mask.val(),
			slide: function (e, ui) {
				$mask.val(ui.value);
				$mask.change();
			}
		});
		$mask.on('keyup, change',function() {
			$range.slider('value', $(this).val());
			getRange();
		});

		// Init input
		$ip.keyup(getRange);
		getRange();
	});
}(jQuery));