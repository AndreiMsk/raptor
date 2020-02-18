<template>
  <!-- dashboard container -->
  <v-app id="keep">
    <!-- dashboard top bar -->
    <v-app-bar app clipped-left color="white">
      <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer" />
      <router-link to="/">
        <v-img
          max-width="130"
          src="https://raptorsmartadvisor.com/wp-content/uploads/2017/03/raptor-logo-h80.png"
        />
      </router-link>
      <v-spacer />
      <v-avatar color="pink darken-4" size="35">
        <span class="white--text">AM</span>
      </v-avatar>
    </v-app-bar>

    <!-- dashboard side drawer -->
    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template>
          <v-row align="center"> </v-row>
        </template>
        <template v-for="(item, i) in items">
          <router-link :to="{ name: item.name }" :key="i">
            <v-list-item :key="i" link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="grey--text">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- dashboard router content area -->
    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <v-row justify="center" align="center" class="mt-5">
          <router-view />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "add", text: "Create new integration", name: "NewIntegration" },
      { icon: "archive", text: "Lists", name: "Lists" }
    ]
  })
};
</script>

<style lang="css">
.logo {
  max-height: 30px;
}

a {
  text-decoration: none;
}

body {
  font-family: "Montserrat", sans-serif !important;
}
</style>
