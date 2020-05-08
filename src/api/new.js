import service  from '../utils/request'
//获取分类类表
export function GetCategoryAll() {
  return service.request({
    method:'post',
    url:'/news/getCategoryAll/',
  })
}


//添加一级分类
export function AddFirstCategory(data) {
  return service.request({
    method:'post',
    url:'/news/addFirstCategory/',
    data:data
  })
}
//添加二级分类
export function AddChildrenCategory(data) {
  return service.request({
    method:'post',
    url:'/news/addChildrenCategory/',
    data:data
  })
}
//删除信息分类
export function DeleteCategory(data) {
  return service.request({
    method:'post',
    url:'/news/deleteCategory/',
    data:data
  })
}

