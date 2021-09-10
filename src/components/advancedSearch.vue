<template>
    <div>
        <input type="text" class="SearchInput"
          v-model="query" @keydown="lookupUser"  @blur="reset"/>
        <transition-group name="fade" tag="ul" class="Results">
            <li v-for="item in filtered" :key="item">
                <span>
                    <strong>{{ item.name  }}</strong> - <small>{{ item._id  }}</small><br>
                </span>
            </li>
        </transition-group>
        <p v-show="isEmpty">Sorry, but we can't find any match for given term :( </p>
    </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'AdvancedSearch',
  props: {
    filterKey: {
      type: String,
      required: true,
    },
    startAt: {
      type: Number,
      default: 3,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    items: [],
    query: '',
  }),
  computed: {
    filtered() {
      if (this.query.length >= this.startAt) {
        return this.items.filter(
          (item) => item[this.filterKey].toLowerCase().indexOf(this.query.toLowerCase()) > -1,
        );
      }

      return false;
    },
    isEmpty() {
      if (typeof this.filtered === 'undefined') {
        return false;
      }
      return this.filtered.length < 1;
    },
  },
  methods: {
    lookupUser: debounce(function () {
      this.$store
        .dispatch('userList')
        .then((result) => {
          this.items = result;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500),
    reset() {
      this.query = '';
    },
  },
};
</script>

<style>
    .SearchInput {
        width: 100%;
        padding: 1.5em 1em;
        font-size: 1em;
        outline: 0;
        border: 5px solid #41B883;
    }
    .Results {
        margin: 0;
        padding: 0;
        text-align: left;
        position: relative;
    }
    .Results li {
        background: rgba(53, 73, 94, 0.3);
        margin: 0;
        padding: 1em;
        list-style: none;
        width: 100%;
        border-bottom: 1px solid #394E62;
        transition: ease-in-out 0.5s;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
