<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        Hello, {{ currentUser.first_name }}!
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                Project of CERN
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <!-- <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="px-3 py-2 h-12 border border-solid border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form> -->

        

        <div>
          <sidebar-basic />
        </div>

        <div v-if="showRoles().includes('admin')">
          <sidebar-admin />
        </div>

        <div v-if="!showRoles().includes('ess')">
          <sidebar-charts />
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

import SidebarAdmin from "./SidebarAdmin.vue";
import SidebarBasic from './SidebarBasic.vue';
import SidebarCharts from './SidebarCharts.vue';

export default {
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function(classes) {
      this.collapseShow = classes;
    },

    showRoles() {
      var rolesData = "";
      var data = this.currentUser.roles;
      console.log("data" + data)
      try {
        for (var i = 0; i < data.length; i++) {
          rolesData += data[i].name + ", ";
        }
        return rolesData.slice(0, -2);
      } finally {
        rolesData = null;
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    console.log(this.currentUser.roles[0]);
  },

  components: {
    NotificationDropdown,
    UserDropdown,
    SidebarAdmin,
    SidebarBasic,
    SidebarCharts
  },
};
</script>
