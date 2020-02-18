<template>
  <div class="home">
    <Summary />
  </div>
</template>

<script>
// @ is an alias to /src
import Summary from "@/components/Summary.vue";

export default {
  name: "Home",
  components: {
    Summary
  }
};
</script>
