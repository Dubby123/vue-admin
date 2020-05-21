<template>
    <div>
        <div class="top">
            <select-vue  :items="items"  v-model="searchParams" @search="findRepair"  />
            <el-button type="danger"    @click="dialog_info_flag =!dialog_info_flag" >新增用户</el-button>
        </div>
        <table-vue  :configTable="configTable"  :requestParams ='requestParams' :tableData="tableData"  @selected="parentSelected">
            <template #status ='propsData'   >
                <el-switch
                        v-model="propsData.slotData.name"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </template>
            <template #operation='propsData' >
                <el-button size="small" type="danger" @click="operation(propsData.slotData)">删除</el-button>
                <el-button size="small" type="success" @click="operation(propsData.slotData)">编辑</el-button>
            </template>
            <template #tableFoot >
                <el-button @click="deleteAll">批量删除</el-button>
            </template>
        </table-vue>

        <add :flag.sync="dialog_info_flag"></add>
    </div>
</template>

<script>
    import  TableVue from '@c/TableVue/TableVue'
    import SelectVue from '@c/SelectVue/SelectVue'
    import add from './dialog/add'
  export default {
    name: "index",
    data(){
      return{
        username:'',
        selectedIds:[],
        dialog_info_flag:false,
        configTable:{
          selection: true,
          tHead: [
            {
              label: "邮箱/用户名",
              field: "title",
              width: 200
            },
            {
              label: "真实姓名",
              field: "name",
              width: 120
            },
            {
              label: "手机号",
              field: "phone",
              width: 300
            },
            {
              label: "地区",
              field: "address",
              width: 500
            },
            {
              label: "角色",
              field: "role",
              width: 300
            },
            {
              label: "禁启用状态",
              field: "status",
              columnType: "slot",
              slotName: "status",
              width: 200
            },
            {
              label: "操作",
              columnType: "slot",
              slotName: "operation",
              width: 300
            }
          ],
        },
        searchParams:{
          pageNo: 1,
          pageSize: 15,
          name: "",
          repairerId: undefined,
          floorId: undefined,
          roomId: undefined
        },
        items:[
          { name: "维修师傅", key: "repairerId", type: "select", options: [] },
          { name: "楼号", key: "floorId", type: "select", options: [ ] },
          { name: "宿舍", key: "roomId", type: "select", options: [] }
        ],
        tableData:[],
        cityPickerData:{},
        requestParams:{
          url:'userInfo',
          methons:'post',
          data:{
            pageNumber:1,
            pageSize:10
          }
        }
      }
    },
    components:{
      TableVue,
      SelectVue,
      add
    },
    created(){
      console.log('132132',this.username)
    },
    methods:{
      deleteAll(){
        console.log('this.selectedIds',this.selectedIds)
      },
      parentSelected(data){
        this.selectedIds = data
      },
      findRepair(data){
        console.log(data)
      },
      operation(row){
        console.log('row',row)
      }
    }
  }
</script>

<style scoped lang='scss'>
    .top{
        width: 800px;
        display: flex;
    }

</style>
