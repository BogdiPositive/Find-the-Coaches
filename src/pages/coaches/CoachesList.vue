<template>
  <div>
    <base-dialog :show="!!error" title="An erorr occurred" @close="handelError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <CoachFilter @change-filter="setFilter"></CoachFilter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="flat" @click="loadCoaches(true)"
            >Refresh</base-button
          >

          <RouterLink to="/register" v-if="!isCoach && !isLoading"
            >Register as Coach</RouterLink
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoach"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></CoachItem>
        </ul>
        <h3 v-else>No coaches found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
export default {
  components: { CoachItem, CoachFilter },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    filteredCoach() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
  },

  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updateFilter) {
      this.activeFilter = updateFilter;
    },
    async loadCoaches(Refresh = false) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("coaches/loadCoaches", {
          forseRefresh: Refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
