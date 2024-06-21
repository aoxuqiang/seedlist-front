import request from '@/utils/request'

// 获取标签
export function getTags () {
  return request({
    url: '/tag/list',
    method: 'get'
  })
}

// 保存标签 更新或添加
export function saveTag (data) {
  return request({
    url: '/tag/save',
    method: 'post',
    data
  })
}
// 删除标签
export function delTag (id) {
  return request({
    url: '/tag/del',
    method: 'post',
    params: { id: id }
  })
}
