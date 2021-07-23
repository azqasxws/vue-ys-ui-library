# 项目名称： vue-ys-ui-library(vue + element-ui 二次封装)

# 项目背景
满足公司多个项目不同前端开发通用的组件库，减少代码量

### 使用方法
```
npm i vue-ys-ui-library
```
mian.js文件引入
```js
import YsSelect from 'vue-ys-ui-library'
import YsTablePagination from 'vue-ys-ui-library'
import YsButton from 'vue-ys-ui-library'
Vue.use(YsSelect)
Vue.use(YsTablePagination)
Vue.use(YsButton)
```

# 组件介绍
# 1.YsSelect下拉选择器
使用继承element-ui组件select的所有props和函数，想详情可见https://element.eleme.cn/#/zh-CN/component/select
```vue
<template>
  <ys-select :selectValue="selectValue" :selectOptions="forms" multiple></ys-select>
</template>
<script>
export default {
  data() {
    return {
      selectValue: '', // 根据multiple字段初始化为String,Number,Array
      forms: {
        option: [], // 初始化下拉数据源
        valueKey: 'id', // 绑定初始为id，可以修改成需要传递的值
        labelKey: 'label' // 绑定初始为label，可以修改成需要展示的label值
      }
    }
  }
}
</script>
```

# 2.YsTablePagination表格和页码封装组件
使用继承element-ui组件table的所有props和函数，想详情可见https://element.eleme.cn/#/zh-CN/component/table
```vue
<template>
  <ys-table-pagination
    ref="tablePagination"
    border
    v-loading="loading"
    :columns="columns"
    :isSelection="isSelection"
    :http-api="httpApi"
    :search-form="searchForm"
    :autoQuery="autoQuery">
    <template v-slot:handle="slot">
      <el-button type="primary" size="mini" @click="handleUpdate(slot.scope.row, slot.scope.$index)">
          修改
      </el-button>
      <el-button type="danger" size="mini" @click="handleDelete(slot.scope.row, slot.scope.$index)">
          清空
      </el-button>
    </template>
  </ys-table-pagination>
</template>
<script>
export default {
  data() {
    return {
      isSelection: true, // 是否出现多选框
      searchForm: {}, // 查询条件
      httpApi: function(){}, // 请求接口查询的方法，可传入封装好的axios方法
      columns: Object.freeze([
        {
          prop: 'mobile', // 列表绑定字段
          label: '电话', // 表头文案
          width: '110', // 可设置宽度
          'show-overflow-tooltip': true,
          id: 2
        },
        {
          prop: 'sex', // 列表绑定字段
          label: '性别', // 表头文案
          'show-overflow-tooltip': true,
          render: scope => { // 自定义返回数据展示
            const { sex } = scope.row
            return sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
          },
          id: 3
        },
        {
          slot: 'handle', // 操作栏插槽判断值
          label: '操作',
          width: '230',
          align: 'center',
          id: 4
        }
      ]),
      autoQuery: false // 是否自动查询数据
    }
  },
  methods: {
    handleUpdate(row,index) {
      console.log(row,index)
    },
    handleDelete(row, index) {
      console.log(row,index)
    },
  }
}
</script>

```
