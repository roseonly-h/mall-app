// 权限路由名称
const roleRoute = {
    coustomer: [{
            name: 'Product'
        },
        {
            name: 'ProductList'
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'ProductEdit'
        },
    ],
    admin: [{
            name: 'Product'
        },
        {
            name: 'ProductList'
        },
        {
            name: 'ProductEdit'
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'Category'
        }
    ]
}


// 过滤没有权限的路由
export default function getMenuRoutes(role, routes) {
    // console.log(role, routes)
    // 获取有权限的路由
    const allowRoutesName = roleRoute[role].map(item => item.name)
    // 传入的所有的路由与权限路由名称进行匹配
    const resultRoutes = routes.filter(r => {
        const obj = r
        if (allowRoutesName.indexOf(r.name) !== -1) {
            const {
                children
            } = obj
            // 匹配到其子路由继续匹配
            obj.children = children.filter(c => allowRoutesName.indexOf(c.name) !== -1)
            return true
        }
        return false
    })
    return resultRoutes
}