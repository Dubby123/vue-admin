import { getCityPicker } from '../api/user'

let RegionMixin = {
    data() {
      return {
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: "",
        provinceData: [],
        cityData: [],
        areaData: [],
        streetData: []
      }
    },
    created() {
      this.initCityPicker()
    },

    computed: {
    address() {
      const { provinceValue, cityValue, areaValue, streetValue } = this
      return {
        provinceValue,
        cityValue,
        areaValue,
        streetValue
      }
    }
  },
  watch: {
    address: {
      handler(val) {
        this.$emit('update:cityPickerData',val)
      },
      deep: true
    }
},
methods: {
  initCityPicker()
  {
    let paramsData = { type: "province", }
    this.handleCityPicker(paramsData)
  }
,
  handlerProvince(value)
  {
    let paramsData = {
      type: "city",
      province_code: value
    }
    this.handleCityPicker(paramsData)
  }
,
  handlerCity(value)
  {
    let paramsData = {
      type: "area",
      city_code: value
    }
    this.handleCityPicker(paramsData)
  }
,
  handlerArea(value)
  {
    let paramsData = {
      type: "street",
      area_code: value
    }
    this.handleCityPicker(paramsData)
  }
,
  handlerStreet(value)
  {
    let paramsData = {
      type: "street",
      area_code: value
    }
    this.handleCityPicker(paramsData)
  }
,
  handleCityPicker(resquestData)
  {
    getCityPicker(resquestData).then(res => {
      this[`${resquestData.type}Data`] = res.data.data.data
    })
  }
}
}
export default RegionMixin
