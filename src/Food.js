import React from 'react'
import './App.css'

class Food extends React.Component{
    render(props){
        const style = {
            left: `${this.props.dot[0]}%`,
            top: `${this.props.dot[1]}%` 
        }
        return(
            <div className='snake-food' style={style}></div>
        )
    }
}
export default Food;