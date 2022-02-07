<template>
  <div>
    <v-toolbar v-if="!isMobile" id="menu_nav" height="65" flat class="px-xl-28">
      <v-btn
        v-for="item in menu"
        :key="item.text"
        color="grey darken-3"
        height="40"
        text
        class="mr-1 grey--text"
        active-class="grey lighten-5"
        :to="item.to"
      >
        {{ item.text }}
      </v-btn>
      <v-spacer />
      <v-text-field
        outlined
        placeholder="Search"
        :prepend-inner-icon="mdiMagnify"
        hide-details
        dense
        style="max-width: 320px"
      />
    </v-toolbar>

    <v-container fluid class="py-8 py-lg-12 px-xl-28">
      <div
        class="d-flex flex-column flex-lg-row align-start justify-space-between mb-8"
      >
        <div>
          <h2 class="font-weight-medium text-h5 text-md-h4">
            Welcome back, Olivia
          </h2>
          <p class="text--secondary">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
        <div>
          <v-btn outlined color="grey lighten-2" class="mr-3">
            <v-icon color="grey darken-3" left>
              {{ mdiCloudUploadOutline }}
            </v-icon>
            <span class="grey--text text--darken-3"> Import </span>
          </v-btn>
          <v-btn color="primary" depressed>
            <v-icon left>{{ mdiPlus }}</v-icon>
            Add
          </v-btn>
        </div>
      </div>

      <div>
        <v-row>
          <v-col
            v-for="stat in stats"
            :key="stat.title"
            cols="12"
            sm="6"
            lg="4"
          >
            <stat-card
              :title="stat.title"
              :value="stat.value"
              :percentage="stat.percentage"
            />
          </v-col>
        </v-row>
      </div>

      <!-- filter controls -->
      <v-row dense class="mt-8" justify="space-between">
        <v-col cols="12" md="6" order="2" order-md="1">
          <div class="d-flex flex-column flex-md-row">
            <div class="pa-2 px-0 px-md-2 order-2 order-md-1">
              <v-chip
                label
                color="primary_alt"
                class="primary--text subtitle-2 mr-3"
                close
                :close-icon="mdiClose"
              >
                All time
              </v-chip>
              <v-chip
                label
                color="primary_alt"
                class="primary--text subtitle-2"
                close
                :close-icon="mdiClose"
              >
                US, AU, +4
              </v-chip>
            </div>
            <div class="pa-2 px-0 px-md-2 order-1 order-md-2">
              <v-btn outlined block color="grey lighten-2">
                <v-icon color="grey darken-3" left>
                  {{ mdiFilterVariant }}
                </v-icon>
                <span class="grey--text text--darken-3">More filters</span>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="auto" order="1" order-md="2">
          <v-text-field
            v-model="search"
            outlined
            placeholder="Search"
            :prepend-inner-icon="mdiMagnify"
            hide-details
            dense
          />
        </v-col>
      </v-row>

      <!--  data table -->
      <v-card outlined class="mt-6" elevation="1">
        <v-data-table
          id="company_table"
          v-model="selected"
          :headers="headers"
          show-select
          checkbox-color="primary"
          :mobile-breakpoint="0"
          :items="companies"
          item-key="id"
          hide-default-footer
          :search="search"
        >
          <template #[`item.name`]="{ item }">
            <v-list-item style="width: auto" class="px-0">
              <v-list-item-avatar size="40">
                <img :src="`/images/company/${item.id}.png`" alt="" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-regular">
                  {{ item.website }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template #[`item.license_use`]="{ item }">
            <v-progress-linear
              v-model="item.license_use"
              color="primary"
              background-color="primary_alt"
              rounded
              height="8"
              style="width: 65px"
              class="mx-4"
            />
          </template>

          <template #[`item.status`]="{ item }">
            <v-chip
              :color="item.status === 'customer' ? '#ecfdf3' : 'grey lighten-4'"
              small
              class="text-capitalize font-weight-medium"
              :class="{
                'success--text': item.status === 'customer',
                'grey--text text--darken-3': item.status === 'churned',
              }"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template #[`item.users`]="{ item }">
            <div class="avatar_group">
              <v-avatar
                v-for="(user, u) in [...item.users.slice(0, 5)]"
                :key="u + 117"
                color="white"
                size="24"
                class="avatar"
              >
                <img :src="user" alt="" />
              </v-avatar>
              <v-avatar
                v-if="item.users.length > 5"
                color="primary_alt"
                class="avatar"
                size="24"
              >
                <span class="primary--text caption font-weight-medium">
                  +{{ item.users.length - 5 }}
                </span>
              </v-avatar>
            </div>
          </template>

          <template #[`item.about.title`]="{ item }">
            <v-list-item dense style="max-width: 310px" class="px-0 py-3">
              <v-list-item-content class="mx-0">
                <v-list-item-title class="subtitle-2 font-weight-regular">
                  {{ item.about.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="subtitle-2 font-weight-regular">
                  {{ item.about.subtitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template #[`item.action`]>
            <div class="d-flex">
              <v-btn icon color="grey darken-2">
                <v-icon size="20">{{ mdiDeleteOutline }}</v-icon>
              </v-btn>
              <v-btn icon color="grey darken-2">
                <v-icon size="20">{{ mdiPencilOutline }}</v-icon>
              </v-btn>
            </div>
          </template>

          <template #footer>
            <div class="py-6 px-8" style="border-top: 1px solid #eaecf0">
              <v-row align="center" justify="space-between">
                <template v-if="$vuetify.breakpoint.smAndUp">
                  <div>
                    <v-btn outlined color="grey lighten-2" class="mr-3">
                      <span class="grey--text text--darken-3">Previous</span>
                    </v-btn>
                    <v-btn color="grey lighten-2" outlined>
                      <span class="grey--text text--darken-3">Next</span>
                    </v-btn>
                  </div>
                  <div
                    class="subtitle-2 font-weight-regular grey--text text--darken-3"
                  >
                    Page 1 of 10
                  </div>
                </template>
                <template v-else>
                  <v-btn icon color="grey darken-2">
                    <v-icon size="20">{{ mdiArrowLeft }}</v-icon>
                  </v-btn>
                  <div class="px-4 subtitle-2 grey--text text--darken-3">
                    Page 1 of 10
                  </div>
                  <v-btn icon color="grey darken-2">
                    <v-icon size="20">{{ mdiArrowRight }}</v-icon>
                  </v-btn>
                </template>
              </v-row>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {
  mdiMagnify,
  mdiCloudUploadOutline,
  mdiPlus,
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiArrowLeft,
  mdiArrowRight,
  mdiFilterVariant,
  mdiClose,
} from '@mdi/js';

export default {
  name: 'IndexPage',
  data: () => ({
    mdiMagnify,
    mdiCloudUploadOutline,
    mdiPlus,
    mdiPencilOutline,
    mdiDeleteOutline,
    mdiArrowLeft,
    mdiArrowRight,
    mdiFilterVariant,
    mdiClose,
    menu: [
      { text: 'Overview', to: '/' },
      { text: 'Notifications', to: '' },
      { text: 'Analytics', to: '' },
      { text: 'Saved reports', to: '' },
      { text: 'Trade history', to: '' },
      { text: 'User reports', to: '' },
    ],
    stats: [
      { title: 'Total customers', value: 2420, percentage: 40 },
      { title: 'Members', value: 1210, percentage: -10 },
      { title: 'Active now', value: 316, percentage: 20 },
    ],
    headers: [
      { text: 'Company', value: 'name' },
      { text: 'License use', value: 'license_use', align: 'center' },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Users', value: 'users', sortable: false },
      { text: 'About', value: 'about.title', sortable: false },
      { text: '', value: 'action', sortable: false },
    ],
    companies: [
      {
        id: 1,
        name: 'Catalog',
        website: 'catalogapp.io',
        about: {
          title: 'Content curating app',
          subtitle: 'Brings all your news into one place',
        },
        license_use: 75,
        status: 'customer',
        users: [...Array(10).fill('/images/Avatar.png')],
      },
      {
        id: 2,
        name: 'Circooles',
        website: 'getcirooles.com',
        about: {
          title: 'Design software',
          subtitle: 'Super lightweight design app',
        },
        license_use: 50,
        status: 'churned',
        users: [...Array(13).fill('/images/Avatar.png')],
      },
      {
        id: 3,
        name: 'Command+R',
        website: 'cmdr.ai',
        about: {
          title: 'Data prediction',
          subtitle: 'AI and machine learning data',
        },
        license_use: 28,
        status: 'customer',
        users: [...Array(7).fill('/images/Avatar.png')],
      },
      {
        id: 4,
        name: 'Hourglass',
        website: 'hourglass.app',
        about: {
          title: 'Productivitiy app',
          subtitle: 'Time management and productivity',
        },
        license_use: 85,
        status: 'customer',
        users: [...Array(5).fill('/images/Avatar.png')],
      },
      {
        id: 5,
        name: 'Layers',
        website: 'getlayers.io',
        about: {
          title: 'Web app integrations',
          subtitle: 'Connect web apps seamlessly',
        },
        license_use: 15,
        status: 'churned',
        users: [...Array(6).fill('/images/Avatar.png')],
      },
      {
        id: 6,
        name: 'Quotient',
        website: 'quotient.co',
        about: {
          title: 'Sales CRM',
          subtitle: 'Web-based sales doc management',
        },
        license_use: 10,
        status: 'customer',
        users: [...Array(11).fill('/images/Avatar.png')],
      },
      {
        id: 7,
        name: 'Sisyphus',
        website: 'sisyphus.com',
        about: {
          title: 'Automation and workflow',
          subtitle: 'Time tracking, invoicing and expenses',
        },
        license_use: 40,
        status: 'customer',
        users: [...Array(9).fill('/images/Avatar.png')],
      },
    ],
    selected: [],
    search: '',
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
};
</script>

<style lang="scss">
#menu_nav {
  border-bottom: 1px solid #eaecf0;

  .v-btn--active {
    &::before {
      background: none;
    }
  }
}

#company_table {
  table,
  td {
    border-bottom: none;
    border-collapse: separate;
  }

  tbody {
    tr {
      background-color: white;

      &:nth-child(odd) {
        background-color: #f9fafb;
      }
    }
  }
}

.avatar_group {
  display: inline-flex;
  text-align: right;
  padding-right: 35px;

  .avatar {
    border-radius: 50%;
    position: relative;
    right: -5px;
    margin-right: -5px;
    z-index: 1;
    border: 1px solid white !important;
  }
}
</style>
