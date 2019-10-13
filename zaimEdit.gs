function editZaimAppleAmount(service) {
  var url = 'https://api.zaim.net/v2/home/money';
  const params = '?mapping=1&start_date=' + '2019-09-29' + '&end_date=' + '2019-09-30';
  //+ params
    var response = service.fetch(url , {
      method: 'get',
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  var jsonStr = JSON.stringify(result, null, 2);
  //Logger.log(result["money"].length);
  
  var jsonArray = result["money"];
  
//  for( var i = 0; i< jsonArray.length; i ++ ) {
//    
//    
//  }
  
  
  
  var nowDate = new Date();
  var before2Date = Utilities.formatDate(
    new Date(nowDate.getYear(), nowDate.getMonth(), nowDate.getDate() - 2), 'Asia/Tokyo', 'yyyy-MM-dd');
}



