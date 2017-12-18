import { get } from '../get'
import config from '../../util'

export function getDetailInfo(spuId,activityId,storeId) {
   const result = get(config.host+'/webActivity/getSpuInfo?spuId=' + spuId+'&activityId='+activityId+'&storeId='+storeId)
   return result
}

export function getDetailActivity(spuId) {
   const result = get(config.host+'/life/listSpuActivity?spuId=' + spuId)
   return result
}
