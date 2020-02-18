<template>
  <v-form ref="form" lazy-validation v-model="valid" class="px-5">
    <v-row class="d-flex justify-center">
      <v-col md="9">
        <!-- Feed Description-->
        <v-text-field
          v-model="integrationSummary.name"
          :rules="nameRules"
          label="Feed name"
          required
        ></v-text-field>

        <!-- Feed Customer select-->
        <v-select
          v-model="integrationSummary.customerId"
          :items="customers"
          :rules="customerRules"
          label="Customer"
          item-value="id"
          item-text="name"
          required
        ></v-select>

        <!-- Feed URL-->
        <v-text-field
          v-model="integrationSummary.url"
          :rules="urlRules"
          label="URL"
          required
        ></v-text-field>

        <!-- Feed Description-->
        <v-textarea
          class="mt-5 pt-3"
          outlined
          name="input-7-4"
          label="Feed description"
          v-model="integrationSummary.description"
        ></v-textarea>

        <v-btn color="blue-grey" class=" white--text" block @click="loadData">
          Load feed
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { mapGetters } from "vuex";
import jsonCustomers from "@/utils/customers.json";

export default {
  name: "IntegrationStepOne",

  data: () => ({
    integrationSummary: {},
    valid: true,
    customers: [],
    nameRules: [v => !!v || "Name is required"],
    urlRules: [v => !!v || "The URL is required"],
    customerRules: [v => !!v || "The customer is required"]
  }),

  computed: {
    ...mapGetters({
      summary: "integrationForm"
    })
  },

  created() {
    /* mocking getting customers to prepopulate select */
    this.getCustomers();

    /* creating copy of integration */
    this.integrationSummary = { ...this.summary };
  },

  methods: {
    /* get customers from json (could be API call and save to VUEX) */
    getCustomers() {
      this.customers = jsonCustomers;
    },

    /* save data and proceed to next step */
    loadData() {
      if (this.$refs.form.validate()) {
        this.$emit("integrationStepOne", this.integrationSummary);
      }
    }
  }
};
</script>
