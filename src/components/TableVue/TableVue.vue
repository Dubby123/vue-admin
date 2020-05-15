<template>
    <el-table
            :data="tableData"
            border
            style="width:100%">
        <el-table-column
                v-if="configTable.selection"
                type="selection"
                width="55"
        >
        </el-table-column>
        <template  v-for="item in configTable.tHead"  >
            <el-table-column
                    v-if="item.columnType ==='slot'"
                    :key="item.field"
                    :prop="item.field"
                    :label="item.label"
                    :width="item.width">
                <template slot-scope="scope">
                    <slot :name="item.slotName" :slotData="scope.row"></slot>
                </template>
            </el-table-column>
            <el-table-column
             v-else
            :key="item.field"
            :prop="item.field"
            :label="item.label"
            :width="item.width">
            </el-table-column>
        </template>
    </el-table>
</template>

<script>
    import { handleTableData } from './TableData'
  export default {
    name: "TableVue",
    data(){
      return{
        subTableData:{},
      }
    },
    props:{
      tableData:{
        type:Array,
        default:()=>[]
      },
      configTable:{
        type:Object,
        default:()=>{}
      },
      requestParams:{
        type:Object,
        default:()=>{}
      }
    },
    created() {
      this.copyConfig()
      handleTableData(this.requestParams)
    },
    methods:{
      copyConfig(){
        const keys = Object.keys(this.configTable)
        for( let key in this.configTable){
          if( keys.includes(key))
          this.subTableData[key] = this.configTable[key]
        }
      }
    }
  }
</script>

<style scoped lang='less'>

</style>
