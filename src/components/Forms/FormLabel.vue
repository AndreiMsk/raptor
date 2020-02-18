<template>
  <v-row>
    <v-col md="6" class="px-5 step">
      <div class="display-2 font-weight-black text-center pr-0">
        <span class="d-inline-block">{{ step }}</span>
        <span class="d-inline-block caption"> of 2</span>
      </div>
      <p v-if="step === 1" class="caption text-center px-3">
        * Fill in the feeds details and click on "Load Feed".
      </p>
      <p v-else class="caption text-center px-3">
        * Map the feed data with the Database schema from the right.
      </p>
    </v-col>
    <v-col md="3 offset-md-3">
      <h1 class="white--text body-2 px-3 py-3 label text-center">
        {{ label }}
        <v-icon right class="white--text">mdi-server</v-icon>
      </h1>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "FormLabel",

  props: {
    step: {
      type: Number,
      required: true,
      default: () => 0,
      description: "Form step"
    },
    label: {
      type: String,
      required: true,
      default: () => "",
      description: "Form step"
    }
  }
};
</script>
<style scoped>
.label {
  background: #546e7a;
  -webkit-box-shadow: -2px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -2px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -2px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

.step {
  background: #7b134b;
  position: relative;
  top: -20px;
  left: -15px;
  color: #fff;
  border-radius: 5px;
}
</style>
