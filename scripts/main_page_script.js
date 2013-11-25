var testArray;
// testArray[0] = new Array();
// testArray[0][0] = "AAL";
// testArray[0][1] = "1019.34";
// testArray[0][2] = 2.3;
// testArray[0][3] = "Anglo American PLC";

// testArray[1] = new Array();
// testArray[1][0] = "AAL";
// testArray[1][1] = "1019.34";
// testArray[1][2] = -2.3;
// testArray[1][3] = "Anglo American PLC";

// testArray[2] = new Array();
// testArray[2][0] = "AAL";
// testArray[2][1] = "1019.34";
// testArray[2][2] = 2.3;
// testArray[2][3] = "Anglo American PLC";

// testArray[3] = new Array();
// testArray[3][0] = "AAL";
// testArray[3][1] = "1019.34";
// testArray[3][2] = -2.3;
// testArray[3][3] = "Anglo American PLC";

// testArray[4] = new Array();
// testArray[4][0] = "AAL";
// testArray[4][1] = "1019.34";
// testArray[4][2] = 2.3;
// testArray[4][3] = "Anglo American PLC";

// testArray[5] = new Array();
// testArray[5][0] = "AAL";
// testArray[5][1] = "1019.34";
// testArray[5][2] = -2.3;
// testArray[5][3] = "Anglo American PLC";

// testArray[6] = new Array();
// testArray[6][0] = "AAL";
// testArray[6][1] = "1019.34";
// testArray[6][2] = 2.3;
// testArray[6][3] = "Anglo American PLC";

// testArray[7] = new Array();
// testArray[7][0] = "AAL";
// testArray[7][1] = "1019.34";
// testArray[7][2] = -2.3;
// testArray[7][3] = "Anglo American PLC";

// testArray[8] = new Array();
// testArray[8][0] = "AAL";
// testArray[8][1] = "1019.34";
// testArray[8][2] = 2.3;
// testArray[8][3] = "Anglo American PLC";

// testArray[9] = new Array();
// testArray[9][0] = "AAL";
// testArray[9][1] = "1019.34";
// testArray[9][2] = -2.3;
// testArray[9][3] = "Anglo American PLC";

// testArray[10] = new Array();
// testArray[10][0] = "AAL";
// testArray[10][1] = "1019.34";
// testArray[10][2] = 2.3;
// testArray[10][3] = "Anglo American PLC";

// testArray[11] = new Array();
// testArray[11][0] = "AAL";
// testArray[11][1] = "1019.34";
// testArray[11][2] = -2.3;
// testArray[11][3] = "Anglo American PLC";

$(document).ready(function() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		fillTestArray();
		allData = testArray;
  		loadCurrentValues(allData, 0);
  		loadPaging(allData.length);
		loadMainPage();
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
})

function fillTestArray() {
	var index = 0;
	testArray = new Array();
	testArray[0] = new Array();
	testArray[0][0] = "AAL" + 0 + " ";
	testArray[0][1] = "1019.34";
	testArray[0][2] = 2.3;
	testArray[0][3] = "Anglo American PLC";
	for (index = 1; index < 113; index++) {
		testArray[index] = new Array();
		testArray[index][0] = "BBL" + index + " ";
		testArray[index][1] = "1019.34";
		testArray[index][2] = 2.3;
		testArray[index][3] = "Anglo American PLC";
	}
}

var currentPage = 0;
var currentDataInUse;
var allData;

function loadPaging(dataLength) {
	var paging = document.getElementById("paging");
	var width = Math.ceil(dataLength / 12) * 16;
	paging.style.width = width + 'px';
	var index;
	var html = '<div id=\"page0\" class=\"CurrentPage\"' +
				'onclick=\"pageOnClick(0)\"></div>\r\n';
	var pages = Math.ceil(dataLength / 12);
	for (index = 1; index < pages; index++) {
		html += '<div id=\"page' + index + '\" class=\"Page\"' +
		'onclick=\"pageOnClick(' + index + ')\"></div>\r\n';
	}
	html += '<div class=\"Last\"></div>';
	paging.innerHTML = html;
}

function pageOnClick(pageClicked) {
	var previousPage = document.getElementById("page" + currentPage);
	previousPage.className = "Page";
	var newCurrentPage = document.getElementById("page" + pageClicked);
	newCurrentPage.className = "CurrentPage";
	loadCurrentValues(currentDataInUse, pageClicked * 12);
	currentPage = pageClicked;
}

function filterCurrent(value) {
	currentDataInUse = new Array();
	var index = 0;
	for (var row in allData) {
		if (allData[row][0].substring(0, value.length).toLowerCase() == value.toLowerCase()) {
			currentDataInUse[index] = allData[row];
			index++;
		}
	}
	loadCurrentValues(currentDataInUse, 0);
	loadPaging(index);
}

