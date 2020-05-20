import { TableUrl } from "../api/ConfigTableUrl";
import { GetTableData } from "../api/common";
var tableMixin = {
  data(){
    return{
      tableData:[]
    }
  },
  created: function () {
    this.handleTableData(this.requestParams)
  },
  methods: {
    handleTableData(params) {
      const reqData = {
        url: TableUrl[params.url],
        method:params.method,
        data: params.data
      }
      GetTableData(reqData).then(res=>{
        this.tableData = res.data.data.data
        this.pageConfig.total = res.data.data.total
      }).catch(err=>{
        console.log( err)
      })
    }
  }
}
export default tableMixin
