import Vue from 'vue';
import Donate from './components/donate.vue';
import Vuetify from 'vuetify';
import vLazyImg from 'v-lazy-img';
import 'vuetify/dist/vuetify.css';
import '../css/index.css';

Vue.use(Vuetify);
Vue.use(vLazyImg);

new Vue({
    el: '#app',
    render: vm => vm(Donate)
});
