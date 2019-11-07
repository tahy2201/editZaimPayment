// スクレイピングに使用する文字列
var arrayAmountRegix;
var arrayOrderRegix;
var arrayContentRegix;

//function test2() {
//  getScrapingStrs();
//  
//  var baseStrFrom = '<td width="90" align="right" style="width:120px;padding:0 20px 0 0;font-size:' 
//  + '16px;font-weight:600;white-space:nowrap;">\r\n'
//  +'                          ';  
//  createFile('baseStrFrom_html.txt',baseStrFrom);
//}

// 金額取得
function getAmount(parser) {
  var retStr;
  for(var i = 0; i < arrayAmountRegix.length; i++) {
    retStr = parser.from(arrayAmountRegix[i][0]).to(arrayAmountRegix[i][1]).build();
    if(retStr.slice(0,1) == '¥') {
      break;
    }  
  }
  return retStr;
}

// 注文番号取得
function getOrderNum(parser) {
  var retStr;
  for(var i = 0; i < arrayOrderRegix.length; i++) {
    retStr = parser.from(arrayOrderRegix[i][0]).to(arrayOrderRegix[i][1]).build();
    if(retStr.slice(0,1) == 'M') {
      break;
    }  
  }
  return retStr;
}

// 内容取得
function getContent(parser) {
  var retStr = '';
  var arrayContent;
  for(var i = 0; i < arrayContentRegix.length; i++) {
    arrayContent = parser.from(arrayContentRegix[i][0]).to(arrayContentRegix[i][1]).iterate();
    if(arrayContent[0].length < 200 ) {
      break;
    }
  }
  
  for(var i = 0; i < arrayContent.length/2; i++) {
    if(i != 0) retStr = retStr + ',';
    retStr = retStr + arrayContent[i];
  }
  //Logger.log('retStr:' + retStr + ' content:' + arrayContent);
  return retStr;
}


// スクレイピング文字列取得
function getScrapingStrs() {
  const SC_AMOUNT_X = 5;
  const SC_AMOUNT_Y = 1;
  const SC_ORDER_X = 5;
  const SC_ORDER_Y = 3;
  const SC_CONTENT_X = 5;
  const SC_CONTENT_Y = 5;
  arrayAmountRegix = getScrapingRegix(SC_AMOUNT_X, SC_AMOUNT_Y);
  arrayOrderRegix = getScrapingRegix(SC_ORDER_X, SC_ORDER_Y);
  arrayContentRegix = getScrapingRegix(SC_CONTENT_X, SC_CONTENT_Y);
}

// x,y:スクレイピング文字列の開始座標
// fromとtoに使用する文字列
function getScrapingRegix(x,y) {
  var sheet =getSheetObj();
  var array = [];
  
  var i = 0;
  while( sheet.getRange(x + i, y).getValue() != '' ) {
    array[i] = [];
    for(var j=0; j<2; j++){
      array[i][j] = sheet.getRange(x + i, y + j).getValue();
    }
    i = i + 1;
  }
  return array;
}

function getSheetObj() {
  return SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('FILE_KEY'))
  .getSheetByName(PropertiesService.getScriptProperties().getProperty('SHEET_NAME'));
}

