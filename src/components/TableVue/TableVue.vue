<template>
    <div>
        <el-table
                :data="tableData"
                border
                @selection-change="handleSelectionChange"
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

        <div class="foot">
            <template>
                <slot class="left" name="tableFoot"></slot>
            </template>
            <el-pagination
                    class="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=pageConfig.currentPage
                    :page-sizes=pageConfig.pageSizes
                    :page-size=pageConfig.size
                    :layout=pageConfig.layout
                    :total= pageConfig.total
                   >
            </el-pagination>
        </div>
    </div>

</template>

<script>

  import  tableMixin  from '../../mixin/TableMixin'
  import pageMixin from '../../mixin/pageMixin'
  export default {
    name: "TableVue",
    mixins:[tableMixin,pageMixin],
    data(){
      return{
        subTableData:{},
      }
    },
    props:{
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

    },
    methods:{
      handleSelectionChange(value){
        const ids = value.map(item => item.id)
        this.$emit('selected',ids)
      },
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

<style scoped lang='scss'>
    .foot{
        margin-top: 30px;
        .left{
            float: left;
        }
        .right{
            float: right;
        }
    }

</style>
