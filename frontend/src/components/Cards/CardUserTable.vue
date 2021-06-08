<template>
  <div>
    <modal-user :data="this.data_row" />
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 class="text-black text-xl font-semibold">
              Users - Data Table
            </h2>
          </div>
        </div>
      </div>
      <div class="p-4 flex-auto">
        <!-- Chart -->
        <div class="relative">
          <vue-good-table
            :columns="columns"
            :lineNumbers="true"
            :rows="dataUser"
            @on-row-click="onRowClick"
            :search-options="{
              enabled: true,
            }"
            :pagination-options="{
              enabled: true,
            }"
          >
            <div slot="table-actions">
              <download-csv
                class="bg-blue-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                :data="dataUser.email"
                type="button"
                name="data_user_table.csv"
              >
                <i class="fas fa-download"></i>
                Download CSV
              </download-csv>
            </div>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalUser from "@/components/Modals/ModalUser.vue";

export default {
  data() {
    return {
      //Object with dataUser state. dataUser store First Name, Last name, Middle Name and etc. of the choosen user.
      dataUser: null,

      //data_row is state for user that is choose from table.
      data_row: null,

      avatars: [],
      roles: [],
      index: [],

      columns: [
        {
          label: "First Name",
          field: "first_name",
          filterable: true,
        },
        {
          label: "Middle Name",
          field: "middle_name",
          filterable: true,
        },
        {
          label: "Last Name",
          field: "last_name",
          filterable: true,
        },
        {
          label: "Created",
          field: "created_at",
          filterable: true,
        },
      ],
      rows: this.dataUser,
    };
  },
  components: { ModalUser },

  /**
   *   Get all User with vuex custom state management system.
   */
  mounted() {
    this.$store.dispatch("userTable/getAllUsers").then(() => {
      this.dataUser = this.$store.state.userTable.usersData; //Store result from api request in state
    });
  },

  methods: {
    onRowClick(params) {
      // params.row - row object
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument
      // indicates selected or not
      // params.event - click event
      this.data_row = params.row;

      //
      this.$modal.show("user");
    },
  },

  props: {
    color: {
      default: "light",
      validator: function(value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
};
</script>
