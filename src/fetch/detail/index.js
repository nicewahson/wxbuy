import { get } from '../get'
import config from '../../util'

export function getDetailInfo(spuId) {
   const result = get(config.host+'/life/getSpuDetailForShare?spuId=' + spuId)
   return result
}

export function getDetailActivity(spuId) {
   const result = get(config.host+'/life/listSpuActivity?spuId=' + spuId)
   return result
}
