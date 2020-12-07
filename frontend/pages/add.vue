<template>
  <div>
    <h1>Felhasználó - {{ user.name }}</h1>
    <div>
      <b-form @submit="onSubmit" @reset="onReset">

      <b-form-group id="input-group-name" label="Név" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="user.name"
          placeholder='Teszt Elek'
        />
        <b-form-invalid-feedback :state="validateName">
          Mező kitöltése kötelező
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-birth-year" label="Születési év" label-for="input-birth-year">
        <b-form-input
          id="input-birth-year"
          v-model="user.birthYear"
          placeholder=1999
        />
        <b-form-invalid-feedback :state="validateBirthYear">
          Érvénytelen érték (Megengedett érték: {{ currentDate.getFullYear()-100 }} - {{ currentDate.getFullYear() }})
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-is-admin" label="Admin" label-for="input-is-admin">
        <b-form-checkbox
          id="checkbox-is-admin"
          v-model="user.isAdmin"
         />
      </b-form-group>

      <b-button type="submit" variant="primary">Mentés</b-button>
      <b-button type="reset" variant="danger">Mégse</b-button>
    </b-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserDto from './../dtos/user.dto';

interface Data {
  user: UserDto;
  currentDate: Date;

}

export default Vue.extend({
  name: 'Useradd',
  data(): Data {
    return {
      user: new UserDto(),
      currentDate: new Date,
    }
  },
  methods: {
    async onSubmit() {
      if (this.validateName && this.validateBirthYear) {
        await this.$axios.$post('http://localhost:3000/user', this.user);
        this.$router.push('/');
      }
    },
    async onReset() {
      this.$router.push('/');
    },
  },
  computed: {
    validateName():boolean {
      if (this.user.name) {
        return this.user.name.length > 0;
      }
      return false;
    },
    validateBirthYear():boolean {
      if (this.user.birthYear) {
        return this.user.birthYear >= this.currentDate.getFullYear()-100 && this.user.birthYear <= this.currentDate.getFullYear();
      }
      return false;
    }
  },
});
</script>
