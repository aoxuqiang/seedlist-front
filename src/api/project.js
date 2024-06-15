import request from '@/utils/request'

export function getProjects () {
  return request({
    url: '/project/list',
    method: 'get'
  })
}

export function getProject (id) {
  return request({
    url: '/project/detail',
    method: 'get',
    params: { id: id }
  })
}

export function delProject (key) {
  return request({
    url: '/project/del',
    params: { id: key },
    method: 'post'
  })
}

export function sendProject (users, projectId) {
  return request({
    url: '/project/send',
    params: { users: users, projectId: projectId },
    method: 'post'
  })
}
