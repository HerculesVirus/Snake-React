import React from 'react'
import './App.css'


class Score extends React.Component{
    render(){
        let score = this.props.currentScore
        return(
            <div className='score-board'>
                <h4>Your Score : {score}</h4>
            </div>
        )
    }
}
export default Score;