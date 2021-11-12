import React from 'react'
import Score from './Score'
import Snake from './Snake'
import Food from './Food'
import './App.css'

const randomNumber= ()=>{
    let min = 1;
    let max = 95;
    let x = Math.floor((Math.random()*(max-min)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min)+min)/2)*2;
    return [x,y]
}
const initial = {
    food : randomNumber(),
    speed : 500,
    direction : 'RIGHT' ,
    snakeDots : [
        [0,0],
        [5,0]
    ],
    score: 0
}
class SnakeGame extends React.Component{
    constructor(props){
        super(props);       
        this.state = initial
    }
    componentDidMount(){
        document.onkeydown = this.onKeyDown;
        setInterval(this.movesnake, this.state.speed)
    }
    componentDidUpdate(){
        //if eat the food then increase the size of snakeDots
        this.CheckIfOutBroder()
        this.CheckIfCollapsed()
        this.CheckifEat()
    }
    CheckIfOutBroder(){
        let dots = [...this.state.snakeDots]
        let head = dots[dots.length-1]
        if(head[0] >= 100 || head[1]>=100 || head[0] < 0 || head[1] < 0){
            console.log('GameOver Out of Border')
            this.GameisOver();
        }
    }
    GameisOver(){
        this.setState(initial)
    }
    CheckIfCollapsed(){
        let snake = [...this.state.snakeDots]
        let head = snake[snake.length-1]
        snake.pop();
        snake.forEach(dots => {
            if(head[0] === dots[0] && head[0] === dots[1]){
                console.log('GameOver CheckIfCollapsed()')
                this.GameisOver()
            }
        })
    }
    CheckifEat(){
        let snake = [...this.state.snakeDots]
        let head = snake[snake.length-1]
        let food =this.state.food

        if(head[0] === food[0] && head[1] === food[1]){

            this.setState({
                food: randomNumber(),
                score: this.state.score+2
            })
            this.enlargeSnake()
        }

    }
    enlargeSnake(){
        let snake = [...this.state.snakeDots]   
        snake.unshift([])
        this.setState({
            snakeDots : snake
        })

    }
    onKeyDown = (e) => {
        e = e || window.event;
        switch(e.keyCode){
            case 38:
                !['UP','DOWN'].includes(this.state.direction) && this.setState({direction: 'UP'})
                break;
            case 37:
                !['LEFT','RIGHT'].includes(this.state.direction) && this.setState({direction: 'LEFT'})
                break;
            case 39:
                !['RIGHT','LEFT'].includes(this.state.direction) && this.setState({direction: 'RIGHT'})
                break;
            case 40:
                !['UP','DOWN'].includes(this.state.direction) && this.setState({direction: 'DOWN'})
                break;
            default:
                console.log("Out of Box Key is Pressed")
                break;
        }
    }
    movesnake = () => {
        let dots= [...this.state.snakeDots];
        let head = dots[dots.length -1];
        switch(this.state.direction){
            case 'RIGHT':
                head = [head[0]+5, head[1]]
                break;
            case 'LEFT' :
                head =[head[0]-5 ,head[1]]
                break;
            case 'UP':
                head = [head[0], head[1]-5]
                break;
            case 'DOWN':
                head = [head[0], head[1]+5]
                break;
            default:
                console.log("You pressed out of Arrow key ")
                break;
        }
        dots.push(head)
        dots.shift();
        this.setState({
            snakeDots: dots,
        })

    }
    render(){ 
        return(
            <div className='Main-Game'>
                <h1>Snake Game</h1>
                <Score currentScore={this.state.score}/>
                <div className='game-area'>
                    <Snake snakeDot={this.state.snakeDots}/>
                    <Food dot={this.state.food}/>
                </div>
            </div>
        )
    }
}

export default SnakeGame;