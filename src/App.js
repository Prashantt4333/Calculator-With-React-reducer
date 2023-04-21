import { useReducer } from 'react';
import './App.css';
import { ADDITION, CLEAR, DIVISION, MULTIPLICATION, NUMBER, RESULT, SUBTRACTION } from './reducer/actions/action';



let toggleBtn = document.querySelector('.toggleBtn');
let body = document.querySelector('body');

let oldState = {
  result:0,
  leftValue:'',
  operator:'',
  rightValue:''

}
let reducerFunction =(oldState,action)=>{

  console.log("oldstate====>",oldState)
  console.log("action====>",action)
  let newState = oldState;

  switch(action.type){
    case CLEAR:
      return{
        result:0,
        leftValue:'',
        operator:'',
        rightValue:''
      }
      
      break;
    case DIVISION:
      return{
        ...newState,
        operator:'/'
      }
      break;
    case MULTIPLICATION:
      return{
        ...newState,
        operator:'*'
      }
      break;
    case SUBTRACTION:
      return{
        ...newState,
        operator:'-'
      }
      break;
    case ADDITION:
      return{
        ...newState,
        operator:'+'
      }
      
      break;
    case RESULT:
      switch(newState.operator){
        case '+':
          return{
            ...newState,
            result: parseFloat(newState.leftValue) + parseFloat(newState.rightValue)
          }
        break;
        case '-':
          return{
            ...newState,
            result: parseFloat(newState.leftValue) - parseFloat(newState.rightValue)
          }
          break;
        case '*':
          return{
            ...newState,
            result: parseFloat(newState.leftValue) * parseFloat(newState.rightValue)
          }
          break;
        case '/':
          return{
            ...newState,
            result: parseFloat(newState.leftValue) / parseFloat(newState.rightValue)
          }
          break;
        default:

      }
      
      break;
    case NUMBER:
      if(newState.operator === ''){
        return {
          ...newState,
          leftValue:newState.leftValue + action.payload
        }
      }
      else{
        return {
          ...newState,
          rightValue:newState.rightValue + action.payload
        }
      }
      break;
    default:
    
  }


  return newState;

}
function App() {

  const [newState,dispatch] = useReducer(reducerFunction,oldState)

  return (
    <>
    {
      console.log("newState->",newState)
    }
      <div className="toggleBtn"
        onClick={
          (toggleBtn = () => {
            body.classList.toggle("dark");
          })
        }
      ></div>
      <div className="calculator">
        <div className="buttons">
          <input id="value" className='' value={ newState.result === 0? newState.leftValue+newState.operator+newState.rightValue:newState.result} readOnly style={{border:"none" ,background:"#edf1f4",color:"blue"}} />
          <span onClick={()=>{ dispatch({type:CLEAR}) }} id="Clear">Clear</span>
          <span onClick={()=>{ dispatch({type:DIVISION}) }}>/</span>
          <span onClick={()=>{ dispatch({type:MULTIPLICATION}) }}>*</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:7}) }}>7</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:8}) }}>8</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:9}) }}>9</span>
          <span onClick={()=>{ dispatch({type:SUBTRACTION}) }}>-</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:4}) }}>4</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:5}) }}>5</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:6}) }}>6</span>
          <span onClick={()=>{ dispatch({type:ADDITION}) }} id="plus">+</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:1}) }}>1</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:2}) }}>2</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:3}) }}>3</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:0}) }}>0</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:'00'}) }}>00</span>
          <span onClick={()=>{ dispatch({type:NUMBER,payload:'.'}) }}>.</span>
          <span onClick={()=>{ dispatch({type:RESULT}) }} id="equal">=</span>
        </div>
      </div>
    </>
  );
}

export default App;
