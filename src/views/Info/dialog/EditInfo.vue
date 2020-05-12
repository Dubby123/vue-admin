<template>
    <div class="dialog_box">
        <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="closeDialog">
            <el-form :model="form" ref='addInfo'>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择活动区域">
                        <el-option v-for="item in category"
                                   :key="item.id"
                                   :label="item.category_name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item >
                     <el-button type="primary" @click="submitAdd">确 定</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import { AddItem } from '../../../api/newInfo'
  export default {
    name: "category",
    data() {
      return {
        form: {
          category:'',
          title: '',
          content: '',
        },
        formLabelWidth: '70px',
        dialogFormVisible: false
      }
    },
    props: {
      flag: {
        type: Boolean,
        required: true
      },
      category: {
        type: Array,
        required: true
      }
    },
    watch: {
      flag(value) {
        this.dialogFormVisible = value
      }
    },
    methods: {
      closeDialog() {
        this.dialogFormVisible = false
        //向父组件传递值，这样父组件可以去处理逻辑性的东西
        // this.$emit('close',this.dialogFormVisible)
        //可以直接修改父组件的值
        this.$emit('update:flag', this.dialogFormVisible)
      },
      submitAdd(){
         AddItem(this.form).then(res=>{
                // this.closeDialog()
                 this.$refs.addInfo.resetFields();
         })
      }
      
    }

  }
</script>

<style scoped lang='scss'>
    .dialog_box {
        width: 600px;
        background-color: red;
    }
</style>
