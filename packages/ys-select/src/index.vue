  
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
      :value="item[selectOptions.valueKey]"
      :label="item[selectOptions.labelKey]">
    </el-option>
  </el-select>
</template>
<script>
import Vue from 'vue'
import props from './props'
import fun from './untils'
export default {
  name:'YsSelect',
  props,
  data(){
    console.log(this.$props)
    let optionsArr = JSON.parse(JSON.stringify(this.selectOptions.option)); // 获取下拉所有数据方便做操作
    return {
        selectOldvalue: this.selectValue, // vue不允许修改父组件prpos传参，需要重新赋值定义
        rangeNumber: 50,
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
    // 筛选方法
    filterMethod:fun._debounce(function(filterVal){
      let selectListArr = [] 
      let isArray = Array.isArray(this.selectOldvalue)
      if(filterVal){
        let filterArr = this.optionsArr.filter((item)=>{
          return item.label.toLowerCase().includes(filterVal.toLowerCase())
        })
        // 判断是否渲染值为数组还是其他类型判断是否多选
        if (isArray) {
          if (this.selectOldvalue.length > 0) {
            selectListArr = this.getSelectList(this.selectOldvalue, this.optionsArr, this.selectOptions.valueKey);
            this.resOptions = fun.unique(selectListArr.concat(filterArr),this.selectOptions.valueKey);
            console.log(this.resOptions);
          } else {
            this.resOptions = filterArr;
            console.log(this.resOptions);
          }
        } else {
          this.optionsArr.forEach(item => {
            if (this.selectOldvalue === item[this.selectOptions.valueKey])
            selectListArr.push(item)
          })
          selectListArr = this.getSelectList([this.selectOldvalue], this.optionsArr, this.selectOptions.valueKey);
          this.resOptions = fun.unique(selectListArr.concat(filterArr),this.selectOptions.valueKey);
          console.log(this.resOptions);
        }
        // this.resOptions = filterArr;
      } else {
        // 搜索条件为空判断是否为多选还是单选，做好数据渲染
        if (isArray) {
          if (this.selectOldvalue.length > 0) {
            selectListArr = this.getSelectList(this.selectOldvalue, this.optionsArr, this.selectOptions.valueKey);
            this.resOptions = fun.unique(selectListArr.concat(this.optionsArr),this.selectOptions.valueKey);
            console.log(this.resOptions);
          }
        } else {
          this.optionsArr.forEach(item => {
            if (this.selectOldvalue === item[this.selectOptions.valueKey])
            selectListArr.push(item)
          })
          selectListArr = this.getSelectList([this.selectOldvalue], this.optionsArr, this.selectOptions.valueKey);
          this.resOptions = fun.unique(selectListArr.concat(this.optionsArr),this.selectOptions.valueKey);
        }
      }
    },200),
    // 下拉框出现时，调用过滤方法
    visibleChange(flag){
      if(flag){
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
    getListInit() {
      this.resOptions = this.optionsArr.slice(0, this.rangeNumber)
    }
  },
  created() {
    this.getListInit()
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