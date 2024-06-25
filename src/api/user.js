import request from '@/utils/request'

export function getUserList () {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function updateOrg (id, orgId) {
  return request({
    url: '/user/org',
    method: 'post',
    params: { id, orgId }
  })
}
