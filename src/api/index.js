import serverAxios from '@/axios';

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