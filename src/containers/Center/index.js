/**
 * Created by Administrator on 2017/12/14.
 */
import React, {Component} from 'react'
import NoActivity from '../../components/Center/noactivity'
import Main from '@components/Center/mainpage'

class Center extends Component{

    constructor(){
        super()

        this.state = {

        }
    }

    componentWillMount(){
        this.setState({
            canGo: true
        })
    }

    render(){
        if(this.state.canGo){
            return <div>
                <Main/>
            </div>
        }else{
            return <NoActivity/>
        }
    }
}

export default Center