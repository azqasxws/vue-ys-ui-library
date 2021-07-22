# vue-ys-ui-library

# 项目名称： vue + element-ui 二次封装

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
```
```vue
<ys-select :selectValue="selectValue" :selectOptions="forms" multiple></ys-select>
```
```js
data() {
  return {
    forms: {
      valueKey: 'id',
      labelKey: 'label',
      options: []
    },
    selectValue: []
  }
}
```