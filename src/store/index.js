import { createStore } from 'vuex'


const audioAttributeMutations = (state, data) =>{
    state.audioAttributeState = data;
    localStorage.setItem("songUrl", data.url);
}

export default createStore({
  state: {
    audioAttributeState: {
      duration: "",
      url: "",
  },
  },
  mutations: {
    audioAttributeMutations,
  },
  actions: {
  },
  modules: {
  }
})
