import request from '@/utils/request'

export function getRegions () {
  return request({
    url: '/region/list',
    method: 'get'
  })
}
