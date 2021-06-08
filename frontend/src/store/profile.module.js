import ProfileServices from "@/services/profile.service";


export const profile = {
    namespaced: true,
    state: {
        usersData: null
    },
    actions: {
        getUser({ commit }, id) {
            return ProfileServices.getUser(id).then(
                (response) => {
                    commit("dataSuccess", response);
                    return Promise.resolve(response);
                }
            )
        },
    },
    mutations: {
        dataSuccess(state, usersData) {
            state.usersData = usersData;
        },
    },
};
