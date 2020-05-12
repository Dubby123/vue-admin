import service  from '../utils/request'
//获取分类类表
export function GetOtherToKen(data) {
  return service.request({
    method:'post',
    url:'/uploadImgToken/',
    data
  })
}
