import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import { Select, Option, Tree , Table, Form, Input,FormItem, Button,TableColumn, Loading,Pagination, DatePicker} from 'element-ui';
import YsSelect from '@/ys-select'
import YsTablePagination from '@/ys-table-pagination'
import Ysbutton from '@/ys-button'
Vue.use(Select);
Vue.use(Option);
Vue.use(Tree);
Vue.use(Table);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Loading);
Vue.use(Pagination);
Vue.use(YsSelect);
Vue.use(YsTablePagination);
Vue.use(Ysbutton);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
