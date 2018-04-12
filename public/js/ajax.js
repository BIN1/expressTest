var ajaxData = function(method,url,params) {
  var request = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"); //新建XMLHttpRequest对象
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      //成功完成
      // 判断响应结果
      if (request.status === 200) {
        return success(request.responseText);
      } else {
        return fail(request.status);
      }
    }
  };
  request.open(method, url,false);
  request.send(params);
};
// module.exports = { ajaxData };
