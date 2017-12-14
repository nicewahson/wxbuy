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
            priceDecorate =`￥${Number(this.props.price).toFixed(2)}`;
            numDecorate = `仅剩${this.props.remainNumber}件`
        }else if(this.props.type ===2){
            priceDecorate =`￥${Number(this.props.price).toFixed(2)}`;
            numDecorate = ``;
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
            </div>
        )
    }

}

export default HomeHeader