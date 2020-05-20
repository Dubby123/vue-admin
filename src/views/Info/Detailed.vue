<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="信息分类：">
            <el-select v-model="form.categoryId">
                <el-option v-for="item in category" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="新闻标题：">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="缩略图：">

            <UploadImg :imgUrl.sync="form.imgUrl"  />
        </el-form-item>

        <el-form-item label="发布日期：">
            <el-date-picker v-model="form.createDate" type="date" placeholder="选择日期" disabled></el-date-picker>
        </el-form-item>

        <el-form-item label="详细内容：">
            <quill-editor ref="myTextEditor"
                          v-model="form.content"
                          :config="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" :loading="submitLoading">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import  UploadImg  from '../../components/UploadImg/UploadImg'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    name: "detailed",
    data(){
      return{
        form:{
          categoryId:'',
          title:'',
          imgUrl:'',
          createDate:'',
          content:''
        },
        submitLoading:false,
        uploadImgConfig:'',
        category:[],
        editorOption:{

        }
      }
    },
    components:{
      quillEditor,
      UploadImg
    },
    methods:{
      onEditorBlur(){},
      onEditorFocus(){},
      onEditorReady(){},
      submit(){}
    }
  }
</script>

<style scoped lang='less'>


</style>
