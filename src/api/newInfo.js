import service  from '../utils/request'

export function GetList(data) {
  return service.request({
    method:'post',
    url:'/news/getList/',
    data:data
  })
}
