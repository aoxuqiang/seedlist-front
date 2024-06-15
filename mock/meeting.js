const meetingList = [
  {
    id: 1,
    name: '会议1',
    meetingTime: '2024-09-12 12:11:12',
    link: 'http://www.baidu.com',
    project: {
      id: 1,
      name: '项目1'
    }
  },
  {
    id: 2,
    name: '会议2',
    meetingTime: '2024-09-12 12:11:13',
    link: 'http://www.baidu.com',
    project: {
      id: 2,
      name: '项目2'
    }
  }
]

const meeting = {
  id: 2,
  name: '会议2',
  meetingTime: '2024-09-12 12:11:13',
  link: 'http://www.baidu.com',
  project: {
    id: 2,
    name: '项目2'
  }
}

const invistList = [
  {
    'wxUserId': '123',
    'name': '张三',
    'scanTime': '2024-4-16 12:29:00'
  },
  {
    'wxUserId': '456',
    'name': '李四',
    'scanTime': '2024-4-16 12:29:00'
  }
]

const signList = [
  {
    'wxUserId': '12321',
    'name': '张三',
    'sendTime': '2024-4-16 12:29:00'
  }
]

module.exports = [
  // 会议邀请记录
  {
    url: '/meeting/invite/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: invistList
      }
    }
  },
  // 会议报名
  {
    url: '/meeting/sign/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: signList
      }
    }
  },
  // 增加会议
  {
    url: '/meeting/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: meeting
      }
    }
  },
  // 会议详情
  {
    url: '/meeting/detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: meeting
      }
    }
  },

  // 会议列表
  {
    url: '/meeting/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: meetingList
      }
    }
  },

  // 删除项目
  {
    url: '/meeting/del',
    type: 'post',
    response: _ => {
      return {
        code: 20000
      }
    }
  }
]
