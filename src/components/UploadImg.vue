<template>
                <el-upload
                        class="avatar-uploader"
                        action="http://up-z2.qiniup.com"
                        :show-file-list="false"
                        :data="uploadKey"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
</template>

<script>
    import { GetOtherToKen } from '../api/common'
  export default {
    name: "UploadImg",
    data() {
      return {
        imageUrl: '',
        uploadImgConfig :{
          accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
          secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
          buckety: "webjshtml"
        },
        uploadKey: {
          token: "",
          key: ""
        },
      };
    },
    props:{
      imgUrl:{
        type:String,
        default:''
      }
    },
    watch:{
      imgUrl(value){
        this.imageUrl = value
      }
    },
    created(){
      this.handleToken()
    },
    methods: {
      handleToken(){
        GetOtherToKen(this.uploadImgConfig).then(res=>{
          this.uploadKey.token =  res.data.data.token
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit("update:imageUrl",this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // 文件名转码
        let suffix = file.name;
        let key = encodeURI(`${suffix}`);
        this.uploadKey.key = key;
        return isJPG && isLt2M;
      }
    }

  }
</script>

<style scoped lang='scss'>
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9 ;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
