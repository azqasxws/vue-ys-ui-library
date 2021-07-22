// import SearchTablePagination  from './search-table-pagination '
import YsSelect from './ys-select'
import YsButton from './ys-button'
import YsTablePagination from './ys-table-pagination'
export default {
    install(Vue) {
        Vue.use(YsButton);
        Vue.use(YsSelect);
        Vue.use(YsTablePagination)
    }
}