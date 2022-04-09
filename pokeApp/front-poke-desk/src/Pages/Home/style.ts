import styled from "styled-components";


export const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Banner = styled.img`
    width: 90vw;
    @media only screen and (min-width: 740px) {
        max-width: 40vw;
    }

`
export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    div {
        margin : 13px;
    }
`
