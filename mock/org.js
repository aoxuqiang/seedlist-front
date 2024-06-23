//投资机构列表
const investorOrgList = [
  {
    key: 1,
    name: '腾讯投资',
    desc: '腾讯投资成立于2008年，是腾讯集团的投资部门与核心战略部门之一，主导集团投资相关业务。长期专注于全球范围内消费互联网和产业互联网相关投资，聚焦文娱传媒、消费零售、民生教育、金融科技、企业服务及海外投资等领域，探索前沿创新与未来更多可能性。腾讯投资在过去十多年中总计投资800余家公司，包含百余家上市公司及独角兽企业，投资地域涵盖全球二十多个国家和地区，致力于发现为用户提供长期价值的创业者和企业，并帮助其成长。我们在北京、上海、深圳、香港都设有办公室，拥有一支超过60人的团队。',
    homelink: 'https://www.tencent.com/'
  },
  {
    key: 2,
    name: '阿里巴巴',
    desc: '阿里资本成立于2008年年中，隶属于阿里巴巴集团。使命是通过投资、并购和业务拓展，创造战略和长远财富价值，成为繁荣电子商务生态圈的一支核心力量。阿里资本专注于电子商务及相关行业的投资，积极寻找和挖掘最有潜力的创业型公司，实现少数股权投资或战略并购。阿里巴巴战略投资的总部在杭州，同时在北京和上海设立办公室。',
    homelink: 'https://www.alibabagroup.com'
  }
]

module.exports = [
  {
    url: '/vue-element-admin/investorOrg/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: investor
      }
    }
  },

  {
    url: '/vue-element-admin/investorOrg/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000
      }
    }
  },

  {
    url: '/vue-element-admin/investorOrg/del',
    type: 'post',
    response: _ => {
      return {
        code: 20000
      }
    }
  }
]
