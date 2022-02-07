<template>
  <v-app dark>
    <core-app-header :items="top_links" />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      top_links: [
        { text: 'Home', href: '' },
        { text: 'Dashboard', href: '/' },
        { text: 'Projects', href: '' },
        { text: 'Tasks', href: '' },
        { text: 'Reporting', href: '' },
        { text: 'Users', href: '' },
      ],
    };
  },
};
</script>
