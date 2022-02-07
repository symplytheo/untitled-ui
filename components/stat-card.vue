<template>
  <v-card outlined class="py-5 px-4 pa-lg-6">
    <v-card-title class="subtitle-1 pa-0">
      {{ title }}
      <v-spacer />
      <v-btn icon>
        <v-icon>{{ mdiDotsVertical }}</v-icon>
      </v-btn>
    </v-card-title>
    <div class="mt-4 d-flex justify-space-between align-end">
      <div>
        <div class="text-h2 font-weight-bold">{{ value.toLocaleString() }}</div>
        <div class="subtitle-2 text--secondary">
          <v-icon size="20" :color="percentage > 0 ? 'success' : 'error'">
            {{ percentage > 0 ? mdiArrowUp : mdiArrowDown }}
          </v-icon>
          <span :class="percentage > 0 ? 'success--text' : 'error--text'">
            {{ Math.abs(percentage) }}%
          </span>
          vs last month
        </div>
      </div>
      <div class="ml-4">
        <chart-upward v-if="percentage > 0" />
        <chart-downward v-else />
      </div>
    </div>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiArrowUp, mdiArrowDown } from '@mdi/js';

export default {
  name: 'StatCard',
  props: {
    title: { type: String, default: '' },
    value: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
  },
  data: () => ({ mdiDotsVertical, mdiArrowUp, mdiArrowDown }),
};
</script>

<style></style>
