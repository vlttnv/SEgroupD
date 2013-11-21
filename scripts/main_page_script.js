$(document).ready(function() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
  	
		loadMainPage();
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
})

function loadMainPage() {
	var stocksTable = document.getElementById("stocks");
	var key = new XMLHttpRequest();
	key.open('GET', '../data/key.csv');
	key.onreadystatechange = function() {
		if (key.readyState != 4) {
			return;
		}
		var csvKey = key.responseText;
		var keyData = $.csv.toArrays(csvKey);
		var table = '';
		for (var row in keyData) {
			var name = keyData[row][0];
			var symbol = keyData[row][1];
			addRow(name, symbol, stocksTable);
		}

	};
	key.send();
}

function addRow(name, symbol, stocksTable) {
	var reader = new XMLHttpRequest();
	reader.open('GET', '../data/' + symbol + '.csv');
	reader.onreadystatechange = function() {
		if (reader.readyState != 4) {
			return;
		}
		var csv = reader.responseText;
		var data = $.csv.toArrays(csv);
		var html = '';
		html += '<tr>\r\n' +
				'<td>' + name + '</td>\r\n' +
				'<td>' + symbol + '</td>\r\n';
		var lastDayRow = data[1];
		var i;
		for (i = 0; i < 6; i++) {
			html += '<td>' + lastDayRow[i] + '</td>\r\n';
		}
		html += '</tr>\r\n';
		stocksTable.innerHTML += html;
	};
	reader.send();
}