import request from '@/utils/request'

export function getMeetingInviteList (id) {
  return request({
    url: '/meeting/invite/list?id=' + id,
    method: 'get'
  })
}

export function getMeetingSignList (id) {
  return request({
    url: '/meeting/sign/list?id=' + id,
    method: 'get'
  })
}

export function getMeeting (id) {
  return request({
    url: '/meeting/detail?id=' + id,
    method: 'get'
  })
}

export function getMeetingList () {
  return request({
    url: '/meeting/list',
    method: 'get'
  })
}

export function delMeeting (id) {
  return request({
    url: '/meeting/del',
    params: { id },
    method: 'post'
  })
}

export function saveMeeting (metting) {
  return request({
    url: '/meeting/save',
    body: metting,
    method: 'post'
  })
}
