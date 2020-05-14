import cookie from "cookie_js";

const adminToKen = "admin_toKen";
const usernameKey = "username";


export function getToKen(){
  return cookie.get(adminToKen);
}

export function setToKen(toKen){
  return cookie.set(adminToKen, toKen);
}

export function removeToKen(adminToKen){
  return cookie.remove(adminToKen);
}

export function setUserName(value){
  return cookie.set(usernameKey, value);
}

export function getUserName(){
  return cookie.get(usernameKey);
}

export function removeUserName(){
  return cookie.remove(usernameKey);
}


export function  deepClone(obj) {
  let o;
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null;
    }else{
      if (obj instanceof Array) {
        o = [];
        for (let  i = 0, len = obj.length; i < len; i++) {
          o.push( deepClone(obj[i]));
        }
      } else {
        o = {};
        for (let j in obj) {
          o[j] = deepClone(obj[j]);
        }
      }
    }
  }else {
    o = obj;
  }
  return o;
}
