<template>
    <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6" v-if="init.province">
                <el-select v-model="provinceValue" @change="handlerProvince">
                    <el-option v-for="item in provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.city" ref="city">
                <el-select v-model="cityValue" @change="handlerCity">
                    <el-option v-for="item in cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.area">
                <el-select v-model="areaValue" @change="handlerArea">
                    <el-option v-for="item in areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.street">
                <el-select v-model="streetValue" @change="handlerStreet">
                    <el-option v-for="item in streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import RegionMixin from '../../mixin/RegionSelect'
  export default {
    name: "RegionSelect",
    data(){
      return{
        init:{
          province:false,
          city:false,
          area:false,
          street:false,
        }
      }
    },
    mixins:[RegionMixin],
    props: {
      cityPickerLevel: {
        type: Array,
        default: () => []
      },
      cityPickerData: {
        type: Object,
        default: () => {}
      }
    },

    created(){
      this.initPicker()
    },
    methods:{
      initPicker(){
        if(this.cityPickerLevel.length){
          this.cityPickerLevel.forEach( item => { this.init[item] = true })
        }else{
          for(let key in this.init){
            this.init[key] = true
          }
        }
      }

    }
  }
</script>

<style scoped lang='less'>

</style>
