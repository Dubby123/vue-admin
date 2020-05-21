
/**
 * 验证邮箱
 */
export function validateEmail(value){
  var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证密码 6至20位的字母+数字
 */
export function validatePass(value){
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证验证码
 */
export function validateVCode(value){
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 没有使用default时，可以同时声明多个export。
 * 文件 import 需要花括号。
 */
export function stripscript(s)
{
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (let i = 0; i < s.length; i++) {
    rs = rs+s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
