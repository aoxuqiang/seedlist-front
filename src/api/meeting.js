import request from '@/utils/request'

export function getProjectMeetings (id) {
  return request({
    url: '/meeting/project',
    method: 'get',
    params: { projectId: id }
  })
}

export function saveMeetingInvite (meetingId, uids) {
  return request({
    url: '/meeting/invite',
    method: 'post',
    params: { meetingId, uids }
  })
}

export function getMeetingInviteList (id) {
  return request({
    url: '/meeting/invite/list',
    method: 'get',
    params: { meetingId: id }
  })
}

export function getMeetingApplyList (id) {
  return request({
    url: '/meeting/apply/list',
    method: 'get',
    params: { meetingId: id }
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

export function saveMeeting (data) {
  return request({
    url: '/meeting/save',
    method: 'post',
    data
  })
}
