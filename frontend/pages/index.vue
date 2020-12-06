<template>
  <div>
    <h1>Felhasználók</h1>
    <div>
      <b-table sstriped hover :items="users" :fields="fields" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Users',
  async fetch(): Promise<void> {
    this.users = await this.$axios.$get('http://localhost:3000/user');
    console.log(this.users);
  },
  data() {
    return {
      users: [],
      fields: [
        {
          key: 'id',
          label: 'Sorszám',
        },
        {
          key: 'name',
          label: 'Név',
        },
        {
          key: 'birthYear',
          label: 'Születési év',
        },
        {
          key: 'isAdmin',
          label: 'Admin',
          formatter: (value, key, item) => {
            return value ? 'Igen' : 'Nem'
          },
        },
        {
          key: 'createdAt',
          label: 'Létrehozva',
          formatter: (value, key, item) => {
            return this.$moment(value).format('YYY.MM.DD. HH:mm:ss')
          },
        },
      ],
    }
  },
});
</script>
