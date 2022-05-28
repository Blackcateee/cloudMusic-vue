import { createStore } from 'vuex'


const audioAttributeMutations = (state, data) =>{
    state.audioAttributeState = data;
    localStorage.setItem("songUrl", data.url);
    localStorage.setItem("name", data.name);
    localStorage.setItem("picture", data.picture);
    localStorage.setItem("singer", data.singer);
    localStorage.setItem("songList", data.songList);
}

export default createStore({
  state: {
    audioAttributeState: {
      url: "",
      name: "",
      picture: "",
      singer: "",
      songList: "",
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
