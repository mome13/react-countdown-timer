import {useState, useRef, useEffect} from 'react';

const convertMinuteToMilliSeconds = (minutes) => {
    return minutes * 60 * 1000;
}

const calculateTimeLeftInMilliSeconds = (timeInMilliSeconds) => {
    return timeInMilliSeconds.current - new Date().getTime();
}

function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
}

const convertMilliSecondsToTime = (timeInMilliSeconds) => {
    let seconds = Math.floor((timeInMilliSeconds / 1000) % 60);
    let minutes = Math.floor((timeInMilliSeconds / (1000 * 60)) % 60);
    return `${pad(minutes)}:${pad(seconds)}`
}

const CountDownTimer = ({minutes, onClick, style}) => {

    const [isStarted, setIsStarted] = useState(true);
    const initMinutesInMillis = convertMinuteToMilliSeconds(minutes);
    const [state, setState] = useState(convertMilliSecondsToTime(initMinutesInMillis));
    const timeToCalculate = useRef(new Date().getTime() + initMinutesInMillis);

    const checkIfTimeLeft = (timeInMilliSeconds) => {
        if (timeInMilliSeconds > 0){
            return timeInMilliSeconds;
        }else{
            setIsStarted(false);
            return 0;
        }
    }

    const count = () => {
        setState(convertMilliSecondsToTime(checkIfTimeLeft(calculateTimeLeftInMilliSeconds(timeToCalculate))));
    }

    const updateCounter = () => {
        if (isStarted) {
            count()
            setInterval(count, 1000);
        }
    }

    useEffect(() => {
        updateCounter()
    },[])

    const resetComponent = () => {
        onClick && onClick();
        const newInit = convertMinuteToMilliSeconds(minutes);
        setState(convertMilliSecondsToTime(newInit));
        timeToCalculate.current = new Date().getTime() + initMinutesInMillis;
        setIsStarted(true);
    }

    return (
        <div style={style}>
            {isStarted ?
                (<h2>{state}</h2>) :
                (<button onClick={resetComponent}>Resend SmS</button>)
            }
        </div>
    );
};

export default CountDownTimer;
