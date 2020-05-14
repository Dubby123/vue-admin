<template>
    <el-row>
        <el-col :span="20">
            <el-form class="search-form"  ref="form"  :inline="true"   @submit="search">
                <el-form-item :label="item.name" v-for="(item, index) of items" :key="index">
                    <el-input v-model="searchParams[item.key]" v-if="!item.type || item.type === 'input'" :placeholder="item.placeholder || '请输入'"/>
                    <el-select allowClear v-model="searchParams[item.key]" v-else-if="item.type === 'select'" :placeholder="item.placeholder || '请选择'">
                        <el-option
                                :key="index"
                                v-for="(option, index) of item.options"
                                :value="option[item.optionValuekey || 'id']"
                        >{{option[item.optionNamekey || 'name']}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" html-type="submit" @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="4" class="text-right">
            <slot name="right-content"></slot>
        </el-col>
    </el-row>
</template>
<script>
  import { deepClone } from "@/utils/app";
  export default {
    model: {
      prop: 'searchParams',
      event: "change"
    },
    props: {
      searchParams: {
        type: Object,
        default: () => {
          return {};
        }
      },
      items: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        initSearchParams:{},
      };
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        // 保存初始值的
        this.initSearchParams = deepClone(this.searchParams)
      },
      search() {
        const cpValue = deepClone(this.searchParams)
        this.$emit("change", cpValue);
        this.$emit("search", cpValue);
      },
      reset() {
        const cpValue = deepClone(this.initSearchParams)
        this.$emit("change", cpValue);
        this.$emit("reset", cpValue);
      }
    }
  };
</script>
<style lang="scss" scoped>
    .search-form {
        /*<!--@extend .offset-bottom-24;-->*/
        /*<!--.ant-form-item {-->*/
        /*<!--    &.button {-->*/
        /*<!--        margin-right: 0;-->*/
        /*<!--        white-space: nowrap;-->*/
        /*<!--    }-->*/
        /*<!--    .ant-input {-->*/
        /*<!--        width: 120px;-->*/
        /*<!--    }-->*/
        /*<!--    .ant-select {-->*/
        /*<!--        min-width: 120px;-->*/
        /*<!--    }-->*/
        /*<!--    .ant-btn + .ant-btn {-->*/
        /*<!--        @extend .offset-left-12;-->*/
        /*<!--    }-->*/
        /*<!--}-->*/
    }
</style>
