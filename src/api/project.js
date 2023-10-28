import request from '@/utils/request'

export function getProjects() {
  return request({
    url: '/vue-element-admin/project/list',
    method: 'get'
  })
}

export function delProject(key) {
  return request({
    url: '/vue-element-admin/project/del',
    params: { id: key },
    method: 'post'
  })
}
