import { createStore } from 'vuex'


const audioAttributeMutations = (state, data) =>{
    state.audioAttributeState = data;
    localStorage.setItem("songUrl", data.url);
    localStorage.setItem("name", data.name);
    localStorage.setItem("picture", data.picture);
    localStorage.setItem("singer", data.singer);
}

export default createStore({
  state: {
    audioAttributeState: {
      url: "",
      name: "",
      picture: "",
      singer: "",
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
