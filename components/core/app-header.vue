<template>
  <v-app-bar
    id="top_nav"
    app
    absolute
    color="transparent"
    flat
    :height="isMobile ? 64 : 72"
    class="px-xl-28"
  >
    <core-app-logo class="mr-4" />
    <template v-if="!isMobile">
      <v-btn
        v-for="item in items"
        :key="item.text"
        color="grey darken-3"
        height="40"
        text
        class="mr-1"
        :to="item.href"
        active-class="grey lighten-5"
      >
        {{ item.text }}
      </v-btn>
    </template>

    <v-spacer />

    <template v-if="!isMobile">
      <v-btn color="grey lighten-2" outlined class="mr-4">
        <v-icon left color="grey darken-3">
          {{ mdiLightningBoltOutline }}
        </v-icon>
        <span class="grey--text text--darken-3">Upgrade now</span>
      </v-btn>
      <v-btn fab height="40" width="40" depressed color="white" class="mr-1">
        <v-icon color="grey darken-2">{{ mdiCogOutline }}</v-icon>
      </v-btn>
      <v-btn fab height="40" width="40" depressed color="white" class="mr-4">
        <v-icon color="grey darken-2">{{ mdiBellOutline }}</v-icon>
      </v-btn>
      <v-avatar size="40" color="grey lighten-4">
        <img src="/images/Avatar.png" alt="" />
      </v-avatar>
    </template>

    <v-app-bar-nav-icon v-else color="primary" />
  </v-app-bar>
</template>

<script>
import {
  mdiCogOutline,
  mdiBellOutline,
  mdiLightningBoltOutline,
} from '@mdi/js';

export default {
  name: 'AppHeader',
  props: {
    items: { type: Array, default: () => [] },
  },
  data: () => ({
    mdiCogOutline,
    mdiBellOutline,
    mdiLightningBoltOutline,
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
};
</script>

<style lang="scss">
#top_nav {
  .v-btn--active {
    &::before {
      background: none;
    }
  }
}

#top_nav.v-app-bar.v-toolbar {
  border-bottom: 1px solid #eaecf0 !important;
}
</style>
