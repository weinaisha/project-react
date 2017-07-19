import React,{Component} from 'react'
import './TodoItem.css'
import $ from 'jquery'
import DatePicker from './DatePicker'

export  default class TodoItem extends Component{
    
    DatePicker(e){
        e.stopPropagation()
        let element=e.target
        new DatePicker($(element))
    }
     
    render(){
        return(
            <div className="TodoItem">
                <div className="content">
                    <span className="tag" ></span>
                    <span className="title">{this.props.todo.title}</span>
                </div>
                <div className="options">
                    <label>
                        <input type="checkbox" checked={this.props.todo.status === 'completed'}
                        onChange={this.toggle.bind(this)}/>
                        <svg className="completed" viewBox="0 0 1024 1024">
                            <path fill="#1EAA39" d="M158.208 457.216L339.456 601.6c16.256 12.928 39.552 12.16 54.784-1.92l495.104-456.192s35.072-32 65.536-7.04c9.088 7.552 19.584 28.8-4.096 62.08L406.144 765.696s-41.728 57.216-91.392-0.64L79.872 518.528s-27.904-42.88 7.04-68.736c11.648-8.576 38.4-22.016 71.296 7.424z"/>
                        </svg>
                    </label>
                    <label>
                        <input className="datepicker-input" type="text" name="datepicker" placeholder=""
                        onClick={this.DatePicker.bind(this)}/>
                    </label>
                    <svg onClick={this.delete.bind(this)} className="iconDelete" viewBox="0 0 1024 1024">
                        <path d="M 842.88 326.656 c -20.16 0 -37.952 16.384 -37.952 36.608 v 547.52 a 36.48 36.48 0 0 1 -36.928 36.096 H 256.064 a 36.672 36.672 0 0 1 -37.12 -36.096 v -549.12 c 0 -20.224 -14.72 -36.608 -34.944 -36.608 c -20.224 0 -35.008 16.384 -35.008 36.608 v 549.056 c 0 60.48 46.592 113.088 107.072 113.088 h 512.064 c 60.48 0 112.896 -52.672 112.896 -113.088 V 363.136 c -0.128 -20.096 -17.92 -36.48 -38.08 -36.48 Z m -406.912 437.888 V 362.24 c 0 -20.16 -14.784 -36.544 -35.008 -36.544 c -20.224 0 -35.008 16.256 -35.008 36.544 v 402.304 c 0 20.16 14.784 36.608 35.008 36.608 c 20.224 0 35.008 -16.448 35.008 -36.608 Z m 221.952 0 V 362.24 c 0 -20.16 -17.792 -36.544 -37.952 -36.544 c -20.224 0 -38.016 16.256 -38.016 36.544 v 402.304 c 0 20.16 17.792 36.608 38.016 36.608 c 20.16 0 37.952 -16.448 37.952 -36.608 Z m 329.408 -583.552 h -182.4 V 106.24 c 0 -60.48 -49.28 -106.304 -109.312 -106.304 H 329.088 c -60.416 0 -110.08 45.824 -110.08 106.24 v 74.752 H 36.608 c -20.288 0 -36.608 14.784 -36.608 35.008 c 0 20.16 16.32 34.944 36.608 34.944 h 950.784 c 20.224 0 36.608 -14.72 36.608 -34.944 c 0 -20.224 -16.384 -35.008 -36.672 -35.008 Z m -258.368 0 H 289.92 V 106.24 c 0 -20.224 19.072 -36.288 39.168 -36.288 h 366.528 c 20.032 0 33.28 15.744 33.28 36.288 v 74.688 Z" />
                    </svg>
                </div>
            </div>
        )
    }
    delete(){
        this.props.onDelete(this.props.todo)
    }
    toggle(){
        this.props.onToggle(this.props.todo)
    }
}