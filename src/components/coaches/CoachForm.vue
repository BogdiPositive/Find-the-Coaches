<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !firstName.isValid }">
        <label for="firstname">First Name</label>
        <input
          id="firstname"
          type="text"
          v-model.trim="firstName.val"
          @blur="clearValidity('firstName')"
        />
        <p v-if="!firstName.isValid">FirstName must be not empty!</p>
      </div>
      <div class="form-control" :class="{ invalid: !lastName.isValid }">
        <label for="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          v-model.trim="lastName.val"
          @blur="clearValidity('lastName')"
        />
        <p v-if="!lastName.isValid">LastName must be not empty!</p>
      </div>
      <div class="form-control" :class="{ invalid: !description.isValid }">
        <label for="description">Description</label>
        <textarea
          id="description"
          type="text"
          rows="5"
          v-model.trim="description.val"
          @blur="clearValidity('description')"
        ></textarea>
        <p v-if="!description.isValid">Description must be not empty!</p>
      </div>
      <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
        <label for="rate">Hourly Rate</label>
        <input
          id="rate"
          type="number"
          v-model.number="hourlyRate.val"
          @blur="clearValidity('hourlyRate')"
        />
        <p v-if="!hourlyRate.isValid">Rate must be greater than 0!</p>
      </div>
      <div class="form-control" :class="{ invalid: !areas.isValid }">
        <h3>Areas of Expertise</h3>
        <div>
          <label for="frontend">Frontend Developer</label>
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="areas.val"
            @blur="clearValidity('areas')"
          />
        </div>
        <div>
          <label for="backend">Backend Developer</label>
          <input
            type="checkbox"
            id="backend"
            value="backend"
            v-model="areas.val"
            @blur="clearValidity('areas')"
          />
        </div>
        <div>
          <label for="career">Career Advisory</label>
          <input
            type="checkbox"
            id="career"
            value="career"
            v-model="areas.val"
            @blur="clearValidity('areas')"
          />
        </div>
        <p v-if="!areas.isValid">Areas must be not empty!</p>
      </div>
      <p v-if="!isValidForm">Please fix the above error and submit again</p>
      <base-button>Registor</base-button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      hourlyRate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      isValidForm: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.isValidForm = true;
      if (this.firstName.val === "") {
        this.isValidForm = false;
        this.firstName.isValid = false;
      }
      if (this.lastName.val === "") {
        this.isValidForm = false;
        this.lastName.isValid = false;
      }
      if (this.description.val === "") {
        this.isValidForm = false;
        this.description.isValid = false;
      }
      if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
        this.isValidForm = false;
        this.hourlyRate.isValid = false;
      }
      if (this.areas.val.length === 0) {
        this.isValidForm = false;
        this.areas.isValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.isValidForm) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.hourlyRate.val,
        areas: this.areas.val,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
