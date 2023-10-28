const projects = [
    {
        key: '1',
        name: '龙俊精密',
        description: '致力于....',
        track: '半导体',
        tags: [
            { id: 1, name: '应材' },
            { id: 2, name: '种子轮' }
        ],
    }
]

module.exports = [
    // user login
    {
        url: '/vue-element-admin/project/list',
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
        url: '/vue-element-admin/project/del',
        type: 'post',
        response: _ => {
            return {
                code: 20000
            }
        }
    }
]
