const projects = [
  {
    id: 1,
    pno: '001',
    name: '龙俊精密',
    desc: '致力于....',
    company: {
      id: 1,
      name: '测试公司'
    },
    tags: [
      { id: 1, name: '应材' },
      { id: 2, name: '种子轮' }
    ],
    product: '测试产品1、测试产品2',
    custom: '测试客户',
    background: '测试团队背景',
    domain: '测试应用领域',
    competitor: '测试竞争对手',
    remark: '测试项目备注',
    status: 0
  }
]

const project = {
  id: 1,
  pno: '001',
  name: '龙俊精密',
  desc: '致力于....',
  company: {
    id: 1,
    name: '测试公司'
  },
  tags: [
    { id: 1, name: '应材' },
    { id: 2, name: '种子轮' }
  ],
  product: '测试产品1、测试产品2',
  custom: '测试客户',
  team: '测试团队背景',
  domain: '测试应用领域',
  competitor: '测试竞争对手',
  remark: '测试项目备注'
}

module.exports = [
  // 项目列表
  {
    url: '/project/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: projects
      }
    }
  },
  // 根据id 查询项目
  {
    url: '/project/detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: project
      }
    }
  },

  // 删除项目
  {
    url: '/project/del',
    type: 'post',
    response: _ => {
      return {
        code: 20000
      }
    }
  }
]
