import { useState, useEffect } from "react";
import GridShotDetails from "./components/GridShotDetails";

function App() {
    const [score, setScore] = useState<number>(0);
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [reactionTimes, setReactionTimes] = useState<number[]>([]);
    const [message, setMessage] = useState<string>("");
    const [remainingTime, setRemainingTime] = useState<number>(60);
    const [startTime, setStartTime] = useState<number>(0);
    const [messageBtn, setMessageBtn] = useState<string>("Start Game");

    const startGame = () => {
        setGameActive(true);
        setMessage("");
        setScore(0);
        setReactionTimes([0]);
        setRemainingTime(60);
        setStartTime(Date.now());
        setMessageBtn("SHOOT THEM!");
        drawRedCircle();
    };

    const endGame = () => {
        setGameActive(false);
        setMessage(`Your score: ${score}, Fastest reaction time: ${Math.min(...reactionTimes) || "-"} ms`);
        setMessageBtn("Start Game");
        drawRedCircle();
    };

    useEffect(() => {
        if (remainingTime <= 0) {
            endGame();
        }
    }, [remainingTime]);

    useEffect(() => {
        if (gameActive) {
            const intervalId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [gameActive]);

    const drawRedCircle = () => {
        const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return positions.slice(0, 4).map(position => (
            <div className="circle" key={position} onClick={() => handleClick(position)} />
        ));
    };

    const handleClick = (position: number) => {
        if (gameActive) {
            const clickTime = performance.now();
            const reactionTime = clickTime - startTime;
            setReactionTimes(prevTimes => [...prevTimes, reactionTime]);
            setScore(score + 1);
            const circleToRemove = document.querySelector(`.circle:nth-child(${position})`);
            circleToRemove?.classList.add('circle-selected')
        }
    };

    return (
        <GridShotDetails>
            <div className="header">
                <h1>Gridshot Ultimate</h1>
                <button onClick={startGame}>{messageBtn}</button>
            </div>

            <div className="layout">
                {message && <p className="message">{message}</p>}

                <div className="grid">
                    {drawRedCircle()}
                </div>
            </div>

            <div className="scoreboard">
                <div className="score">Score: {score}</div>
                <div className="reaction-times">Fastest Reaction Time: {Math.min(...reactionTimes) || "-"} ms</div>
                <div className="remaining-time">Remaining Time: {remainingTime} s</div>
            </div>

            <div className="copyright">
                {/* Your content here */}
            </div>
        </GridShotDetails>
    );
}

export default App;
