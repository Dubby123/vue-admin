<template>
    <div>
        <select-vue  :items="items"  v-model="searchParams" @search="findRepair"  />
        <table-vue  :configTable="configTable"  :tableData="tableData">
            <template v-slot:status ='propsData'   >
                <el-switch
                        v-model="propsData.slotData.name"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </template>
            <template v-slot:operation='propsData' >
                <el-button size="small" type="danger" @click="operation(propsData.slotData)">删除</el-button>
                <el-button size="small" type="success" @click="operation(propsData.slotData)">编辑</el-button>
            </template>
        </table-vue>
    </div>
</template>

<script>
    import  TableVue from '../../components/TableVue/TableVue'
    import SelectVue from '../../components/SelectVue/SelectVue'
  export default {
    name: "index",
    data(){
      return{
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
          { name: "发起人", key: "name" },
          { name: "维修师傅", key: "repairerId", type: "select", options: [] },
          { name: "楼号", key: "floorId", type: "select", options: [ ] },
          { name: "宿舍", key: "roomId", type: "select", options: [] }
        ],
        tableData:[ {
          title: '2016-05-02',
          name: '王小虎',
          phone:'16545489784',
          address: '上海市普陀区金沙江路 1518 弄',
          role:'管理员',
          status:false

        }, {
          title: '2016-05-02',
          name: '王小虎',
          phone:'16545489784',
          address: '上海市普陀区金沙江路 1518 弄',
          role:'管理员',
          status:false

        },
          {
            title: '2016-05-02',
            name: '王小虎',
            phone:'16545489784',
            address: '上海市普陀区金沙江路 1518 弄',
            role:'管理员',
            status:false

          },{
            title: '2016-05-02',
            name: '王大虎',
            phone:'16545489784',
            address: '上海市普陀区金沙江路 1518 弄',
            role:'管理员',
            status:false

          },
          {
            title: '2016-05-02',
            name: '王小虎',
            phone:'16545489784',
            address: '上海市普陀区金沙江路 1518 弄',
            role:'管理员',
            status:false

          },



        ]
      }
    },
    components:{
      TableVue,
      SelectVue
    },
    methods:{
      findRepair(data){
        console.log(data)
      },
      DeleteItem(row){
        console.log('row',row)
      }
    }
  }
</script>

<style scoped lang='less'>

</style>
