const { RESTDataSource } = require('apollo-datasource-rest');

export default class SpotifyAPI extends RESTDataSource {
  
  constructor() {
    super();
    this.baseURL = 'https://any-api.com:8443/https://api.spotify.com/v1/browse/';
  }
  willSendRequest(request) {
    request.headers.set('authorization', 'Bearer BQAUW2x_1AYcDtB8xk0KuM0Pl7TDl-Vnq4NJpM89nFQC6FtYv47cU3v58qxUvo_x0wqKLTVbHZoEyo8v7BFXJHqkSR9vViZUXIhiWd-79QXmk6FR_O5EfBJmlOF1Yh64s4vGHayhz7vFMlY8h5Dh0h6rrsMt3id6Fw');

    request.params.set('limit', 20);
    request.params.set('offset', 0);
  }
// leaving this inside the class to make the class easier to test
albumReducer(album) {
    return {
      id: `${album.id}`,
      name: `${album.name}`,
      release_date:  `${album.release_date}`,
      artist  : `${album.artists[0].name}`,
      artist_id :  `${album.artists[0].id}`
    };
  }

  async getAllNewReleases() {
    const response = await this.get('new-releases');
     
    // transform the raw launches to a more friendly
    const res=  Array.isArray(response.albums.items)
      ? response.albums.items.map(album => this.albumReducer(album)) : [];
      return res;
  }

  async getLaunchById({ launchId }) {
    const res = await this.get('launches', { launchId });
    return this.launchReducer(res[0]);
  }

  async getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  }
}


