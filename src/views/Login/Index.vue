<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id"  :class="{current:item.type === model }" @click="toggleMenu(item)">
                    {{ item.txt }}
                </li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
                <el-form-item prop="username" class="item-from">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-from">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-from"  v-if="model==='register'" >
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButtonStatus" >{{ model==='register' ? '注册':'登录'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import {validateEmail,validatePass,validateVCode,} from '../../utils/validate'
  import {Getsms  , Register } from "../../api/login";
  var sha1 = require('sha1');
  export default {
    name: "index",
    data(){
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户邮箱'));
        }
        if(validatePass(value)){
          return callback(new Error('用户邮箱有误，请重新输入'));
        }else{
          return callback();
        }
      };
      var checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        }
        if(validatePass(value)){
          return callback(new Error('请输入大于6位，小于32位的密码'));
        }else{
          return callback();
        }
      };
      var checkPasswords = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          return callback(new Error('两次输入密码不一致!'));
        } else {
          return callback();
        }
      };
      var checkCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }if(validateVCode(value)){
          return callback(new Error('请输入大于6位，小于32位的密码'));
        }else {
          return callback();
        }
      };
      return{
        menuTab:[{ txt:'登录',type: 'login' },{ txt:'注册',type: 'register'}],
        model:'register',
        loginButtonStatus:true,
        timer:0,
        ruleForm: {
          username: '2509137198@qq.com',
          password: '20114180229hd',
          passwords:'',
          code: ''
        },
        codeButtonStatus:
          {
            status: false,
            text: '获取验证码'
       },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: checkPasswords, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        }
      }
    },

    methods:{

      //点击切换
      toggleMenu(item){
        this.model = item.type
        this.resetForm('loginForm')
        this.clearCountDown()
      },
      //获取验证码
      getSms(){
        console.log('this.ruleForm.username',this.ruleForm.username)
          if(this.ruleForm.username== '' ) {
            this.$message.error('邮箱不能为空！！');
            return false;
          }
        if(validateEmail(this.ruleForm.username)) {
          this.$message.error('邮箱格式有误，请重新输入！！');
          return false;
        }
        this.codeButtonStatus.text = '发送中'
        this.codeButtonStatus.status = true
        let resquestData={
          username: this.ruleForm.username,
          module: this.model
        }

        Getsms(resquestData).then(res =>{
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          // 启用登录或注册按钮
          this.loginButtonStatus = false;
          // 调定时器，倒计时
          this.countDown(60);
        }).catch(err=>{
          console.log(err)
        })
      },
      countDown(number){
          if(this.timer) { clearInterval(this.timer); }
          let time = number
          this.timer = setInterval(() => {
            time--;
            if(time === 0) {
              clearInterval(this.timer)
              this.codeButtonStatus.text = '再次获取'
              this.codeButtonStatus.status = false
            }else{
              this.codeButtonStatus.text = `倒计时${time}秒`   // es5 '倒计时' + time + '秒'
            }
          }, 1000)
      },
      //提交数据
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.model ==='register' ?  this.register() :this.login()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearCountDown(){
        this.codeButtonStatus.text = '获取验证码'
        this.codeButtonStatus.status = false
        clearInterval(this.timer)
      },
        // 还原验证码按钮默认状态

      //登录
      //注册
      register(){
        let requestData = {
          username:this.ruleForm.username,
          password: sha1(this.ruleForm.password),
          code:this.ruleForm.code,
          module: 'register'
        }
        Register(requestData).then( res=>{
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          this.toggleMenu('login')
        })
      },
      login() {
        let requestData = {
          username: this.ruleForm.username,
          password: sha1(this.ruleForm.password),
          code: this.ruleForm.code,
          module: 'login'
        }
        this.$store.dispatch('login/GET_USERINFO', requestData).then(res => {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.$router.push({ path: 'console' })
        }).catch(err=>{
          console.log(err)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang='scss'>
    #login {
        height: 100vh;
        background-color: #344a5f;
        padding-top: 250px;
    }
    .login-wrap {
        width: 330px;
        margin:0 auto ;
    }
    .menu-tab {
        text-align: center;
        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }
        .current {
            background-color: rgba(0, 0, 0, .1);
        }
    }
    .login-form {
        margin-top: 29px;
        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }
        .item-from { margin-bottom: 13px; }
        .block {
            display: block;
            width: 100%;
        }
        .login-btn { margin-top: 19px; }
    }

</style>
