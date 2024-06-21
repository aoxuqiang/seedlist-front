import request from '@/utils/request'

export function saveProject (data) {
  return request({
    url: '/project/save',
    method: 'post',
    data
  })
}

export function getProjects () {
  return request({
    url: '/project/list',
    method: 'get'
  })
}

export function getScanList (id) {
  return request({
    url: '/event/list',
    method: 'get',
    params: { projectId: id }
  })
}

export function postBP (id) {
  return request({
    url: '/wx/sendBP',
    method: 'get',
    params: { eventId: id }
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
