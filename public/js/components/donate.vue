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
                <v-layout row wrap v-if="!donor">
                    <v-flex xs12>
                        <v-container id="donate" fluid>
                            <v-layout row>
                                <v-flex xs4 md2>
                                    <v-btn color="grey lighten-2" fab large @click="getPayOptions()" title="Donate to <niiyeboah.com> with SlydePay" :disabled="donating" :loading="loading">
                                        <v-icon>payment</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs8 md10>
                                    <img id="slydepayLogo" src="img/slydepay.png" alt="SlydePay Logo" height="72px" title="Powered by SlydePay" />
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-container 
                            id="donationForm"
                            fluid 
                            class="grey lighten-3" 
                            v-if="payOptions.length">
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field 
                                        label="Name"
                                        v-model="name"
                                        :error-messages="nameErrors"
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-select 
                                        :items="payOptions" 
                                        label="Pay Options" 
                                        item-value="value" 
                                        v-model="select"
                                        :error-messages="selectErrors"
                                        @change="$v.select.$touch()"
                                        @blur="$v.select.$touch()"
                                        required>
                                    </v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field 
                                        label="Amount"
                                        prefix="GH¢"
                                        v-model="amount"
                                        :error-messages="amountErrors"
                                        @input="$v.amount.$touch()"
                                        @blur="$v.amount.$touch()"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field 
                                        label="Mobile Number" 
                                        v-model="phone"
                                        :error-messages="phoneErrors"
                                        @input="$v.phone.$touch()"
                                        @blur="$v.phone.$touch()"
                                        required
                                        mask="###-###-####">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-text-field 
                                        label="Email" 
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-btn @click="submit" :loading="loading">
                                        <v-icon left>payment</v-icon>
                                        <span v-text="'Donate'"></span>
                                    </v-btn>
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
                <v-layout row v-else>
                    <v-flex xs12 text-xs-center>
                        <v-avatar class="thankYou" size="300px">
                            <img src="img/me.200.jpg" alt="avatar">
                        </v-avatar>
                        <h1 class="thankYou">Thank you so much for the donation <span class="light-green--text">{{this.name}}</span>!</h1>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="green accent-4" dark>
            <v-spacer></v-spacer>
            <div id="footer" class="subheading white--text">Made with <v-icon color="red">favorite</v-icon> by Nii Yeboah</div>
        </v-footer>
    </v-app>
</template>

<script>
import axios from 'axios';
import config from '../../../server/config/config';
import { validationMixin } from 'vuelidate';
import { withParams, required, maxLength, email } from 'vuelidate/lib/validators';

const isPhone = value => /^\d{10}$/.test(value);
const isPrice = value => /^\d+\.\d{2}$/.test(value);

export default {
    mixins: [validationMixin],
    validations: {
        name: { required },
        select: { required },
        amount: { required, price: isPrice },
        phone: { required, phone: isPhone },
        email: { required, email }
    },
    data() {
        return {
            name: '',
            select: null,
            amount: '42.00',
            phone: '',
            email: '',
            donating: false,
            loading: false,
            error: false,
            payOptions: [],
            donor: false
        };
    },
    methods: {
        validate() {
            this.$v.$touch();
            return !(
                this.$v.name.$error ||
                this.$v.select.$error ||
                this.$v.amount.$error ||
                this.$v.phone.$error ||
                this.$v.email.$error
            );
        },
        getPayOptions() {
            this.loading = true;
            this.donating = true;
            axios
                .post('https://app.slydepay.com/api/merchant/invoice/payoptions', {
                    emailOrMobileNumber: config.slydePayAPI.mobileNumber,
                    merchantKey: config.slydePayAPI.apiKey
                })
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
                .catch(err => (this.error = err));
        },
        createInvoice(donationId) {
            axios
                .post('https://app.slydepay.com/api/merchant/invoice/create', {
                    emailOrMobileNumber: config.slydePayAPI.mobileNumber,
                    merchantKey: config.slydePayAPI.apiKey,
                    amount: parseFloat(this.amount),
                    description: `Donation from ${this.name}`,
                    orderCode: donationId,
                    sendInvoice: true,
                    payOption: this.select,
                    customerName: this.name,
                    customerEmail: this.email
                })
                .then(res => {
                    this.loading = false;
                    this.donor = true;
                })
                .catch(err => {
                    this.error = err;
                    console.log(err);
                });
        },
        createDonation() {
            this.loading = true;
            axios
                .post('/donation', {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    amount: parseFloat(this.amount)
                })
                .then(res => {
                    console.log(res, this.createInvoice(res.data._id));
                })
                .catch(err => {
                    this.error = err;
                    console.log(err);
                });
        },
        submit() {
            if (this.validate()) {
                this.createDonation();
            }
        }
    },
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push('Name is required');
            return errors;
        },
        selectErrors() {
            const errors = [];
            if (!this.$v.select.$dirty) return errors;
            !this.$v.select.required && errors.push('Pay Option is required');
            return errors;
        },
        amountErrors() {
            const errors = [];
            if (!this.$v.amount.$dirty) return errors;
            !this.$v.amount.price && errors.push('Must be valid amount');
            !this.$v.amount.required && errors.push('Amount is required');
            return errors;
        },
        phoneErrors() {
            const errors = [];
            if (!this.$v.phone.$dirty) return errors;
            !this.$v.phone.phone && errors.push('Must be valid phone number');
            !this.$v.phone.required && errors.push('Mobile number is required');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email && errors.push('Must be valid e-mail');
            !this.$v.email.required && errors.push('E-mail is required');
            return errors;
        }
    }
};
</script>
