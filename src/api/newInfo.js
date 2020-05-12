import service  from '../utils/request'

export function GetList(data) {
  return service.request({
    method:'post',
    url:'/news/getList/',
    data:data
  })
}
//添加信息
export function AddItem(data) {
  return service.request({
    method:'post',
    url:'/news/add/',
    data:data
  })
}

