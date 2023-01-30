export default {
  request(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;

    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequest(state, getters) {
    return getters.request && getters.request.length > 0;
  },
};
