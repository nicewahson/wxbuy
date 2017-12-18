import { get } from './get'
import config from '../util'

/**
 * 获取商品详情
 * 
 * @export 
 * @param {num} spuId 
 * @param {num} pageNumber 
 * @param {num} pageSize 
 * @returns 
 */
export function getShopDesc(spuId,pageNumber,pageSize) {
     const result = get(`${config.host}/webActivity/getSpuDetail?spuId=${spuId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
     //const result = get('/life/getSpuDetail?spuId=' + spuId + '&pageNumber=' + pageNumber + '&pageSize='+pageSize);
     return result
}


/**
 * 获取商品相关日记
 * 
 * @export
 * @param {str} token 
 * @param {num} type  1科美 2医美
 * @param {num} spuId 
 * @param {num} pageNumber 
 * @param {num} pageSize 
 * @returns 
 */
export function getShopDiarys(spuId,pageNumber,pageSize){
    const result = get(`${config.host}/webActivity/getSpuDetail?spuId=${spuId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
     //const result = get('/life/getSpuDetail?spuId=' + spuId + '&pageNumber=' + pageNumber + '&pageSize='+pageSize);
     return result
}

/**
 * 获取用户是否已经绑定
 *
 * @export
 * @param {str} token
 * @param {num} type  1科美 2医美
 * @param {num} spuId
 * @param {num} pageNumber
 * @param {num} pageSize
 * @returns
 */
export function getUserBind(token,type,spuId) {
    const result = get(`${config.host}/discover/getRelationDiarysBySpu?token=${token}&type=${type}&spuId=${spuId}`);
    return result
}

/**
 * 发送验证码
 *
 * @export
 * @param {num} phone

 * @returns
 */
export function sentcode(phone) {
    const result = get(`${config.host}/discover/getRelationDiarysBySpu?phone=${phone}`);
    return result
}

/**
 * 立即绑定
 *
 * @export
 * @param {num} phone
 * @param {num} code
 * @returns
 */
export function nowBind(phone,code) {
    const result = get(`${config.host}/discover/getRelationDiarysBySpu?phone=${phone}&code=${code}`);
    return result
}


