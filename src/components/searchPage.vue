/* eslint-disable vue/valid-v-bind */
<template>
<div class="container">
  <div class="row justify-content-md-start align-center">
    <div class="col-4 left-align">
      <label>Search by </label>
      <select class="form-control" aria-label="Search by" v-model="searchby">
        <option value="name">Name</option>
        <option value="alias">Alias Name</option>
        <option value="email">Email</option>
      </select>
    </div>
    <div class="col-4 left-align">
      <a href="#" class="btn btn-sm btn-primary" @click="showUpdateForm">Add new User</a>
    </div>
  </div>
  <div class="row justify-content-md-left">
    <div class="col">
      <vue-typeahead-bootstrap
          v-model="query"
          :data="users"
          :serializer="user => user[searchby]? user[searchby]: 'No user Found'"
          @hit="selectedUser = $event"
          @input='lookupUser'
           placeholder="Search Users"
        />
    </div>
  </div>
  <div class="row justify-content-md-start" v-if="selectedUser">
    <div class="col-4">
       <!-- {{ ticketDetail }}
        {{selectedUser}} {{ orgDetail }} -->
        <div class="card">
          <div class="card-body">
             <h5 class="card-title">{{ selectedUser.name }}</h5>
              <p class="card-text">Status:  {{ selectedUser.signature}}</p>
              <p class="card-text placeholder-glow" v-if="!orgDetail">
                <span class="placeholder col-7"></span>
                </p>
              <p class="card-text card-subTitle" v-if="orgDetail">
                Company: {{ orgDetail.name }}
              </p>
              <p class="card-text" v-if="ticketDetail">
                Tickets Created: {{ ticketDetail.length }}
              </p>
              <p class="card-text" v-if="assignedTickets">
                Tickets assigned: {{ assignedTickets.length }}
              </p>
              <p class="card-text" v-if="createdAt">
                User Created: {{ createdAt }}
              </p>
              <div class="card-badges">
                <span class="badge bg-primary"
                  v-for="tag in selectedUser.tags"
                  :key="tag"> {{ tag }}</span>
              </div>
              <a href="#" class="btn btn-sm btn-primary">Edit</a>
          </div>
        </div>
    </div>
  </div>
  <div class="row justify-content-md-start userForm" v-if="showForm">
    <div class="card form-card">
      <form   @submit="checkForm">
        <div class="row">
          <div class="col-6">
            <input
              class="form-control"
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div class="col-6">
            <input
              class="form-control"
              id="input-2"
              v-model="form.name"
              placeholder="Enter name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <input
              class="form-control"
              id="input-3"
              v-model="form.alias"
              type="email"
              placeholder="Alias name"
              required
            />
          </div>
          <div class="col-6">
            <input
              class="form-control"
              id="input-4"
              v-model="form.status"
              placeholder="Status"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <input class="form-control" id="input-5" type="phone"
            placeholder="Mobile" required/>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <a href="#" class="btn btn-sm btn-primary" @click="showUpdateForm">Add User</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>
.card {
  margin-top: 12px;
  text-align: left;
}
.card-text {
  font-size: 14px;
}
.card-badges {
  display: flex;
  padding: 12px 0;
  justify-content: space-between;
  color: #fff;
}

select {
  padding: 12px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 12px;
}

.placeholder {
  background-color: rgb(33, 37, 41);
  opacity: 0.5;
  width: 100%;
}

.left-align {
  text-align: left;
}

.align-center {
  align-items: center;
}

.userForm {
  padding: 12px 0;
}

.userForm .row {
  padding: 0 0 12px;
}

.form-card {
  padding: 12px;
}
</style>

<script>
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  name: 'SearchPage',
  data: () => ({
    query: '',
    users: [],
    selectedUser: null,
    orgDetail: null,
    ticketDetail: null,
    assignedTickets: null,
    createdAt: null,
    searchby: null,
    showForm: false,
    formErrors: [],
    form: {
      email: '',
      name: '',
      alias: '',
      status: '',
      phone: '',
    },
  }),
  components: {
    VueTypeaheadBootstrap,
  },
  created() {
    this.getSelectedUserDetails = debounce(this.getUserDetails, 500);
  },
  watch: {
    selectedUser() {
      this.getSelectedUserDetails();
    },
  },
  methods: {
    lookupUser: debounce(function () {
      this.$store
        .dispatch('userList')
        .then((result) => {
          this.users = result;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500),
    checkForm(e) {
      e.preventDefault();
      this.$store
        .dispatch('newUser', this.form);
    },

    getUserCreatedDate() {
      const str = this.selectedUser?.created_at.replaceAll(' ', '');
      const d = new Date(str);
      this.createdAt = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },

    showUpdateForm() {
      this.showForm = !this.showForm;
    },

    async getUserDetails() {
      this.getUserCreatedDate();
      const req = { orgId: this.selectedUser.organization_id };

      axios.post('http://localhost:3000/fetchOrg', req)
        .then((result) => {
          this.orgDetail = result.data?.OrgDetails;
        })
        .catch();

      // eslint-disable-next-line no-underscore-dangle
      const ticketReq = { userId: this.selectedUser._id };
      axios.post('http://localhost:3000/fetchTickets', ticketReq)
        .then((result) => {
          this.ticketDetail = result.data?.createdTickets;
          this.assignedTickets = result.data?.assignedTickets;
        })
        .catch();
    },
  },
};
</script>
