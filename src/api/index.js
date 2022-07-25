import serverAxios from '../axios';

/**
 * 获取权限列表
 * @returns Promise
 */
export const getMenuSide = () => {
    return serverAxios({
        method: 'get',
        url: '/rights?_embed=children'
    })
}

export const getRights = () => {
    return serverAxios({
        method: 'get',
        url: '/rights'
    })
}

export const getChildren = () => {
    return serverAxios({
        method: 'get',
        url: '/children'
    })
}

/**
 *  删除权限项
 */
export const deleteMenuItem = (data) => {
    let url = '';
    // 利用 grade 的值来判断是父节点还是子节点
    if(data.grade === 1){
        url = `/rights/${data.id}`;
    }else{
        url = `/children/${data.id}`;
    }
    return serverAxios({
        method: 'delete',
        url
    })
}

/**
 * 修改权限
 */
export const patchMenuItem = (data) => {
    let url = '';
    // 利用 grade 的值来判断是父节点还是子节点
    if(data.grade === 1){
        url = `/rights/${data.id}`;
    }else{
        url = `/children/${data.id}`;
    }
    return serverAxios({
        method: 'patch',
        url,
        data
    })
}

/**
 *  获取角色列表
 */
export const getRoleList = () => {
    return serverAxios({
        method: 'get',
        url: '/roles'
    })
}

/**
 *  删除角色权限
 */
export const deleteRole = (data) => {
    return serverAxios({
        method: 'delete',
        url: `/roles/${data.id}`
    })
}

/**
 * 修改角色权限
 */
export const updateRole = (id, rights) => {
    return serverAxios({
        method: 'patch',
        url: `/roles/${id}`,
        data: {
            rights
        }
    })
}

/**
 *  添加用户
 */
export const addUser = (data) => {
    return serverAxios({
        method: 'post',
        url: '/users',
        data
    })
}

// 获取用户列表
export const getUser = () => {
    return serverAxios({
        method: 'get',
        url: '/users?_expand=role',
    })
}

/**
 * 删除用户
 */
 export const deleteUser = (data) => {
    return serverAxios({
        method: 'delete',
        url: `/users/${data.id}`,
    })
}

/**
 *  更新用户数据
 */
export const updateUser = (data) => {
    return serverAxios({
        method: 'patch',
        url: `/users/${data.id}`,
        data
    })
}

// 获取区域列表
export const getRegion = () => {
    return serverAxios({
        method: 'get',
        url: '/regions',
    })
}

/**
 *  登陆
 */
export const loginUser = (data) => {
    return serverAxios({
        method: 'get',
        url: `/users?username=${data.username}&password=${data.password}&_expand=role`
    })
}

/**
 *  获取分类信息
 */
export const getCategories = () => {
    return serverAxios({
        method: 'get',
        url: '/categories'
    })
}

/**
 *  删除分类
 */
export const deleteCategory = id => {
    return serverAxios({
        method: 'delete',
        url: `/categories/${id}`
    })
}

/**
 * 编辑分类
 */
export const editCategory = data => {
    return serverAxios({
        method: 'patch',
        url: `/categories/${data.id}`,
        data
    })
}

/**
 *  添加新闻
 */
export const addNews = data => {
    return serverAxios({
        method: 'post',
        url: '/news',
        data
    })
}

/**
 * 修改新闻
 */
export const updateNews = data => {
    return serverAxios({
        method: 'patch',
        url: `/news/${data.id}`,
        data
    })
}

/**
 *  获取草稿箱内的新闻列表
 */
export const getDraftNews = (author) => {
    return serverAxios({
        method: 'get',
        url: `/news?author=${author}&auditState=0&_expand=category`,
    })
}

/**
 *  获取审核列表内的新闻列表
 */
export const getAuditNews = (author) => {
    return serverAxios({
        method: 'get',
        url: `/news?author=${author}&auditState_ne=0&publishState_lte=1&_expand=category`,
    })
}

/**
 *  获取审核新闻的列表详情
 */
export const getAuditNewsList = () => {
    return serverAxios({
        method: 'get',
        url: `/news?auditState=1&_expand=category`,
    })
}

/**
 * 获取发布列表新闻
 */
 export const getPulishNews = (data) => {
    return serverAxios({
        method: 'get',
        url: `/news?author=${data.author}&publishState=${data.publishState}&_expand=category`,
    })
}

/**
 *  获取单个新闻详情
 */
export const getNewsItem = id => {
    return serverAxios({
        method: 'get',
        url: `/news/${id}?_expand=category`,
    })
}

/**
 *  获取根据相应字段排序的新闻数据
 */
export const getOrderNews = (field) => {
    return serverAxios({
        method: 'get',
        url: `/news?publishState=2&_expand=category&_sort=${field}&_order=desc&_limit=5`,
    })
}

/**
 *  获取发布的新闻列表
 */
export const getPulishedNews = () => {
    return serverAxios({
        method: 'get',
        url: `/news?publishState=2&_expand=category`,
    })
}
/**
 *  删除草稿箱内的新闻列表
 */
 export const deleteDraftNews = (id) => {
    return serverAxios({
        method: 'delete',
        url: `/news/${id}`,
    })
}
