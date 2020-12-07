<template>
  <div>
    <h1>Felhasználók</h1>
    <div>
      <b-table sstriped hover :items="users" :fields="fields">
        <template #cell(isAdmin)="data">
          <b-form-checkbox
            id="checkbox-is-admin"
            v-model="data.item.isAdmin"
            disabled
          />
        </template>
        <template #cell(actions)="data">
          <nuxt-link :to="{ name: 'edit-id', params: { id: data.item.id }}">
            Szerkersztés
          </nuxt-link>

          <b-button size="sm" @click="deleteUser(data.item.id)" class="ml-2">
            Törlés
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserDto from './../dtos/user.dto';

interface Data {
  users: UserDto[];
  fields: Object;
}

export default Vue.extend({
  name: 'Users',
  async fetch(): Promise<void> {
    this.users = await this.$axios.$get('http://localhost:3000/user');
  },
  data(): Data {
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
        },
        {
          key: 'createdAt',
          label: 'Létrehozva',
          formatter: (value:Date) => {
            return this.$moment(value).format('YYYY.MM.DD. HH:mm:ss')
          },
        },
        {
          key: 'actions',
          label: 'Műveletek',
        },
      ],
    }
  },
  methods: {
    async deleteUser(id) {
      this.user = await this.$axios.$delete(`http://localhost:3000/user/${id}`);
      this.$fetch();
    }
  }
});
</script>
