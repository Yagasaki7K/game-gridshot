import styled from 'styled-components'

const GridShotDetails = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

.container {
    width: 100%;
    background: var(--background-alt);
    height: 30rem;
    margin-top: 2rem;
}

.grid-container {
    display: grid;
    grid-template-areas:
        "pos1 pos2 pos3"
        "pos4 pos5 pos6"
        "pos7 pos8 pos9";
    gap: 10px;
    width: 30rem;
    height: 25rem;
    background: var(--background-alt);
    padding: 10px;
    margin: 2rem auto;
}

.circle {
    width: 80px;
    height: 80px;
    background-color: var(--blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.score {
    font-size: 20px;
}

`

export default GridShotDetails