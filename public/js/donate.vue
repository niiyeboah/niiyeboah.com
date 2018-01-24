<template>
    <v-app>
        <v-toolbar app color="green accent-4" dark>
            <v-toolbar-title>
                <img id="n-logo" src="img/n-logo.32.png" />
                <div id="title">
                    Donate to
                    <span class="black--text">&#x3C;</span>
                    niiyeboah.com
                    <span class="black--text">&#x3E;</span>
                </div>
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-btn color="grey lighten-2" fab large @click="getPayOptions()" title="Donate to niiyeboah.com" :disabled="donating" :loading="loading">
                            <v-icon>payment</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-container id="donation_form" fluid grid-list-md class="grey lighten-4" v-if="payOptions.length">
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-select v-bind:items="payOptions" label="Pay Options" item-value="name"></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field label="Amount" value="50.00" prefix="GH¢"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field label="Mobile Number" value=""></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field label="Email" value=""></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-container fluid grid-list-md>
                            <v-chip label color="red" text-color="white" v-show="error">
                                <v-icon left>error</v-icon>
                                <span v-text="error"></span>
                            </v-chip>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<style>
#title {
    margin-left: 50px;
}

#n-logo {
    position: absolute;
    margin-top: -2px;
}

#donation_form {
    margin-top: 15px;
}
</style>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';

export default {
    data: function() {
        return {
            donating: false,
            loading: false,
            error: false,
            payOptions: []
        };
    },
    methods: {
        getPayOptions() {
            var apiUrl = 'https://app.slydepay.com/api/merchant/invoice/payoptions';
            var emailOrMobileNumber = '233552483882';
            var merchantKey = '1513615772706';
            this.loading = true;
            this.donating = true;
            axios
                .post(apiUrl, { emailOrMobileNumber, merchantKey })
                .then(res => {
                    this.loading = false;
                    if (res.data.success) {
                        this.payOptions = res.data.result.map(x => ({
                            text: x.name,
                            value: x.shortName
                        }));
                    } else {
                        this.error = res.data.errorMessage;
                    }
                })
                .catch(err => console.log(err));
        }
    }
};
</script>
