import Vue from 'vue';
import Donate from './donate.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: vm => vm(Donate)
});
