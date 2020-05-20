import { GetTableData } from '../../api/common'
import { TableUrl } from '../../api/ConfigTableUrl'
export function handleTableData(params) {
  const reqData = {
    url: TableUrl[params.url],
    method:params.method,
    data: params.data
  }
  GetTableData(reqData).then(res=>{
   this.tableData.item = res.data.data.data
    this.pageConfig.total = res.data.data.total
  }).catch(err=>{
    console.log( err)
  })
}
