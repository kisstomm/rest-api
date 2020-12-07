<template>
  <div>
    <h1>Felhasználók</h1>
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-id" label="Azonosító" label-for="input-id">
        <b-form-input
          id="input-id"
          v-model="user.id"
          type="number"
          required
          readonly
        />
      </b-form-group>

      <b-form-group id="input-group-name" label="Név" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="user.name"
          required
          placeholder='Teszt Elek'
        />
      </b-form-group>

      <b-form-group id="input-group-birth-year" label="Születési év" label-for="input-birth-year">
        <b-form-input
          id="input-birth-year"
          v-model="user.birthYear"
          required
        />
      </b-form-group>

      <b-form-group id="input-group-is-admin" label="Admin" label-for="input-is-admin">
        <b-form-checkbox
          id="checkbox-is-admin"
          v-model="user.isAdmin"
         />
      </b-form-group>

      <b-form-group id="input-group-created-at" label="Létrehozva" label-for="input-created-at">
        <b-form-datepicker
          id="date-created-at"
          v-model="user.createdAt"
          locale="hu"
          readonly
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
import UserDto from '../../dtos/user.dto';

interface Data {
  user: UserDto;
}

export default Vue.extend({
  name: 'UserEdit',
  async fetch(): Promise<void> {
    this.user = await this.$axios.$get(`http://localhost:3000/user/${this.$route.params.id}`);
  },
  data(): Data {
    return {
      user: new UserDto(),
    }
  },
  methods: {
    async onSubmit() {
      await this.$axios.$put(`http://localhost:3000/user/${this.$route.params.id}`, this.user);
      this.$router.push('/');
    },
    async onReset() {
      this.$router.push('/');
    }
  }
});
</script>
