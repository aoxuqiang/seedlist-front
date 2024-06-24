import request from '@/utils/request'

// 获取标签
export function getIndustries () {
  return request({
    url: '/industry/list',
    method: 'get'
  })
}

// 保存标签 更新或添加
export function saveIndustry (data) {
  return request({
    url: '/industry/save',
    method: 'post',
    data
  })
}
// 删除标签
export function delIndustry (id) {
  return request({
    url: '/industry/del',
    method: 'post',
    params: { id: id }
  })
}
