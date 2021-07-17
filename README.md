# vue-ys-ui-library

# 开发说明
```
npm clone https://github.com/azqasxws/vue-ys-ui-library.git
```
```
npm install
```

### 打包命令
```
npm run build
```

### 发布到npm
```
npm publish
```

### 使用方法
```
npm i vue-ys-ui-library
```
mian.js文件引入
```
import YsSelect from 'vue-ys-ui-library'
Vue.use(YsSelect)
```
<ys-select :selectValue="selectValue" :selectOptions="forms" multiple></ys-select>
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