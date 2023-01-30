<template>
  <section>
    <base-dialog :show="!!error" title="An erorr occurred" @close="handelError">
      <p>{{ error }}</p></base-dialog
    >
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header></base-card
    >
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else-if="hasRequest && !isLoading">
      <RequestList
        v-for="req in receivedRequest"
        :key="req.id"
        :email="req.userEmail"
        :message="req.message"
      ></RequestList>
    </ul>
    <h3 v-else>You haven't have any request yet!</h3>
  </section>
</template>
<script>
import RequestList from "@/components/request/RequestList.vue";
export default {
  components: {
    RequestList,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadRequests();
  },
  computed: {
    receivedRequest() {
      return this.$store.getters["request/request"];
    },
    hasRequest() {
      return this.$store.getters["request/hasRequest"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("request/fetchRequest");
      } catch (error) {
        this.error = error.message || "Something faild. Ooopsy";
      }
      this.isLoading = false;
    },
    handelError(){
        this.error = null
    }
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
