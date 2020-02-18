<template>
  <v-col md="11" sm="12">
    <v-card>
      <FormLabel :label="label" :step="step" />
      <v-row>
        <v-col sm="10 offset-sm-1">
          <!-- Form step one -->
          <v-scroll-x-reverse-transition>
            <IntegrationStepOne
              v-if="step === 1"
              @integrationStepOne="handleIntegrationStepOne"
            />
          </v-scroll-x-reverse-transition>

          <!-- Form step two -->
          <v-scroll-x-reverse-transition>
            <IntegrationStepTwo
              v-if="step === 2"
              :feedLabels="feedLabels"
              :dataBaseSchemaFields="dataBaseSchemaFields"
              @integrationStepTwo="handleIntegrationStepTwo"
              @goToPrevious="goToPrevious"
            />
          </v-scroll-x-reverse-transition>

          <!-- Integration added notification -->
          <v-snackbar
            v-model="snackbar.status"
            :color="snackbar.color"
            :multi-line="snackbar.mode === 'multi-line'"
            :right="snackbar.x === 'right'"
            :timeout="snackbar.timeout"
            :top="snackbar.y === 'top'"
            :vertical="snackbar.mode === 'vertical'"
          >
            {{ snackbar.text }}
            <v-btn dark text @click="snackbar.status = false">
              Close
            </v-btn>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import { mapActions } from "vuex";
import jsonFeed from "@/utils/feed.json";
import { dbSchema } from "@/utils/dbSchema.js";
import IntegrationStepOne from "@/components/Forms/NewIntegration/IntegrationStepOne.vue";
import IntegrationStepTwo from "@/components/Forms/NewIntegration/IntegrationStepTwo.vue";
import FormLabel from "@/components/Forms/FormLabel.vue";

export default {
  name: "NewIntegration",

  components: {
    IntegrationStepOne,
    IntegrationStepTwo,
    FormLabel
  },

  data: () => ({
    snackbar: {
      text: "Integration saved!",
      color: "cyan darken-2",
      x: "right",
      y: "top",
      mode: "",
      timeout: 3000,
      status: false
    },
    mappings: [],
    step: 1,
    feedLabels: [],
    dataBaseSchemaFields: dbSchema,
    label: "Add Integration"
  }),

  methods: {
    /* initiate integration by adding name, url customer & description */
    handleIntegrationStepOne(data) {
      this.preprocessData();
      this.addIntegrationStepOne(data);
      this.increaseStep();
    },

    /* save integration and add it to VUEX (or call to API and then add it to VUEX) */
    handleIntegrationStepTwo(data) {
      this.postProcessData(data);
      this.saveIntegration(this.mappings);
      this.showSnackbar();
      this.resetForm();
    },

    /* vuex action - saving the integration */
    ...mapActions({
      addIntegrationStepOne: "addIntegrationStepOne",
      saveIntegration: "saveIntegration"
    }),

    /* resetting the form/step to initial state */
    resetForm() {
      this.feed = {};
      this.step = 1;
    },

    /* go back from step two of the integration to step one */
    goToPrevious() {
      this.decreaseStep();
    },

    /* get labels from customer's feed and passed them to form's step 2 as props */
    preprocessData() {
      this.feedLabels = Object.keys(jsonFeed[0]).filter(item => item);
    },

    /* map the feed to the DB schema into JS object */
    postProcessData(mapped) {
      const mappings = [];
      for (let i = 0; i < mapped.length; i++) {
        const entry = {
          schemaName: this.dataBaseSchemaFields[i],
          feedName: mapped[i]
        };
        mappings.push(entry);
      }
      this.mappings = mappings;
    },

    /* increase current step */
    increaseStep() {
      this.step += 1;
    },

    /* decrease current step */
    decreaseStep() {
      this.step -= 1;
    },

    showSnackbar() {
      this.snackbar.status = true;
    }
  }
};
</script>
