  
<template>
  <el-select 
    class="ys-select"
    v-model="selectOldvalue" 
    :filter-method="filterMethod"
    @visible-change="visibleChange"
    v-el-select-loadmore="loadMore(rangeNumber)"
    v-bind="$attrs"
    v-on="$listeners">
    <el-option v-for="(item,index) in resOptions.slice(0, rangeNumber)"
      :key="index+'-'+'YS'"
      :value="item[selectOptions.valueKey || 'value']"
      :label="item[selectOptions.labelKey || 'label']">
    </el-option>
  </el-select>
</template>
<script>
import Vue from 'vue'
import fun from './utils'
export default {
  name:'YsSelect',
  model: {
    prop: 'value', //绑定的值，通过父组件传递
    event: 'update', //自定义名
  },
  props: {
    selectOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    optionList: {
      type: Array,
      default: () => {
        return []
      }
    },
    initNum: {
      type: Number,
      default: 50
    }
  },
  data(){
    let optionsArr = [...this.optionList]; // 获取下拉所有数据方便做操作
    let initValue = this.$attrs.value // 获取初始化值
    return {
        selectOldvalue: initValue,
        rangeNumber: 100,
        resOptions: [],
        optionsArr: optionsArr
    }
  },
  methods: {
    loadMore(n) {
      // n是默认初始展示的条数会在渲染的时候就可以获取,具体可以打log查看
      // elementui下拉超过7条才会出滚动条,如果初始不出滚动条无法触发loadMore方法
      return () => (this.rangeNumber += 50); // 每次滚动到底部可以新增条数  可自定义
    },
    // 筛选方法 包含初始化有数据和无数据的处理
    filterMethod:fun._debounce(function(filterVal){
      console.log(filterVal)
      let selectListArr = [] 
      let isArray = Array.isArray(this.selectOldvalue) // 判断是多选还是单选
      let finalList = [];
      finalList = !!filterVal ? this.getfilterArr(filterVal) : this.optionsArr; // 判断是否有筛选条件选定赋值数组
      if (isArray) { // 判断是否多选
        if (this.selectOldvalue.length > 0) {
          selectListArr = this.getSelectList(this.selectOldvalue, this.optionsArr, this.selectOptions.valueKey);
          this.resOptions = fun.unique([...selectListArr,...finalList],this.selectOptions.valueKey);
        } else {
          this.resOptions = !!filterVal ? this.getfilterArr(filterVal) : this.optionsArr.slice(0, this.rangeNumber);
        }
      } else {
        this.optionsArr.forEach(item => {
          if (this.selectOldvalue === item[this.selectOptions.valueKey])
          selectListArr.push(item)
        })
        selectListArr = this.getSelectList([this.selectOldvalue], this.optionsArr, this.selectOptions.valueKey);
        this.resOptions = fun.unique([...selectListArr,...finalList],this.selectOptions.valueKey);
      }
    },50),
    // 获取搜索数据
    getfilterArr(filterVal) {
      let filterArr = this.optionsArr.filter((item)=>{
        return item[this.selectOptions.labelKey || 'label'].toLowerCase().includes(filterVal.toLowerCase())
      })
      return filterArr
    },
    // 下拉框出现时，调用过滤方法
    visibleChange(flag){
      if(flag){
        this.resOptions = []; // 每次打开初始化清空，避免出现数据改变后出现闪屏
        this.filterMethod()
      }
    },
    // 获取已选中的数据集合
    getSelectList(valArr, allArr, key) {
      let selectListArr = [];
      for (var i =0,lth =  valArr.length; i < lth; i++) {
        allArr.forEach(item => {
          if (valArr[i] === item[key])
          selectListArr.push(item)
        })
      }
      return selectListArr;
    },
    // 初始化判断是否有初始值
    getListInit() {
      let initValue = this.$attrs.value
      let isArray = Array.isArray(initValue);
      if ((isArray && initValue.length > 0) || (!isArray && initValue!== '')) return this.filterMethod();
      this.resOptions = this.optionsArr.slice(0, this.rangeNumber)
    }
  },
  created() {
    this.getListInit()
  },
  watch: {
    optionList: {
      handler (newValue, oldValue) {
        this.optionsArr = [...newValue]
        this.getListInit();
      },
      deep: true // 默认值是 false，代表是否深度监听
    },
    selectOldvalue (newValue, oldValue){
      this.$emit('update', newValue);
    }
  },
  directives:{
    'el-select-loadmore':(el, binding) => {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
      if(SELECTWRAP_DOM){
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,
           *  常用于:计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) binding.value();
        });
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>