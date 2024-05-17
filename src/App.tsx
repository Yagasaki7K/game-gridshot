import React, { useState, useEffect } from 'react';
import GridShotDetails from './components/GridShotDetails';

const shuffle = (array: number[]): number[] => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const ReactionGame: React.FC = () => {
    const initialPositions = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
    const [positions, setPositions] = useState<number[]>(initialPositions);
    const [reactionTimes, setReactionTimes] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [gameActive, setGameActive] = useState<boolean>(true);
    const [startTime, setStartTime] = useState<number>(performance.now());

    const handleClick = (position: number) => {
        if (gameActive) {
            const clickTime = performance.now();
            const reactionTime = clickTime - startTime;
            setReactionTimes((prevTimes) => [...prevTimes, reactionTime]);
            setScore(score + 1);

            setPositions((prevPositions) => {
                const newPositions = prevPositions.filter((pos) => pos !== position);
                const availablePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((pos) => !newPositions.includes(pos));
                newPositions.push(shuffle(availablePositions)[0]);
                return newPositions;
            });

            setStartTime(performance.now());
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setGameActive(false);
            const averageReactionTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
            alert(`Fim do jogo! Seu tempo médio de reação foi: ${averageReactionTime.toFixed(2)} ms`);
        }, 60000);

        return () => clearTimeout(timer);
    }, [reactionTimes]);

    return (
        <GridShotDetails>
            <h1>Ultimate Gridshot</h1>
            <div className="score">Pontuação: {score}</div>
            <div className="container">
                <div className="grid-container">
                    {positions.map((position) => (
                        <div
                            className="circle"
                            key={position}
                            onClick={() => handleClick(position)}
                            style={{ gridArea: `pos${position}` }}
                        />
                    ))}
                </div>
            </div>
        </GridShotDetails>
    );
};

export default ReactionGame;
