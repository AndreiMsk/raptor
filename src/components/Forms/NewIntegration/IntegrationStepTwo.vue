<template>
  <form>
    <!-- feed labels -->
    <v-row class="row mt-5">
      <v-col sm="12">
        <v-alert
          v-if="errors.length"
          type="error"
          text
          dense
          color="red"
          icon="mdi-alert"
          border="left"
        >
          {{ errors[0] }}
        </v-alert>
      </v-col>

      <v-col class="col-4">
        <h3 class="mb-0 pb-0">Product feed</h3>
        <v-col class="mt-0 pt-0 product-feed-box">
          <draggable class="list-group" :list="feedLabels" group="fields">
            <div
              class="list-group-item"
              v-for="(element, index) in feedLabels"
              :key="index"
            >
              <v-chip
                class="ma-1"
                color="pink darken-4"
                label
                text-color="white"
              >
                {{ element }}
                <v-icon right>mdi-label</v-icon>
              </v-chip>
            </div>
          </draggable>
        </v-col>
      </v-col>

      <!-- mapping area -->
      <v-col class="col-4 mapping-box">
        <h3 class="drag-area">Drag to map</h3>
        <draggable
          class="list-group"
          :list="mapped"
          group="fields"
          :empty-insert-threshold="100"
        >
          <div
            class="list-group-item"
            v-for="(element, index) in mapped"
            :key="index"
          >
            <v-chip class="ma-1" color="pink darken-4" label text-color="white">
              {{ element }}
              <v-icon right>mdi-arrow-right</v-icon>
            </v-chip>
          </div>
        </draggable>
      </v-col>

      <!-- DB schema labels area -->
      <v-col class="col-4 mapping-box ">
        <h3>Database</h3>
        <v-chip
          v-for="(field, key) in dataBaseSchemaFields"
          class="ma-2 d-block"
          :color="
            !setActive.ids.includes(`${key}`)
              ? setActive.colors[1]
              : setActive.colors[0]
          "
          label
          :text-color="
            !setActive.ids.includes(`${key}`)
              ? setActive.colors[1]
              : setActive.colors[2]
          "
          :key="key"
          :outlined="!setActive.ids.includes(`${key}`)"
        >
          <v-icon v-if="!setActive.ids.includes(`${key}`)" left
            >mdi-database-plus</v-icon
          >
          <v-icon v-else left> mdi-checkbox-marked-circle </v-icon>
          <span class="ml-2">{{ field }}</span>
          <sup v-if="requiredMappings.includes(field)" class="red--text">
            *
          </sup>
        </v-chip>
      </v-col>
      <v-col cols="12">
        <v-btn
          color="blue-grey darken-4"
          class=" white--text my-5 mx-1"
          @click="goToPrevious"
        >
          <v-icon left dark>mdi-arrow-left-bold</v-icon>
          Back
        </v-btn>
        <v-btn
          color="blue-grey"
          class=" white--text my-5 mx-1"
          @click="saveIntegration"
        >
          Save integration
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "IntegrationStepTwo",

  props: {
    feedLabels: {
      type: Array,
      required: true,
      default: () => [],
      description: "The feed database name labels"
    },
    dataBaseSchemaFields: {
      type: Array,
      required: true,
      default: () => [],
      description: "The database schema"
    }
  },

  components: {
    draggable
  },

  data: () => ({
    mapped: [],
    errors: []
  }),

  computed: {
    requiredMappings() {
      const requiredLabels = [
        "ProductId",
        "ProductName",
        "Price",
        "ProductUrl"
      ];
      return requiredLabels;
    },

    /* set the mapped labels active */
    setActive() {
      const active = {
        ids: [...Object.keys(this.mapped.filter(index => index))],
        colors: ["teal lighten-1", "grey", "white"]
      };
      return active;
    },

    /* validation */
    mappedRequiredFields() {
      if (this.mapped.length < 4) {
        return false;
      }
      return true;
    }
  },

  methods: {
    /* save and proceed to saving the integration  */
    saveIntegration() {
      if (this.mappedRequiredFields) {
        this.$emit("integrationStepTwo", this.mapped);
      } else {
        this.errors.push(
          "Please make sure that all the *required  fields are mapped"
        );
      }
    },
    /* go to the previous step of the integration  */
    goToPrevious() {
      this.$emit("goToPrevious");
    }
  }
};
</script>
<style lang="scss" scoped>
.product-feed-box {
  height: 540px;
  overflow-y: scroll;
}

.mapping-box {
  border: 1px dotted lightgrey;
}

.drag-area {
  &:hover {
    padding-bottom: 20px;
  }
}
</style>
