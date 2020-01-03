export default {
  items: [
    {
      name: 'DASHBOARD',
      url: '/dashboard',
      icon: 'icon-grid',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: 'ADMIN',
      url: '/registration',
      icon: 'icon-people'
    },
    {
      name: 'NEWS',
      url: '/news',
      icon: 'icon-globe',
    },
    /*{
      name: 'REGISTRATION',
      url: '/registration',
      icon: 'icon-plus',
      children: [
        {
          name: 'NEW MEMBER',
          url: '/registration/member',
          icon: 'icon-people'
        },
        {
          name: 'RECORDS',
          url: '/registration/record',
          icon: 'fa fa-history'
        },
      ]
    },*/
    {
      name: 'NETWORK',
      url: '/network',
      icon: 'fa fa-sitemap',
      children: [
        {
          name: 'GENEALOGY',
          url: '/network/genealogy',
          icon: 'icon-people'
        },
        {
          name: 'MEMBER INFO',
          url: '/network/memberInfo',
          icon: 'fa fa-address-card'
        },
      ]
    },
    {
      name: 'DEPOSIT',
      url: '/deposit',
      icon: 'icon-wallet',
      children: [
        {
          name: 'DEPOSIT',
          url: '/deposit/',
          icon: 'fa fa-money'
        },
        {
          name: 'DEPOSIT RECORDS',
          url: '/deposit/records',
          icon: 'fa fa-history'
        },
      ]
    },
    {
      name: 'PURCHASE',
      url: '/purchase',
      icon: 'icon-credit-card',
    },
    {
      name: 'WITHDRAW',
      url: '/withdraw',
      icon: 'fa fa-reply',
    },
    
    // {
    //   name: 'DASHBOARD',
    //   url: '/coreuidashboard',
    //   icon: 'icon-grid',
    // },
    // {
    //   name: 'My Wallet',
    //   url: '/wallet',
    //   icon: 'icon-wallet',
    //   children: [
    //     {
    //       name: 'My Wallet',
    //       url: '/wallet/myWallet',
    //       icon: 'icon-wallet'
    //     },
    //     {
    //       name: 'Transaction History',
    //       url: '/wallet/transaction-history',
    //       icon: 'fa fa-history'
    //     },
    //   ]
    // },
    // {
    //   name: 'Bonus',
    //   url: '/bonus',
    //   icon: 'fa fa-dollar',
    // },
    // {
    //   name: 'Investment',
    //   url: '/invest',
    //   icon: 'icon-chart',
    // },
  ]
}
