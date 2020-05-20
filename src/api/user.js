import service  from '../utils/request'
//添加信息
export function getCityPicker(data) {
  return service.request({
    method:'post',
    url:'/cityPicker/',
    data:data
  })
}
