var EXPIRE_TIME = 1000*60*60*24*2;

module.exports = {
  checkObj: function (obj)
  {
    if ((obj === undefined || obj === null || obj.length == 0) == false) {
      return true;
    }
    return false;
  },
  getTime : function() {
    let date = new Date();
    return date.getTime();
  },

  getMessageOfCode(code) {
    switch (code) {
      case 1000 : return "OK";
      case 10002 : return "Query database wrong or Cannot connect to database";
      case 10006: return "Not access";
      case 10007: return "Not enough parameters or parameters is invalid";
    }
  },

  convertToValue(string) {
    return "'" + string + "'";
  },
  
  convertToLikeValue(string) {
    return "'%" + string + "%'"
  },

  EXPIRE_TIME: EXPIRE_TIME
}