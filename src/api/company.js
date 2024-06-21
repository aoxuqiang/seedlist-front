import request from '@/utils/request'

// 获取公司列表
export function getCompanyList () {
  return request({
    url: '/company/list',
    method: 'get'
  })
}

// 保存公司 更新或添加
export function saveCompany (data) {
  return request({
    url: '/company/save',
    method: 'post',
    data
  })
}
// 删除公司
export function delCompany (id) {
  return request({
    url: '/vue-element-admin/company/del',
    method: 'post',
    params: { id: id }
  })
}

export function saveCompanyFinancing (data) {
  return request({
    url: '/company/financing/save',
    method: 'post',
    data
  })
}

export function getCompanyFinancing (companyId) {
  return request({
    url: '/company/financing/list',
    method: 'get',
    params: { companyId: companyId }
  })
}

export function delCompanyFinancing (id) {
  return request({
    url: '/company/financing/del',
    method: 'post',
    params: { id: id }
  })
}

export function getFinancingStatusList () {
  return request({
    url: '/financing/status/list',
    method: 'get'
  })
}
