const { DataSource } = require("apollo-datasource");

export default class LivestaxAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getOrganizations() {
    const organizations = await this.store.organizations.findAll();
    return organizations.map(user => user.get({ plain: true }));
  }

  async createOrganization({ organization }) {
      // const userId = this.context.user.id;
      console.log('organization', organization);
      // organization['id'] = 101;

      const res = await this.store.organizations.create(organization);
      return res ;
  }
  async isUserPresent() {
    // if (!this.context || !this.context.user) return false;
    // const userId = this.context.user.id;
    // const found = await this.store.trips.findAll({
    //   where: { userId, launchId },
    // });
    const users = await this.store.users.findAll();
    const response = users.map(user => user.get({ plain: true }));
    return response[0];

    const res = await this.store.users
      .findAll()
      .then(response => {
        return response.map(user => user.get({ plain: true }));
      })
      .catch(error => console.log(error));

    console.log("Fetching admin users");
    await this.store.adminUsers
      .findAll()
      .then(response => {
        return response.map(adminUser => adminUser.get({ plain: true }));
      })
      .catch(error => console.log(error));

      return res;
  }
}
