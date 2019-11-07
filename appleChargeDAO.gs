var id = PropertiesService.getScriptProperties().getProperty('FILE_KEY');
var name = 't_apple_amount';

function execDb() {
  var dbIns = SpreadSheetsSQL.open(id, name);

//  dbIns.insertRows([
//  {orderNum: 'MJ001', date: 30, content: 'AppleMusic', amount: 960},
//  {orderNum: 'MJ002', date: 30, content: 'iTunes', amount: 200}
//]);

  var records = [
  {orderNum: 'MJ001', date: 30, content: 'AppleMusic', amount: 960},
  {orderNum: 'MJ002', date: 30, content: 'iTunes', amount: 200}
];
  
  insert(records)
}

// insert (一意制約違反チェック有り)
function insert(records) {
  var dbIns = SpreadSheetsSQL.open(id, name);
  
  for(var i = 0 ; i < records.length; i ++) {
    resl = dbIns.select(['orderNum']).filter('orderNum = ' + records[i].orderNum).result();
    if(resl.length > 0) {
      // 一意制約違反 
      Logger.log('This record is already exists.:' + convRecordStrForLogger(records[i]));
      // throw new Error("一意制約違反");
    } else {
     dbIns.insertRows([records[i]]); 
    }
  }
}

function convRecordStrForLogger(record) {
  return record.orderNum + ',' + record.date + ',' 
  + record.content + ',' + record.amount ;
}



