import YsButton from './src/index.vue';
YsButton.install = function(Vue) {
    Vue.component(YsButton.name, YsButton);
};
export default YsButton;