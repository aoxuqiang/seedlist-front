import request from '@/utils/request'

export function getInvestorList () {
  return request({
    url: '/investor/list',
    method: 'get'
  })
}

export function saveInvestor (data) {
  return request({
    url: '/investor/save',
    method: 'post',
    data
  })
}

export function delInvestor (id) {
  return request({
    url: '/investor/del',
    method: 'post',
    params: { id: id }
  })
}
