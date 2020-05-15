import service  from '../utils/request'
//获取七牛云的Token
export function GetOtherToKen(data) {
  return service.request({
    method:'post',
    url:'/uploadImgToken/',
    data
  })
}
//获取Table的tableData
export function GetTableData(params) {
  return service.request({
    method:params.method ||'post',
    url:params.url,
    data:params.data || {}
  })
}
