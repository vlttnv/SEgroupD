$(document).ready(function() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
  	
		loadMainPage(null);
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
})

var keyData;

function loadMainPage(name) {
	var stocksTable = document.getElementById("stocks");
	var key = new XMLHttpRequest();
	key.open('GET', '../data/key.csv');
	key.onreadystatechange = function() {
		if (key.readyState != 4) {
			return;
		}
		var csvKey = key.responseText;
		keyData = $.csv.toArrays(csvKey);
		var table = '';
		for (var row in keyData) {
			var name = keyData[row][0];
			var symbol = keyData[row][1];
			if (name != null && name.substr(0) == name)
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
		html += '<tr onclick=\"onClick(\'' + symbol + '\');\">\r\n' +
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

function onClick(symbol) {
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
}



function show(value){
	var lowercaseValue = value.toLowerCase();
	var stocksTable = document.getElementById("stocks");
	var rows = stocksTable.rows;
	for (var row = 1; row < rows.length; row++){
		if (value.length != 0 && rows[row].cells[0].innerHTML.toLowerCase().substr(0, value.length) != lowercaseValue && value.length != 0 && rows[row].cells[1].innerHTML.toLowerCase().substr(0, value.length) != lowercaseValue)
			rows[row].className = "HiddenClass";
		else rows[row].className = "";
	}
}