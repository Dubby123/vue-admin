
import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
export default {
  install(Vue, option){
    Vue.prototype.hint = function (params) {
      MessageBox.confirm(params.content, params.tip||'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: params.type|| 'warning',
        center:true
      }).then(() => {
        params.success && params.success( params.id )
        Message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
