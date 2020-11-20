import styled from 'styled-components';
import { Colors } from '../themes';

export const InputField = styled.input`
    border: solid 1px ${Colors.GREY};
    color: ${Colors.GREY_DARK};
    text-align: right;
    padding: 8px;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }    
`;