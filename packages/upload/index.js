import upLoad from './src/index.vue';
upLoad.install = function(Vue) {
    Vue.component(upLoad.name, upLoad);
};
export default upLoad;