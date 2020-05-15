import { GetTableData } from '../../api/common'
import { TableUrl } from '../../api/ConfigTableUrl'

 export const tableData={
   item: [],
   total: 0
 }
export function handleTableData(params) {
  const reqData = {
    url: TableUrl[params.url],
    method:params.method,
    data: params.data
  }
  GetTableData(reqData).then(res=>{
    tableData.item = res.data.data.data
  }).catch(err=>{
    console.log( err)
  })

}
