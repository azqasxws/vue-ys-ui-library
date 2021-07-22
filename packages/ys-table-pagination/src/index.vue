  
<template>
  <div class="ys-table-pagination">
    <el-table
      class="ys-table"
      v-bind="$attrs"
      v-on="$listeners"
      :data="tableData"
      ref="tablePagination"
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
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="pageSize"
      :total="total"
      background
      class="system-pagination"
      layout="prev, pager, next,sizes,jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination> 
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name:'YsTablePagination',
  props: {
    // 传入查询的方法
    httpApi: {
      type: Function,
      default: () => {}
    },
    // 表格渲染配置的参数
    columns: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: true
    },
    sizeChange: {
      type: Function,
      default: () => {}
    },
    pageChange: {
      type: Function,
      default: () => {}
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    // 传入查询的参数
    searchForm: {
      tupe: Object,
      default: () => {
        return {}
      }
    },
    autoQuery: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      pageSizes: [10, 20, 30, 40, 50, 100],
      tableData: [],
      loading: false
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
  mounted() {
    this.autoQuery && this.fetchList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchList()
    },
    async fetchList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.loading = true
      const res = await this.httpApi({ ...params, ...this.searchForm })
      this.loading = false
      if (res.code !== 200) return
      const { list, total, records } = res.result
      this.tableData = list || records || []
      this.total = Number(total)
      this.$emit('list-data', this.tableData)
      this.$nextTick(() => {
        this.$refs.tablePagination && this.$refs.tablePagination.doLayout()
      })
    },
    handleSearch(page) {
      if (page) {
        this.currentPage = page
      }
      this.fetchList()
    }
  },
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>