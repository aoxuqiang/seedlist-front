const projects = [
  {
    key: '1',
    name: '龙俊精密',
    description: '致力于....',
    track: '半导体',
    tags: [
      { id: 1, name: '应材' },
      { id: 2, name: '种子轮' }
    ]
  }
]

const project = {
  id: 1,
  pNo: 'P001',
  name: '测试项目',
  tags: [
    {
      id: 1,
      name: 'tag1'
    },
    {
      id: 2,
      name: 'tag2'
    }
  ]
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
