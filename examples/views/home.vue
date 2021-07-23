<template>
<div>
  <ys-table-pagination ref="tablePagination" border v-loading="loading" :columns="columns" :isSelection="true" @selection-change="selectionChange" :autoQuery="false">
    <template v-slot:handle="slot">
      <el-button type="primary" size="mini" @click="handleUpdate(slot.scope.row, slot.scope.$index)">
          修改
      </el-button>
      <el-button type="danger" size="mini" @click="handleDelete(slot.scope.row, slot.scope.$index)">
          清空
      </el-button>
    </template>
  </ys-table-pagination>
  <ys-select  clearable :selectValue="form.selectValue" @change="selectValueCahgne" filterable :selectOptions="forms" style="width:400px;"></ys-select>
  <ys-button :auto-loading="true" @click="submit">
    自动loading按钮
  </ys-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        // selectValue: '',
      },
      list: [
        { date: '2021/12/12',name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { date: '2021/12/12',name: 'Tony', mobile: '187233xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { date: '2021/12/12',name: 'Tony', mobile: '187233xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { date: '2021/12/12',name: 'Tony', mobile: '187233xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { date: '2021/12/12',name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { date: '2021/12/12',name: 'Tony', mobile: '187233xxxx', sex: 0 }
      ],
      pagination: {
        page: 10,
        limit: 1,
        total: 0
      },
      operates: {},
      columns: Object.freeze([
        {
          prop: 'mobile',
          label: '作者',
          // width: '110',
          'show-overflow-tooltip': true,
          id: 2
        },
        {
          prop: 'sex',
          label: '性别',
          'show-overflow-tooltip': true,
          render: scope => {
            const { sex } = scope.row
            return sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
          },
          id: 3
        },
        {
          slot: 'handle',
          label: '操作',
          width: '230',
          align: 'center',
          id: 4
        }
      ]),
      loading: false,
      forms: {
        valueKey: 'id',
        labelKey: 'label',
        option: []
      }
    }
  },
  methods: {
    clearSelection() {
      this.$refs.tablePagination.clearSelection();
    },
    searchList() {
      this.$refs.tablePagination.handleSearch();
    },
    selectValueCahgne(val) {
      console.log(val)
    },
    submit(done) {
    // 这里供业务组件处理一些事情,比如ajax请求,此处用setTimeout模拟,    执行done()方法消失loading
      setTimeout(() => {
        console.log(this.selectValue)
        done()
      }, 1000)
    },
    handleUpdate(row,index) {
      console.log(row,index)
    },
    handleDelete(row, index) {
      console.log(row,index)
    },
    selectionChange(val) {
      console.log(val)
    }
  },
  created() {
    let arr = [];
    for (var i = 1; i < 1000; i++) {
      arr.push({id: i, label: String(i+'你好')})
    }
    console.log(this.list)
    this.forms.option = arr;
  }
}
</script>