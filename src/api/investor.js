import request from '@/utils/request'

export function getInvestorList () {
    return request({
        url: '/vue-element-admin/investor/list',
        method: 'get'
    })
}

export function saveInvestor (data) {
    return request({
        url: '/vue-element-admin/investor/save',
        method: 'post',
        data
    })
}

export function delInvestor (id) {
    return request({
        url: '/vue-element-admin/investor/del',
        method: 'post',
        params: { id: id }
    })
}


