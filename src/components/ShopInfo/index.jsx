import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        let secSkillPrice = ''+Number(this.props.secSkillPrice).toFixed(2);
        let idotIndex =secSkillPrice.indexOf('.');
        let secSkillPriceInt = '';
        let secSkillPriceDecimal = '';
        let price = ''+Number(this.props.price).toFixed(2);
        let priceIndex = price.indexOf('.');
        let cheapMoney = ''+Math.floor(this.props.cheapMoney);
        if(idotIndex>0){
            secSkillPriceInt = secSkillPrice.slice(0,idotIndex);
            secSkillPriceDecimal = secSkillPrice.slice(idotIndex);
        }
        let priceDecorate=`￥${Number(this.props.price).toFixed(2)}`,
            numDecorate='';
        if(this.props.type ===1){
            numDecorate = `仅剩${this.props.remainNumber}件`
        }else if(this.props.type ===2){
            priceDecorate =`市场价：￥${Number(this.props.price).toFixed(2)}`;
            numDecorate = `已售：${this.props.remainNumber}`;
        }else if(this.props.type ===3){
            priceDecorate =`￥${Number(this.props.totalPrice).toFixed(2)}`;
            numDecorate = `已售：${this.props.remainNumber}`
            if(priceIndex>0){
	            secSkillPriceInt = price.slice(0,priceIndex);
	            secSkillPriceDecimal = price.slice(priceIndex);
            }
        }
        return (
            <div className="m-shopinfo">
                <div className="m-shopinfo-tit">
                    {this.props.showTitle}
                </div>
                <div className="m-shopinfo-pro">
                    <span className="m-identifier">￥</span>
                    <span className="m-secskillprice"><em>{secSkillPriceInt}</em><em>{secSkillPriceDecimal}</em></span>
                    <span className="m-price">{priceDecorate}</span>
                    <span className="m-remainNumber">{numDecorate}</span>
                </div>
                {this.props.type ===1? <div className="m-shopinfo-type">37秒杀</div> : ''}
                {/* {this.props.type ===2? <div className="m-shopinfo-type">37秒杀</div> : ''} */}
                {this.props.type ===3? <span className="m-shopinfo-cheapMoney">立省{cheapMoney}元</span>:''}
            </div>
        )
    }

}

export default HomeHeader