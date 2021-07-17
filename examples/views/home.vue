<template>
<div>
  <!-- <el-search-table-pagination
    type="local"
    :data="tableData"
    :page-sizes="[10, 20]"
    :columns="columns"
    :form-options="formOptions">
  </el-search-table-pagination> -->
  <ys-select  multiple :selectValue="selectValue" @change="selectValueCahgne" filterable :selectOptions="forms" style="width:400px;"></ys-select>
  <!-- <ys-button :auto-loading="true" @click="submit">
    自动loading按钮
  </ys-button> -->
</div>
</template>
<script>
export default {
  data() {
    return {
      formOptions: {
        inline: true,
        submitBtnText: '搜索',
        forms: [
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' },
          { prop: 'sex', label: 'Sex', itemType: 'select',
            options: [
              { value: '', label: 'All' },
              { value: 0, label: 'Male' },
              { value: 1, label: 'Female' }
            ]
          }
        ]
      },
      columns: [
        { prop: 'name', label: '名字', width: 140 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'mobile', label: '电话', minWidth: 180 },
        { prop: 'sex', label: '型号', width: 100,
          render: row => {
          const { sex } = row
          return sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
          }
        }
      ],
      tableData: [
        { name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { name: 'Tony', mobile: '187233xxxx', sex: 0 },
        { name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { name: 'Tony', mobile: '187233xxxx', sex: 0 },
        { name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { name: 'Tony', mobile: '187233xxxx', sex: 0 },
        { name: 'Sam', mobile: '15299xxxx', sex: 0 },
        { name: 'Jean', mobile: '13452xxxx', sex: 1 },
        { name: 'Tony', mobile: '187233xxxx', sex: 0 }
      ],
      // 下拉组件
      option: [
        { value: 'Sam233333333333333333333333', label: '15299xxxx', sex: 0 },
        { value: 'SANm', label: '4233333333333332333333333333333333333333333333333333333333333', sex: 0 },
        { value: '3', label: '5232', sex: 0 },
      ],
      selectValue: [],
      forms: { 
        valueKey: 'id', labelKey: 'label', 
        options: []
      }
        
    }
  },
  methods: {
    selectValueCahgne(val) {
      console.log(val)
    },
    submit(done) {
    // 这里供业务组件处理一些事情,比如ajax请求,此处用setTimeout模拟,    执行done()方法消失loading
      setTimeout(() => {
        done()
      }, 1000)
    }
  },
  created() {
    let arr = [];
    for (var i = 1; i < 1000; i++) {
      arr.push({id: i, label: String(i+'你好')})
    }
    this.forms.option = arr;
  }
}
</script>