const projects = [
    {
        key: 1,
        name: 'tag1'
    },
    {
        key: 2,
        name: 'tag2'
    }
]

module.exports = [
    // user login
    {
        url: '/vue-element-admin/tag/list',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: projects
            }
        }
    },

    //del project 
    {
        url: '/vue-element-admin/tag/save',
        type: 'post',
        response: _ => {
            return {
                code: 20000
            }
        }
    },
    
    {
        url: '/vue-element-admin/tag/del',
        type: 'post',
        response: _ => {
            return {
                code: 20000
            }
        }
    }
]
