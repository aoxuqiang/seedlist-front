import request from '@/utils/request'

// 获取公司列表
export function getCompanyList () {
  return request({
    url: '/vue-element-admin/company/list',
    method: 'get'
  })
}

// 保存公司 更新或添加
export function saveCompany (data) {
  return request({
    url: '/vue-element-admin/company/save',
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
    url: '/vue-element-admin/company/financing/save',
    method: 'post',
    data
  })
}

export function getCompanyFinancing (companyId) {
  return request({
    url: '/vue-element-admin/company/financing/list',
    method: 'get',
    params: { companyId: companyId }
  })
}

export function delCompanyFinancing (id) {
  return request({
    url: '/vue-element-admin/company/financing/del',
    method: 'post',
    params: { id: id }
  })
}

export function getFinancingStatusList () {
  return request({
    url: '/vue-element-admin/financing/status/list',
    method: 'get'
  })
}