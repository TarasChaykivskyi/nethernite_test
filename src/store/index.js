import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        packages: [],
        currentPackages: [],
        page: {
            number: 1,
            allPackages: null,
            perPage: 10,
            range: 2
        },
        isModal: false,
        selectedPackage: null
    },
    getters: {
        PACKAGES: state => state.packages,
        CURRENT_PACKAGES: state => state.currentPackages,
        IS_MODAL: state => state.isModal,
        PAGE_NUMBER: state => state.pageNumber,
        SELECTED_PACKAGE: state => state.selectedPackage
    },
    mutations: {
        setPackages(state, packages) {
            state.packages = packages;
            state.currentPackages = state.packages;
        },
        toggleModal(state, status) {
            state.isModal = status
        },
        searchValues(state, value) {
            let tmp = [];
            state.packages.filter(item => {
                if(item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    tmp.push(item);
                }
            })
            state.currentPackages = tmp;
        },
        setSelectedPackage(state, obj) {
            let tmp = [],
                versions = Object.keys(obj.version),
                len = versions.length - 6;

            versions.map((item, index) => {
                if(len < index) {
                    obj.version[item].current = item;
                    tmp.push(obj.version[item]);
                }
            })
            obj.version = tmp;
            state.selectedPackage = obj;
        }
    },
    actions: {
        GET_PACKAGES({commit}) {
            axios.get(`https://data.jsdelivr.com/v1/stats/packages`)
                .then(response => {
                    commit("setPackages", response.data);
                }).catch(error => {
                console.log(error)
            })
        },
        async SHOW_MODAL({commit}, obj) {
            let tmp = {
                name: obj.name
            }
            commit('toggleModal', true)
            await axios.get(`https://data.jsdelivr.com/v1/package/${obj.type}/${obj.name}`)
                .then(response => {tmp.tag = response.data.tags.latest})
            await axios.get(`https://data.jsdelivr.com/v1/package/${obj.type}/${obj.name}/stats`)
                .then(response => {
                    tmp.version = response.data.versions
                })
            await axios.get(`https://data.jsdelivr.com/v1/package/${obj.type}/${obj.name}@${tmp.tag}`)
                .then(response => {tmp.files = response.data.files[0].files})
            await commit('setSelectedPackage', tmp);
        },
        HIDE_MODAL({commit}) {
            commit('toggleModal', false)
        },
        SEARCH_VALUES({commit}, value) {
            commit('searchValues', value)
        }
    }
})
