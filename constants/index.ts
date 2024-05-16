export const headerLinks = [
    {
      label: 'OverView',
      route: '/',
    },
    {
      label: 'Create Watchlist',
      route: '/watchlist/create',
    },
    {
      label: 'My Watchlists',
      route: '/watchlist/get-watchlists',
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

  export const symbolsname =[
    {symbol: "TSCO.LON",},
    {symbol:"TSCDF"},
    {symbol:"TSCDY"},
    {symbol:"TCO2.FRK"},
    {symbol:"TCO0.FRK"}
  ]
export const Watchlists =[
  {id:"Core WitchList"},
  {id:"A WitchList"},
  {id:"B WitchList"},
  {id:"C WitchList"},
]