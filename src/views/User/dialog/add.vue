<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="800px" @opened="openDialog">
        <el-form :model="form" :rules="rules" ref="addInfoForm">
            <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入6~20数字+字母"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="formLabelWidth" prop="truename">
                <el-input v-model="form.truename" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
                <el-input v-model.number="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="地区：" :label-width="formLabelWidth" prop="region">
                <RegionSelect :cityPickerData.sync="cityPickerData" />
            </el-form-item>
            <el-form-item label="是否启用：" :label-width="formLabelWidth" prop="status">
                <el-radio v-model="form.status" label="1">禁用</el-radio>
                <el-radio v-model="form.status" label="2">启用</el-radio>
            </el-form-item>
            <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
                <el-checkbox-group v-model="form.role">

                    <el-checkbox label="信息管理"></el-checkbox>
                    <el-checkbox label="用户信息"></el-checkbox>

<!--                    <el-checkbox v-for="item in roleItem" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>-->
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="按钮：" :label-width="formLabelWidth">
                <template v-if="btnPerm.length > 0">
                    <div v-for="item in btnPerm" :key="item.id">
                        <h4>{{ item.name }}</h4>
                        <template v-if="item.perm && item.perm.length > 0">
                            <el-checkbox-group v-model="form.btnPerm">
                                <el-checkbox v-for="buttons in item.perm" :key="buttons.value" :label="buttons.value">{{ buttons.name }}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </div>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="submitLoading" @click="submit('addInfoForm')">确定</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import RegionSelect from '@c/RegionSelect/RegionSelect'
    import { validateEmail ,validatePass,stripscript} from '../../../utils/validate'
  export default {
    name: "add",
    data(){
      // 验证用户名
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        /**
         * 业务逻辑
         * 1、编辑状态：
         *    需要检验：data.form.id存在并且，密码不为空时
         *    不需要检验：data.form.id存在并且，密码为空时
         *
         * 2、添加状态
         *    需要检验：data.form.id不存在
         */
        if(this.form.id && !value) {
          callback();
        }
        if((this.form.id && value) || !this.form.id) {
          // 过滤后的数据
          if(value) {
            this.form.password = stripscript(value);
            value = this.form.password;
          }
          if (value === '') {
            callback(new Error("请输入密码"));
          } else if (validatePass(value)) {
            callback(new Error("密码为6至20位数字+字母"));
          } else {
            callback();
          }
        }
      };
      return{
        form:{
          username: "",
          truename: "",
          password: "",
          phone: "",
          region: "",
          status: "2",
          role: [],
          btnPerm: []
        },
        btnPerm:[{name:'aaaa'}],
        submitLoading:false,
        roleItem:[] ,//角色列表
        cityPickerData:{},
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          role: [
            { required: true, message: "请选择角色", trigger: 'change' }
          ]
        },
        dialog_info_flag:false,
        formLabelWidth:'120px',
      }
    },
    props:{
      flag:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      flag(value){
        this.dialog_info_flag = value
      }
    },
    components:{
      RegionSelect
    },
    methods:{
      openDialog(){},
      submit(name){
        console.log(name)
      },
      close(){
        this.$emit('update:flag',false)
      }
    }
  }
</script>

<style scoped lang='less'>

</style>
