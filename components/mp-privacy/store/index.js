import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showPrivacy: false,
    resolvePrivacyAuthorization: null,
  },
  mutations: {
    setShowPrivacy(state, val) {
      state.showPrivacy = val
    },
    setResolvePrivacyAuthorization(state, val) {
      state.resolvePrivacyAuthorization = val
    }
  },
})

export default store