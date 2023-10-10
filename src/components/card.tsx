import styled from "styled-components";

export const Card = styled.div<{ $show?: boolean; $height:number|string }>`
    -webkit-box-shadow: 0px 5px 15px 5px rgba(0,0,0,0.28); 
    box-shadow: 0px 5px 15px 5px rgba(0,0,0,0.28);
    border: 1px;
    border-color: rgba(0,0,0,0.5);
    border-radius: 5px;
    padding: 1rem;
    flex:1;
    transition:height 2s, opacity 2s
    height: ${props=>props.$show?props.$height:"0px"}
    opacity: ${props=>props.$show?0:1}
`