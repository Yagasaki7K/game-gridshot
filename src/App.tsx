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
        const shuffledPositions = positions.slice(0, 4).sort(() => Math.random() - 0.5);

        return shuffledPositions.map(position => (
            <div className="circle" key={position} onClick={() => handleClick(position)}>
                {/* ... */}
            </div>
        ));
    };

    function handleClick(position: number): void {
        if (gameActive) {
            const clickTime: number = performance.now();
            const reactionTime = clickTime - startTime;

            const prevTimes: number[] = []; // Declare prevTimes here within handleClick
            setReactionTimes([...prevTimes, reactionTime]); // Assuming setReactionTimes is a function that takes an array of numbers
            setScore(score + 1); // Assuming setScore is a function that takes a number

            const circleToRemove: HTMLDivElement | null = document.querySelector(`.circle:nth-child(${position})`);

            if (circleToRemove) {
                circleToRemove.classList.add('circle-selected');

                // Gera nova posição aleatória para a bolinha (New random position for the circle)
                const newPosition = position; // Assign the clicked position as the new position 

                circleToRemove.classList.remove('circle-selected');
                circleToRemove.style.gridRow = `${newPosition + 1}`;
                circleToRemove.style.gridColumn = `${Math.floor(newPosition / 9) + 1}`;

                // Update positions array (assuming positions is an object)
                // No update to positions needed as the circle stays at the same position

                // Access properties of the clicked circle element
                const circleHeight: number = circleToRemove.offsetHeight; // Get height
                const circleWidth: number = circleToRemove.offsetWidth; // Get width
                const circleSize: number = Math.min(circleHeight, circleWidth); // Get size

                // Do something with the properties (e.g., log them)
                console.log(`Clicked circle height: ${circleHeight}`);
                console.log(`Clicked circle width: ${circleWidth}`);
                console.log(`Clicked circle size: ${circleSize}`);
            }
        }
    }

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
