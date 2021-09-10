import { mount, createLocalVue } from '@vue/test-utils';
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import SearchPage from '@/components/searchPage.vue';

const localVue = createLocalVue();

describe('Search page', () => {
  // eslint-disable-next-line global-require
  const users = require('../../src/server/data/users.json');
  localVue.use(VueTypeaheadBootstrap);

  //   let searchComponent;
  let wrapper;

  const mountFunction = (options) => mount(SearchPage, { localVue, ...options });

  beforeEach(() => {
    wrapper = mountFunction({
      query: 'jap',
      users: [],
      selectedUser: 'name',
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
    });
  });

  it('renders search page component', () => {
    const child = wrapper.findComponent(SearchPage);
    expect(child).toBeTruthy();
    const typeHead = wrapper.findComponent(VueTypeaheadBootstrap);
    expect(typeHead).toBeTruthy();
    // expect(typeAhead).toBeTruthy();
  });

  it('Show the list when given a query', async () => {
    wrapper = await mount(VueTypeaheadBootstrap, {
      localVue,
      propsData: {
        data: [
          { name: 'Canada' },
          { name: 'United Kingdom' },
          { name: 'Japan' },
        ],
        value: 'Jap',
        serializer: (t) => t.name,
      },
    });

    await wrapper.vm.$nextTick();
    const child = wrapper.find('input');
    wrapper.find('input').setValue('Can');
    expect(child.isVisible()).toBe(false);
    wrapper.find('input').trigger('focus');
    expect(child.isVisible()).toBe(true);
    console.log(wrapper.find('input').length);
    expect(wrapper.vm.formattedData[0].text).toBe('Japan');
  });
});
