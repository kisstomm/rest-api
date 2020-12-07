<template>
  <div>
    <h1>Felhasználók</h1>
    <nuxt-link id='link-add-user' :to="{ name: 'add'}">
      Új felhasználó
    </nuxt-link>
    <div>
      <b-table sstriped hover :items="users" :fields="fields">
        <template #cell(isAdmin)="data">
          <b-form-checkbox
            :id="`checkbox-is-admin-${data.index}`"
            v-model="data.item.isAdmin"
            disabled
            :value-field="data.item.isAdmin ? 'admin' : 'not_admin'"

          />
        </template>
        <template #cell(actions)="data">
          <nuxt-link :id="`link-edit-${data.index}`" :to="{ name: 'edit-id', params: { id: data.item.id }}">
            Szerkersztés
          </nuxt-link>

          <b-button :id="`button-delete-${data.index}`" size="sm" @click="deleteUser(data.item.id)" class="ml-2">
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
    async deleteUser(id:number) {
      await this.$axios.$delete(`http://localhost:3000/user/${id}`);
      this.$fetch();
    }
  }
});
</script>