function loadCurrentValues(data, start) {
	var currentValues = document.getElementById("currentValues");
	var index;
	var html = '';
	var itemsInPage;
	var indexLastRow;
	if (start + 12 < data.length) {
		itemsInPage = 12;
		indexLastRow = start + 8;
	} else {
		itemsInPage = data.length - start;
		var fullRows = Math.floor(itemsInPage / 4);
		indexLastRow = itemsInPage <= 4 ? start : start + fullRows * 4;
	}
	for (index = start; index < start + 12 && index < data.length; index++) {
		if (index >= indexLastRow) {
			html += '<div class=\"ItemPlaceholder BottomRowPlaceholder\">';
		} else {
			html += '<div class=\"ItemPlaceholder\">';
		}
		if ((index + 1) % 4 == 0) {
			html += '<div class=\"LastItemContainer\">\r\n';
		} else {
			html += '<div class=\"ItemContainer\">\r\n';

		}
		html += '<div class=\"Symbol\">' + data[index][0] + '</div>\r\n' +
			'<div class=\"Price\">' + data[index][1] + '</div>\r\n';
		if (data[index][2] > 0) {
			html += '<div class=\"ArrowUp Arrow fa fa-arrow-up\"></div>\r\n';
		} else {
			html += '<div class=\"ArrowDown Arrow fa fa-arrow-down\"></div>\r\n';

		}
		html += '<div class=\"Name\">' + data[0][3] + '</div>\r\n' +
				'<div class=\"VerticalLine\"></div>\r\n';

		html += '</div>\r\n</div>\r\n';
	}

	currentValues.innerHTML = html;
}

function loadMainPage() {
	var stocksTable = document.getElementById("stocks");
	var key = new XMLHttpRequest();
	key.open('GET', 'data/key.csv');
	key.onreadystatechange = function() {
		if (key.readyState != 4) {
			return;
		}
		var csv = key.responseText;
		var keyData = $.csv.toArrays(csv);
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
	reader.open('GET', 'data/' + symbol + '.csv');
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
		var nextToLastDayRow = data[2];
		var change = lastDayRow[1] / nextToLastDayRow[4] * 100 - 100;
		var changeString = Math.round(change * 100) / 100;
		if (change < 0) {
			html += '<td> <i class=\'fa fa-caret-down NegativeChange\'>' +
				'</i> ' + changeString + '% </td>\r\n'; 
		} else if (change > 0) {
			html += '<td> <i class=\'fa fa-caret-up PositiveChange\'>' +
				'</i> ' + changeString + '% </td>\r\n'; 
		} else {
			html += '<td>' + changeString + '% </td>\r\n';
		}
		var i;
		for (i = 1; i < 6; i++) {
			html += '<td>' + lastDayRow[i] + '</td>\r\n';
		}
		html += '</tr>\r\n';
		stocksTable.innerHTML += html;
	};
	reader.send();
}

function onClick(symbol) {
	var stocksTable = document.getElementById("mainContent");
	stocksTable.className = "HiddenClass";
	var individualStock = document.getElementById("individualStock");
	individualStock.className = "";
	var table = document.getElementById("singleStockTable");
	initialiseTable(table);
	var back = document.getElementById("back");
	back.className = "";
	var reader = new XMLHttpRequest();
	reader.open('GET', 'data/' + symbol + '.csv');
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
	filterCurrent(value);
}

var startDate;
var endDate;

function showByDate(element){	
	if (element.id == "startDate")
		startDate = new Date(element.value);
	else 
		endDate = new Date(element.value);
	// hide rows that do not match selected date
	if (startDate != null && endDate != null){
		var rows = document.getElementById('singleStockTable').rows;
		for (var row = 0; row < rows.length; row++){
			var day = new Date(rows[row].cells[0].innerHTML);
			if (day < startDate || day > endDate)
				rows[row].className = "HiddenClass";
			else rows[row].className = "";
		}
	// remove values
	document.getElementById('startDate').value = "";
	startDate = null;
	document.getElementById('endDate').value = "";
	endDate = null;	
	}
}

$(function() {
	$( "#startDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
});

$(function() {
	$( "#endDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
});

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 5000,
      values: [ 0, 5000 ],
      slide: function( event, ui ) {
        $( "#price" ).text( "By price range: £" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );		
		filter(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });
    $( "#price" ).text( "By price range: £" + $( "#slider-range" ).slider( "values", 0 ) +
      " - £" + $( "#slider-range" ).slider( "values", 1 ) );
	  filter($( "#slider-range" ).slider( "values", 0 ), $( "#slider-range" ).slider( "values", 1 ));
  });
  
function filter(low, high){
	var rows = document.getElementById('stocks').rows;
	for (var row = 0; row < rows.length; row++){
		var price = rows[row].cells[4].innerHTML;
		if (price < low || price > high)
			rows[row].className = "HiddenClass";
		else rows[row].className = "";
	} 
}
