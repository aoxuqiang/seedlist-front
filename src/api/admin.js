import request from '@/utils/request'

/**
 * 发送登录请求
 * @param {*} data
 * @returns
 */
export function login (data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    // url: '/vue-element-admin/user/logout',
    url: '/amdin/logout',
    method: 'post'
  })
}
