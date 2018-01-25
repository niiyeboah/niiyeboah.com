import Vue from 'vue';
import Donate from './components/donate.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import '../css/index.css';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: vm => vm(Donate)
});
