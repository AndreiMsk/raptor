import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    integrations: [],
    integrationForm: []
  },

  getters: {
    integrations: state => {
      return state.integrations;
    },
    integrationForm: state => {
      return state.integrationForm;
    }
  },

  actions: {
    /* dispatching commit to save 1st step integration to store */
    addIntegrationStepOne({ commit }, payload) {
      try {
        commit("setIntegrationStepOne", payload);
      } catch (error) {
        console.log(error);
      }
    },

    /* dispatching commit to save 2st step integration to store */
    saveIntegration({ commit }, payload) {
      try {
        commit("saveIntegration", payload);
      } catch (error) {
        console.log(error);
      }
    }
  },

  mutations: {
    setIntegrationStepOne(state, data) {
      state.integrationForm = data;
    },

    saveIntegration(state, data) {
      state.integrationForm.mappings = data;
      state.integrations.push(state.integrationForm);
      state.integrationForm = [];
    }
  },

  modules: {}
});
