import axios from "axios";

const store = {
    state: {
        packages: [],
        pagCount: 10,
        currentPag: 1
    },
    mutations: {
        SET_LIST_TO_STATE(state, list) {
            state.packages = [];
            state.packages.push(...list);
        },
        UPDATE_PAGPAGE(state, value) {
            state.currentPag = value;
        }
    },
    actions: {
        GET_LIST_FROM_API({commit}, page) {
            return axios(`https://data.jsdelivr.com/v1/stats/packages?page=${page}&limit=10`, {
                method: 'GET'
            })
            .then(list => {
                commit('SET_LIST_TO_STATE', list.data);

                return list.data;
            })
            .catch(error => {
                console.log(error);

                return error;
            });
        },
        UPDATE_PAGE({commit}, value) {
            commit('UPDATE_PAGPAGE', value);
        }
    },
    getters: {
        PACKAGES(state) {
            return state.packages;
        },
        CURRENTPAG(state) {
            return state.currentPag;
        },
        PAGCOUNT(state) {
            return state.pagCount;
        },
    }
};

export default store;