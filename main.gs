
// GmailのAplleからの領収書メールを元に履歴を作成する。
function createAppleAmount() {
  getScrapingStrs();
  
  // 検索日時作成
  var nowDate = new Date();
  var before2Date = Utilities.formatDate(
    new Date(nowDate.getYear(), nowDate.getMonth(), nowDate.getDate() - 2), 'Asia/Tokyo', 'yyyy-MM-dd');
  
  // メール検索
  var mailThreads = GmailApp.search('label:04_支払い-apple after:' + before2Date);

  for(var i = 0; i < mailThreads.length; i++) {
    var messages = mailThreads[i].getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var htmlStr = messages[j].getBody();
      getReciptItems(htmlStr);
    }
    
    if(i == 10) {
      break;
    }
  }
}

function getReciptItems(htmlStr) {
  // スクレイピングのために改行コード変換
  var parser = Parser.data(htmlStr.replace(/\r\n/g, '\n'));
  
  var dateStr = parser.from('日付</span><br>').to(' </td>').build();
  var date = new Date(dateStr.replace(/(\d+)年(\d+)月(\d+)日/, '$1/$2/$3'));
  
  //createFile(dateStr + '_html.txt',htmlStr)
  
  // ソース
  var billingSource = parser.from('<span style="font-size:14px;font-weight:500;">').to('</span>').build();
  // 金額
  var amount = getAmount(parser);
  // 注文番号
  var orderNum = getOrderNum(parser);
  
  var content = '';
  
  if (billingSource == 'App Store') {
    content = getContent(parser);
  } else if(billingSource == 'Apple Music') {
    content = getContent(parser);
  } else if(billingSource == 'Appleのサービス') {
    content = getContent(parser);
  } else if(billingSource == 'iTunes Store') {
    content = getContent(parser);
  } else {
    Logger.log('該当するサービスがありませんでした。');
  }
  
  // 現在時刻取得
  var nowDate = new Date();

  insert([{orderNum: orderNum, date: date, content: '[' + billingSource + '] ' + content ,
           amount: amount, createDate: nowDate, updateDate: nowDate}]);
  
}

/**
* ファイル書き出し
* @param {string} fileName ファイル名
* @param {string} content ファイルの内容
*/
function createFile(fileName, content) {  
  var folder = DriveApp.getFolderById('1lhVRJE9ANoSbHZRNUhzph5uK0OqtWUCb');
  var contentType = 'text/plain';
  var charset = 'utf-8';
  
  // Blob を作成する
  var blob = Utilities.newBlob('', contentType, fileName)
  .setDataFromString(content, charset);
  
  // ファイルに保存
  folder.createFile(blob);
}