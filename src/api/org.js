import request from '@/utils/request'

export function getOrgList () {
  return request({
    url: '/org/list',
    method: 'get'
  })
}

export function saveOrg (data) {
  return request({
    url: '/org/save',
    method: 'post',
    data
  })
}

export function delOrg (id) {
  return request({
    url: '/org/list',
    method: 'post',
    params: { id }
  })
}

