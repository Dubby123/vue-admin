var pageMixin = {
  data(){
    return{
      pageConfig:{
        currentPage:1,
        size:null,
        layout:"total, sizes, prev, pager, next, jumper",
        pageSizes:[10, 20,50, 100],
        total:100
      }
    }
  },
  created: function () {

  },
  methods: {
    handleSizeChange(value){
      console.log('size',value)
    },
    handleCurrentChange(value){
      console.log('page',value)
    },

  }
}
export default pageMixin
