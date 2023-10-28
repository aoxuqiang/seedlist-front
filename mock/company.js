const companyList = [
  {
    key: 1,
    fullName: '测试公司1',
    shortName: '测1',
    address: '北京',
    type: '融资公司'
  },
  {
    key: 2,
    fullName: '测试公司2',
    shortName: '测2',
    address: '上海',
    type: '融资公司'
  },
  {
    key: 3,
    fullName: '测试公司3',
    shortName: '测3',
    address: '上海',
    type: '投资公司'
  },
  {
    key: 4,
    fullName: '测试公司3',
    shortName: '测4',
    address: '上海',
    type: '融资公司'
  }
]

const companyFinancing = [
  {
    "turn": "天使轮",
    "valuation": "100w",
    "amount": "1200w",
    "date": "2023-07",
    "status": {
      "value": 1,
      "desc": "已融资",
    }
  },
  {
    "turn": "A轮",
    "valuation": "1000w",
    "amount": "12000w",
    "date": "2023-08",
    "status": {
      "value": 2,
      "desc": "待融资"
    }
  }
]

const financingStatusList = [
  {
    "value": 1,
    "desc": "已融资",
  },
  {
    "value": 2,
    "desc": "待融资",
  },
]

module.exports = [
  {
    url: '/vue-element-admin/company/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: companyList
      }
    }
  },

  {
    url: '/vue-element-admin/company/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000
      }
    }
  },

  {
    url: '/vue-element-admin/company/del',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
      }
    }
  },

  {
    url: '/vue-element-admin/company/financing',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: companyFinancing
      }
    }
  },

  {
    url: '/vue-element-admin/financing/status/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: financingStatusList
      }
    }
  }

]
