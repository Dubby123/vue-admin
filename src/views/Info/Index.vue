<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="5">
                <div class="label-wrap category">
                    <div class="label">分类：</div>
                    <div class="warp-content">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.category_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <div class="label">日期：&nbsp;&nbsp;</div>
                    <div class="warp-content">
                        <el-date-picker
                                style="width: 100%;"
                                v-model="date_value"
                                type="datetimerange"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['12:00:00', '08:00:00']"
                        ></el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap key-work">
                    <div class="label">关键字：&nbsp;&nbsp;</div>
                    <div class="warp-content">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%;" @click="getList">搜索</el-button>
            </el-col>
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2">
                <el-button
                        type="danger"
                        class="pull-right"
                        style="width: 100%;"
                        @click="dialog_info = true"
                >新增
                </el-button>
            </el-col>
        </el-row>
        <!-- 表格数据 -->
        <el-table
                :data="table_data"
                border
                @selection-change="handleSelectionChange"
                style="width: 100% ; margin-top: 30px;margin-bottom:30px"
        >
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="title" label="标题" width="750"></el-table-column>
            <el-table-column prop="categoryId" label="类型" width="130"></el-table-column>
            <el-table-column prop="createDate" label="日期" width="237"></el-table-column>
            <el-table-column prop="user" label="管理员" width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                    <el-button type="success" size="mini" @click="editInfo(scope.row.id)">编辑</el-button>

                    <el-button type="success" size="mini" @click="detailed(scope.row)">编辑详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--底部分页-->
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteAll()">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                        class="pull-right"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                ></el-pagination>
            </el-col>
        </el-row>

        <!--新增弹窗-->
        <DialogInfo :flag.sync="dialog_info"  :category = "options"/>
        <!--修必弹窗-->
        <!-- <DialogEditInfo :flag.sync="dialog_info_edit" :id="infoId" :category="options.category" @getListEmit="getList" /> -->
    </div>
</template>

<script>
  import { GetList } from '../../api/newInfo'
  import DialogInfo from './dialog/EditInfo'
  export default {
    name: "index",
    data() {
      return {
        category_value: "",
        date_value: "",
        search_keyWork: "",
        value: "",
        option: [],
        options: [],
        total: 0,
        dialog_info: false,
        table_data: [],
        info: {
          categoryId: '',
          startTime: '',
          endTime: '',
          title: '',
          id:'' ,
          pageNumber: 1,
          pageSize: 10
        }
      }
    },
    components: {
      DialogInfo
    },
    created() {
      this.getOption()
      this.getList()
    },
    methods: {
      getOption() {
        this.$store.dispatch('category/GET_CATEGORYLIST').then(res=>{
          this.options = res
        })
      },
      getList() {
        GetList(this.info).then(res => {
          let Response = res.data.data
          this.table_data = Response.data
          this.total = Response.total
        })
      },
      handleSizeChange(val) {
        this.info.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.info.pageNumber = val
        this.getList()
      },
      deleteItem(id) {
        this.hint({
          content: '确定删除此项吗？',
          success: this.confirmDelete,
          id: id
        })
      },
      confirmDelete(value) {
        console.log(value || 0)
      },
      editInfo() {
      },
      detailed(row) {
        this.$router.push({path:'InfoDetail',query:{id:row.id}})

      },
      handleSelectionChange() {
      },
      deleteAll(ids) {
        this.hint({
          content: '全部删除所选项, 是否继续?',
          success: this.confirmDelete,
          id: ids
        })
      }
    },
  };
</script>

<style scoped lang='scss'>
    @import "../../styles/config.scss";

    .label-wrap {
        &.category {
            @include labelDom(left, 60, 40);
        }

        &.date {
            @include labelDom(right, 93, 40);
        }

        &.key-work {
            @include labelDom(right, 99, 40);
        }
    }
</style>
