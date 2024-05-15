export const headerLinks = [
    {
      label: 'OverView',
      route: '/',
    },
    {
      label: 'Create Watchlist',
      route: '/events/create',
    },
    {
      label: 'My Watchlists',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }