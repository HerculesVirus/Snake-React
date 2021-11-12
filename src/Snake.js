import React from 'react'
import './App.css'

class Snake extends React.Component{
    constructor(props){
        super(props);
        this.props=props
    }
    render(){
        return(
            <div>
                {this.props.snakeDot.map((dot,i)=>{
                    const style = {
                        left: `${dot[0]}%` ,
                        top: `${dot[1]}%` ,
                    }
                    return(
                        <div className='snake-dot' key={i} style={style}></div>
                    )
                })}
            </div>
        )
    }
}
export default Snake;