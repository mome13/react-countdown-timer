import './App.css';
import CountDownTimer from "./CountDownTimer";

function App() {
    const justLog = () => {
        console.log(":)")
    }
  return (
    <div className="App">
      <CountDownTimer minutes={1}/>
    </div>
  );
}

export default App;
