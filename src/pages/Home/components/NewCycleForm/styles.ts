import styled from "styled-components";


const BaseInput = styled.input`
    background: transparent;
    border: 0;
    height:2.5;
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme["gray-100"]};

    &::placeholder {
    color: ${props => props.theme["gray-500"]};
    }

    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme["green-500"]};
    }

`

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`

export const MinutesInputAmount = styled(BaseInput)`
    width: 4rem;
`

export const FormContainer = styled.main`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`