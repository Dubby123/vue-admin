import service  from '../utils/request'
//添加信息
export function getCityPicker(data) {
  return service.request({
    method:'post',
    url:'/cityPicker/',
    data:data
  })
}

/**
 * 角色列表
 */
export function GetRole(data = {}){
  return service.request({
    method: "post",
    url: "/role/",
    data
  })
}
