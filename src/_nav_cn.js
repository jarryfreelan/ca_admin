export default {
  items: [
    {
      name: '主页',
      url: '/dashboard',
      icon: 'icon-grid',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: '个人资料',
      url: '/profile',
      icon: 'icon-user',
    },
    {
      name: '注册',
      url: '/registration',
      icon: 'icon-plus',
      children: [
        {
          name: '新会员',
          url: '/registration/member',
          icon: 'icon-people'
        },
        {
          name: '注册记录',
          url: '/registration/record',
          icon: 'fa fa-history'
        },
      ]
    },
    {
      name: '团队资料',
      url: '/network',
      icon: 'fa fa-sitemap',
      children: [
        {
          name: '组织表',
          url: '/network/genealogy',
          icon: 'icon-people'
        },
        {
          name: '会员资料',
          url: '/network/memberinfo',
          icon: 'fa fa-address-card'
        },
      ]
    },
    {
      name: '充值',
      url: '/deposit',
      icon: 'icon-wallet',
      children: [
        {
          name: '充值',
          url: '/deposit/',
          icon: 'fa fa-money'
        },
        {
          name: '充值记录',
          url: '/deposit/records',
          icon: 'fa fa-history'
        },
      ]
    },
    {
      name: '购买配套',
      url: '/purchase',
      icon: 'icon-credit-card',
    },
    {
      name: '提款',
      url: '/withdraw',
      icon: 'fa fa-reply',
    },
    {
      name: '资源动态',
      url: '/news',
      icon: 'icon-globe',
    },
    // {
    //   name: 'DASHBOARD',
    //   url: '/coreuidashboard',
    //   icon: 'icon-grid',
    // },
    // {
    //   name: '钱包',
    //   url: '/wallet',
    //   icon: 'icon-wallet',
    //   children: [
    //     {
    //       name: '我的钱包',
    //       url: '/wallet/myWallet',
    //       icon: 'icon-wallet'
    //     },
    //     {
    //       name: '交易记录',
    //       url: '/wallet/transaction-history',
    //       icon: 'fa fa-history'
    //     },
    //   ]
    // },
    // {
    //   name: '奖金',
    //   url: '/bonus',
    //   icon: 'fa fa-dollar',
    // },
    // {
    //   name: '投资',
    //   url: '/invest',
    //   icon: 'icon-chart',
    // },
    // {
    //   name: '资源动态',
    //   url: '/news',
    //   icon: 'icon-speech',
    // },
  ]
}
