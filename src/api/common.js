import request from '@/utils/request'

export function getMoney () {
  return request({
    url: '/common/getMoney',
    method: 'get'
  })
}

