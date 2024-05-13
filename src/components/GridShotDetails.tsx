import styled from 'styled-components'

const GridShotDetails = styled.div`

    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: var(--header);

        button {
            background: var(--background-alt);
            color: var(--white);
            border: 0;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-weight: bold;
            transition: 1s;

            &:hover {
                background: var(--red);
            }
        }
    }

    .layout {
        border: 1px solid var(--border);
        width: 90%;
        height: 25rem;
        margin: 0 auto;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-radius: 5px;
        padding: 1rem;
        background: var(--background-alt);

        .message {
            text-align: center;
        }
        
        .grid {
            width: 30%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 0rem;
            margin: 0 auto;
        }

        .circle {
            width: 5rem;
            height: 5rem;
            background: var(--blue);
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 2rem;
            cursor: pointer;
        }

        .circle-selected {
            background: var(--background-alt);
        }
    }

    .scoreboard {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: var(--header);
    }
`

export default GridShotDetails