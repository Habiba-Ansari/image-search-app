const axios = require('axios');

class UnsplashService {
  constructor() {
    this.accessKey = process.env.UNSPLASH_ACCESS_KEY;
    this.baseURL = 'https://api.unsplash.com';
  }

  async searchImages(query, page = 1, perPage = 20) {
    try {
      const response = await axios.get(`${this.baseURL}/search/photos`, {
        params: {
          query: query,
          page: page,
          per_page: perPage,
          client_id: this.accessKey
        }
      });

      // Format the response to only include what we need
      const formattedResults = response.data.results.map(image => ({
        id: image.id,
        width: image.width,
        height: image.height,
        color: image.color,
        alt_description: image.alt_description,
        urls: {
          raw: image.urls.raw,
          full: image.urls.full,
          regular: image.urls.regular,
          small: image.urls.small,
          thumb: image.urls.thumb
        },
        links: {
          html: image.links.html,
          download: image.links.download
        },
        user: {
          username: image.user.username,
          name: image.user.name,
          profile_image: image.user.profile_image?.small
        }
      }));

      return {
        total: response.data.total,
        total_pages: response.data.total_pages,
        results: formattedResults
      };

    } catch (error) {
      console.error('Unsplash API error:', error.response?.data || error.message);
      throw new Error('Failed to fetch images from Unsplash');
    }
  }
}

module.exports = new UnsplashService();