import { defineStore } from 'pinia';

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [
      {
        id: 1,
        title: 'Dolor',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis augue ac elit dictum dignissim in eu dolor. Fusce finibus libero nulla. Quisque sit amet odio vel velit fringilla tempus sit amet a risus. Aenean congue elit et purus dictum, at dictum diam cursus. Nam purus mi, placerat nec vulputate a, mollis sit amet elit. Fusce scelerisque lectus eget semper sodales. Nunc leo risus, varius in ornare sed, iaculis ut erat. Nullam dictum sed odio vel pretium. Fusce eu felis hendrerit, iaculis ipsum sed, maximus libero. Ut fringilla aliquam leo id sodales. Vestibulum magna urna, iaculis sed sodales ac, tincidunt vitae dolor. Etiam pharetra et magna eget semper. Vivamus orci nulla, auctor et accumsan non, euismod a leo. Integer at nisl eget est porta dignissim.',
        imageUrl: 'https://img.decrypt.co/insecure/rs:fit:1536:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2022/06/burn-baby-burn-gID_7.jpg@webp',
        date: '2023-08-16',
        source: 'Nullam sagittis neque magna',
      },
      {
        id: 2,
        title: 'Sit amet',
        content: 'Donec augue urna, bibendum quis nulla eget, lacinia tincidunt arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nunc pharetra pellentesque eros, commodo varius purus rutrum eget. Vivamus rhoncus imperdiet dui, et rhoncus nisl vulputate sit amet.',
        imageUrl: 'https://thedefiant.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6oftkxoa%2Fproduction%2Fe680e062802c747879cb5e4ce275babbe60453fa-880x495.jpg&w=828&q=75',
        date: '2023-08-15',
        source: 'Aliquam.',
      },
      {
        id: 3,
        title: 'Dolor',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis augue ac elit dictum dignissim in eu dolor. Fusce finibus libero nulla. Quisque sit amet odio vel velit fringilla tempus sit amet a risus. Aenean congue elit et purus dictum, at dictum diam cursus. Nam purus mi, placerat nec vulputate a, mollis sit amet elit. Fusce scelerisque lectus eget semper sodales. Nunc leo risus, varius in ornare sed, iaculis ut erat. Nullam dictum sed odio vel pretium. Fusce eu felis hendrerit, iaculis ipsum sed, maximus libero. Ut fringilla aliquam leo id sodales. Vestibulum magna urna, iaculis sed sodales ac, tincidunt vitae dolor. Etiam pharetra et magna eget semper. Vivamus orci nulla, auctor et accumsan non, euismod a leo. Integer at nisl eget est porta dignissim.',
        imageUrl: 'https://img.decrypt.co/insecure/rs:fit:1536:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2022/06/burn-baby-burn-gID_7.jpg@webp',
        date: '2023-08-16',
        source: 'Nullam sagittis neque magna',
      },
      {
        id: 4,
        title: 'Sit amet',
        content: 'Donec augue urna, bibendum quis nulla eget, lacinia tincidunt arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nunc pharetra pellentesque eros, commodo varius purus rutrum eget. Vivamus rhoncus imperdiet dui, et rhoncus nisl vulputate sit amet.',
        imageUrl: 'https://thedefiant.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6oftkxoa%2Fproduction%2Fe680e062802c747879cb5e4ce275babbe60453fa-880x495.jpg&w=828&q=75',
        date: '2023-08-15',
        source: 'Aliquam.',
      },
      {
        id: 5,
        title: 'Dolor',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis augue ac elit dictum dignissim in eu dolor. Fusce finibus libero nulla. Quisque sit amet odio vel velit fringilla tempus sit amet a risus. Aenean congue elit et purus dictum, at dictum diam cursus. Nam purus mi, placerat nec vulputate a, mollis sit amet elit. Fusce scelerisque lectus eget semper sodales. Nunc leo risus, varius in ornare sed, iaculis ut erat. Nullam dictum sed odio vel pretium. Fusce eu felis hendrerit, iaculis ipsum sed, maximus libero. Ut fringilla aliquam leo id sodales. Vestibulum magna urna, iaculis sed sodales ac, tincidunt vitae dolor. Etiam pharetra et magna eget semper. Vivamus orci nulla, auctor et accumsan non, euismod a leo. Integer at nisl eget est porta dignissim.',
        imageUrl: 'https://img.decrypt.co/insecure/rs:fit:1536:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2022/06/burn-baby-burn-gID_7.jpg@webp',
        date: '2023-08-16',
        source: 'Nullam sagittis neque magna',
      },
      {
        id: 6,
        title: 'Sit amet',
        content: 'Donec augue urna, bibendum quis nulla eget, lacinia tincidunt arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nunc pharetra pellentesque eros, commodo varius purus rutrum eget. Vivamus rhoncus imperdiet dui, et rhoncus nisl vulputate sit amet.',
        imageUrl: 'https://thedefiant.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6oftkxoa%2Fproduction%2Fe680e062802c747879cb5e4ce275babbe60453fa-880x495.jpg&w=828&q=75',
        date: '2023-08-15',
        source: 'Aliquam.',
      },
    ],
  }),
});
