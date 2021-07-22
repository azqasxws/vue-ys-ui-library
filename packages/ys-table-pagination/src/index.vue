  
<template>
  <div class="ys-table-pagination">
    <el-table
      class="ys-table"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-table-column 
        type="selection"
        width='50'
        align='center'
        v-if="isSelection"
      ></el-table-column>
      <el-table-column 
        v-for="item in normalColumns"
        :key="item.id"
        :align="item.align || 'center'"
        v-bind="item"
        :show-overflow-tooltip="true">
        <template slot-scope="scope" v-if="item.type !== 'selection'">
          <span v-if="!item.render">{{scope.row[item.prop]}}</span>
          <span v-else-if="item.render"> {{item.render(scope)}}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column 
        v-for="item in slotColumns"
        :key="item.id"
        :label="item.label"
        :align="item.align || 'center'"
        v-bind="item.attrs">    
        <template slot-scope="scope">
          <slot :scope="scope":name="item.slot"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      :current-page="pagination.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagination.limit"
      :total="pagination.total"
      background
      class="system-pagination"
      layout="prev, pager, next,sizes,jumper"
      @size-change="sizeChange"
      @current-change="pageChange">
    </el-pagination> 
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name:'YsTablePagination',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: [Object, Boolean],
      default: () => {}
    },
    sizeChange: {
      type: Function,
      default: () => {}
    },
    pageChange: {
      type: Function,
      default: () => {}
    },
    theme: {
      type: String,
      default: 'light'
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    isSelection: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 获取普通的columns数据
    normalColumns() {
      return this.columns.filter(item => !item.slot) 
    },
    // 获取是插槽的columns数据
    slotColumns() {
      return this.columns.filter(item => item.slot === 'handle') 
    }
  },
  data() {
    console.log(this.$props)
    return {}
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>