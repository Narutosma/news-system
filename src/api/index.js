import serverAxios from '@/axios';

/**
 * 获取左侧菜单栏数据
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