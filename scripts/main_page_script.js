$(document).ready(function() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
  	
		loadMainPage();
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
})

var currentStockSymbol;
var currentStockName;

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
		html += '<tr onclick=\"onClick(\'' + symbol 
				+ '\', \'' + name + '\');\">\r\n' +
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

function follow() {
	// create the post request to the server to send the following
	var test = document.getElementById("test");
	test.innerHTML = "the symbol to follow: " + currentStockSymbol +
		 ' the name: ' + currentStockName;
}

function onClick(symbol, name) {
	var test = document.getElementById('test');
	test.innerHTML = "HELLO";
	var stocksTable = document.getElementById("mainContent");
	stocksTable.className = "HiddenClass";
	var individualStock = document.getElementById("individualStock");
	individualStock.className = "";
	var table = document.getElementById("singleStockTable");
	initialiseTable(table);
	var back = document.getElementById("back");
	back.className = "";
	var follow = document.getElementById("follow");
	follow.className = "";
	currentStockName = name;
	currentStockSymbol = symbol;

	var reader = new XMLHttpRequest();
	reader.open('GET', '../data/' + symbol + '.csv');
	reader.onreadystatechange = function() {
		if (reader.readyState != 4) {
			return;
		}
		var csv = reader.responseText;
		var data = $.csv.toArrays(csv);
		var html = '';
		var index = 0;
		for(var row in data) {
			if (index > 0) {
				html += '<tr>\r\n';
				var i;
				for (var i = 0; i < 6; i++) {
					html += '<td>' + data[row][i] + '</td>\r\n';
				}
				html += '</tr>\r\n';
			}
			index++;
		}
		table.innerHTML += html;
	}
	reader.send();
}

function initialiseTable(table) {
	table.innerHTML = '<tr>\r\n' + 
				'<th>Trading Day</th>\r\n' + 
				'<th>Opening Price</th>\r\n' + 
				'<th>Trading Day\'s High</th>\r\n' + 
				'<th>Trading Day\'s Low</th>\r\n' + 
				'<th>Closing Price</th>\r\n' + 
				'<th>Volume</th>\r\n' +
				'</tr>';
}

function goBack() {
	var back = document.getElementById("back");
	back.className = "HiddenClass";
	var individualStock = document.getElementById('individualStock');
	individualStock.className = "HiddenClass";
	var mainContent = document.getElementById("mainContent");
	mainContent.className = "";
	var follow = document.getElementById("follow");
	follow.className = "HiddenClass";
}