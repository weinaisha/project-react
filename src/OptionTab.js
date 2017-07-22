import React,{Component} from 'react'
import './OptionTab.css'

export default class OptionsTab extends Component{
    render(){
        return(
            <ul className="optionsTab">
                <li onClick={this.props.selectTab.bind(this,'status','done')}>已完成</li>
                <li onClick={this.props.selectTab.bind(this,'status','undone')}>未完成</li>
                <li onClick={this.props.selectTab.bind(this,'deleted',true)}>回收站</li>
            </ul>
        )
    }
}
