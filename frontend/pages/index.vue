<template>
  <div>
    <h1>Felhasználók</h1>
    <div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Users',
  async fetch(): Promise<void> {
    this.users = await this.$http.$get('user');
    console.log(this.users);
  },
  data() {
    return {
      users: [],
    }
  },
});
</script>
