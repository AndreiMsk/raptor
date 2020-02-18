<template>
  <v-row>
    <v-col sm="10 offset-sm-1">
      <v-simple-table :height="400">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Customer</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(integration, key) in integrations" :key="key">
              <td>{{ integration.name }}</td>
              <td>{{ integration.customerId | getCustomerName }}</td>
              <td>
                <v-icon left> mdi-checkbox-marked-circle </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import jsonCustomers from "@/utils/customers.json";

export default {
  computed: {
    ...mapGetters({
      integrations: "integrations"
    })
  },
  filters: {
    getCustomerName: function(value) {
      if (!value) return "";
      value = jsonCustomers.filter(customer => customer.id === value);
      return value[0].name;
    }
  }
};
</script>
