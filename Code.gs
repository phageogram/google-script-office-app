var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employees');
var data = sheet.getDataRange().getValues();


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Display')
    .addItem('Open Sidebar', 'openSideBar')
    .addItem('Open Dialogue', 'openDialogue')
    .addToUi();
}

function doGet() {
  var template = HtmlService.createTemplateFromFile('page');
  return template.evaluate().setTitle('OPDP Check In');
}

function getData() {
  var data = sheet.getDataRange().getValues();

  var mainData = data.filter(row => row[0] === 'Main' && (row[2] != false || row[3] != false));
  var annexData = data.filter(row => row[0] === 'Annex' && (row[2] != false || row[3] != false));
  //var mainNames = [];
  //var annexNames = [];

  /*for (i=0; i<mainData.length; i++) {
    mainNames.push(mainData[i][1]);
  }

  for (i=0; i< annexData.length; i++) {
    annexNames.push(annexData[i][1])
  }

  for (i=0; i < mainData.length; i++) {}*/
  // the above code is currently idle, keeping for later functionality.

  var result = {
    Main: mainData,
    Annex: annexData,
  };
  console.log(result.Main)
  return result
}

function getScriptURL() {
  return ScriptApp.getService().getUrl();
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getEmployeeNames() {
  var names = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  return names
}

function getOptions() {
  var options = getEmployeeNames().flat();
  return options
}

function updateSheet(clockInStatus, action, selectedName, selectedWorkspace) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Employees");
  var buildingColumn = 1;
  var nameColumn = 2;
  var clockInAtWorkColumn = 3;
  var clockInAtHomeColumn = 4;

  var lastRow = sheet.getLastRow();

  for (var i = 2; i <= lastRow; i++) {
    var building = sheet.getRange(i, buildingColumn).getValue();
    var name = sheet.getRange(i, nameColumn).getValue();

    if (name === selectedName) {
      if (action === "Clock In") {
        if (selectedWorkspace === "Office") {
          sheet.getRange(i, clockInAtWorkColumn).setValue(clockInStatus);
        } else if (selectedWorkspace === "Home") {
          sheet.getRange(i, clockInAtHomeColumn).setValue(clockInStatus);
        }
      } else if (action === "Clock Out") {
        sheet.getRange(i, clockInAtWorkColumn).setValue(false);
        sheet.getRange(i, clockInAtHomeColumn).setValue(false);
      }
      break;
    }
  }
}


// Create sidebar and dialogue previews for testing
function openSideBar() {
  var sheet = ss.getSheetByName('Employees')
  var data = sheet.getDataRange().getValues();

  var ui = SpreadsheetApp.getUi();

  var template = HtmlService.createTemplateFromFile('page');

  template.building = data[0][0];
  template.name = data[0][1];

  template.data = data;

  ui.showSidebar(template.evaluate().setTitle('This is a demo'));
}

function openDialogue() {
  var ui = SpreadsheetApp.getUi();

  var template = HtmlService.createTemplateFromFile('page');

  ui.showModalDialog(template.evaluate(), 'This is a demo')
}