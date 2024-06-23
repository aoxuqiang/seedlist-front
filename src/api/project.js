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
    url: '/common/projectScan',
    method: 'get',
    params: { projectId: id }
  })
}

export function getBpApplyList (id) {
  return request({
    url: '/common/bpApply',
    method: 'get',
    params: { projectId: id }
  })
}

export function getBpSendList (id) {
  return request({
    url: '/common/bpSend',
    method: 'get',
    params: { projectId: id }
  })
}

export function sendBP2Users (projectId, uids) {
  return request({
    url: '/project/sendBP2Users',
    method: 'get',
    params: { projectId, uids }
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

export function changeShow (id, show) {
  return request({
    url: '/project/updateShow',
    params: { id: id, show: show },
    method: 'post'
  })
}
