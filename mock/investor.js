//投资机构列表
const investor = [
  {
    wxUserId: '1',
    name: "test1",
    phone: '1123123123'
  },
  {
    wxUserId: '2',
    name: 'test2',
    phone: '123213123213'
  }
]


module.exports = [
  {
    url: '/vue-element-admin/investor/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: investor
      }
    }
  }
]
