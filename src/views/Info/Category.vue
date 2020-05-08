<template>
    <div class="main">
        <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
        <hr class="hr-e9e9e9" />
        <el-row :gutter="30">
            <el-col :span="8">
                <div class="category-wrap">
                    <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                        <!--一级分类-->
                        <h4>
                            <svg-icon icon-class="plus"></svg-icon>
                            {{ firstItem.category_name }}
                            <div class="button-group">
                                <el-button size="mini" type="danger" @click="editCategory({ data: firstItem, type: 'category_first_edit' })" round>编辑</el-button>
                                <el-button size="mini" type="success" round @click="handlerAddChildren({ data: firstItem, type: 'category_children_add' })">添加子级</el-button>
                                <el-button size="mini" round @click="deleteCategoryComfirm(firstItem.id)">删除</el-button>
                            </div>
                        </h4>
                        <!--子级分类-->
                        <ul v-if="firstItem.children">
                            <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                {{ childrenItem.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round>编辑</el-button>
                                    <el-button size="mini" round>删除</el-button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <h4 class="menu-title">一级分类编辑</h4>
                <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
                    <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first_input">
                        <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_children_input">
                        <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="submit" :loading="submit_button_loading" >确定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { AddFirstCategory ,GetCategoryAll,DeleteCategory} from '../../api/new'
  export default {
    name: "category",
    data(){
      return{
        category:{
          item: [],
          current: ['']
        },
        form:{
          categoryName:'',
          secCategoryName:''
        },
        submitType :'',
        category_first_input:true,
        category_first_disabled:true,
        category_children_input:true,
        category_children_disabled:true,
        submit_button_loading:false,
        submit_button_disabled:true
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        this.$store.dispatch('category/GET_CATEGORYLIST').then(res=>{
          this.category.item = res
        })
      },
      addFirst(params){
      this.submitType = params.type
        this.resetButtom()
      },
      editCategory(params){

        this.submitType = params.type
        this.resetButtom()
        this.form.categoryName = params.data.category_name
      },
      handlerAddChildren(params){
        this.submitType = params.type
        this.resetButtom()
      },
      deleteCategoryComfirm(id){
        this.hint({
          content:'确定删除此一类分级',
          success:this.deleteCategory,
          id:id
        })
      },
      deleteCategory(id){
        DeleteCategory({categoryId:id}).then(res =>{
          console.log(res)
          this.init()
        }).catch( error =>{
          console.log(error)
          })
      },
      resetButtom(){
        if(!this.submitType){
        this.category_first_input = true,
         this.category_first_disabled =true,
         this.category_children_input = true,
         this.category_children_disabled = true,
         this.submit_button_loading = false
        }
        if(this.submitType ==='category_first_add'||this.submitType ==='category_first_edit' ){
          this.category_children_input = false
          this.category_first_disabled = false
          this.category_first_input = true
         this.category_first_disabled =false
        }
        if(this.submitType ==='category_children_add'){
          this.category_first_input = false
          this.category_first_disabled = true
          this.category_children_disabled = false
          this.category_children_input = true

        }
      },
      submit(){
        if(!this.form.categoryName && this.submitType =='category_first_add'){
          this.$message({
            message:'一级分类名称不能为空',
            type: 'error'
          });
          return
        }
        if(!this.form.secCategoryName && this.submitType =='category_children_add'){
          this.$message({
            message:'二级分类名称不能为空',
            type: 'error'
          });
          return
        }
        this.submit_button_loading = true
        AddFirstCategory({ categoryName: this.form.categoryName}).then(res =>{
          console.log(res)
          if(res.data.resCode === 0 ){
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.init()
          }
        }).catch(error=>{
          console.log(error)
        }).finally( ()=>{
          this.$refs.categoryFrom.resetFields();
          this.submit_button_loading = false
          })
      }
    }
  }
</script>

<style scoped lang='scss'>
    @import "../../styles/config.scss";
    .main{
        width: 1800px;
    }
    .category-wrap {
        div:first-child {
            &:before { top: 20px; }
        }
        div:last-child {
            &:before { bottom: 21px; }
        }
    }
    .content{
        display: flex;
        justify-content: space-between;
    }
    .menu-title {
        line-height: 44px;
        padding-left: 22px;
        background-color: #f3f3f3;
    }
    .category {
        position: relative;
        line-height: 44px;
        cursor: pointer;
        &:before {
            content: '';
            position: absolute;
            left: 22px;
            top: 0;
            bottom: 0;
            width: 32px;
            border-left: 1px dotted #000;
        }
        h4 {
            position: relative;
            padding-left: 40px;
        }
        svg {
            position: absolute;
            left: 14px;
            top: 15px;
            background-color: #fff;
            font-size: 17px;
        }
        li {
            position: relative;
            padding-left: 36px;
            margin-left: 24px;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 22px;
                width: 32px;
                height: 1px;
                border-bottom: 1px dotted #000;
            }
        }
        li, h4 {
        @include webkit(transition, all .5s ease 0s);
            &:hover {
                background-color: #f3f3f3;
                .button-group { display: block; }
            }
        }
    }
    .button-group {
        display: none;
        position: absolute;
        z-index: 2;
        right: 11px;
        top: -1px;
        button { font-size: 12px; }
    }
    .from-wrap {
        width: 410px;
        padding-top: 26px;
    }
    .hr-e9e9e9 {
        width: calc(100% + 60px);
        margin-left: -30px;
        border: none;
        margin-top: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #e9e9e9;
    }
</style>
