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
     const result = get(`${config.host}/life/getSpuDetail?spuId=${spuId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
export function getShopDiarys(token,type,spuId,pageNumber,pageSize){
    const result = get(`${config.host}/discover/getRelationDiarysBySpu?token=${token}&type=${type}&spuId=${spuId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
     //const result = get('/life/getSpuDetail?spuId=' + spuId + '&pageNumber=' + pageNumber + '&pageSize='+pageSize);
     return result
}