import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';

import { Box } from '../../../components/Box';
import { Button } from '../../../components/Button';
import { ChallengeStore } from '../store/challengeStore';
import { getAmountAvailable } from '../store/selectors';
import { InputField } from '../../../components/InputField';

const Container = styled(Box)`
    flex-direction: row;
    padding-right: 8px;
`;

const InputContainer = styled(Box)`
    margin-right: 8px;
`;

const ButtonContainer = styled(Box)``;

const validate = (amountStr: string, maxAmount: number): boolean => {
    const amount = Number(amountStr);
    if (Number.isNaN(amount)) {
        return false;
    }
    return amount <= maxAmount;
}

interface StateProps {
    maxAmount: number;
}

interface DispatchProps {
    onInvest: (amount: number) => void;
}

type Props = StateProps & DispatchProps;

//@TODO: use a form hook lib
const InvestmentInputRow = ({maxAmount, onInvest}: Props) => {

    const [amount, setAmount] = React.useState<string>('0');

    const onInvestClick = React.useCallback(() => {
        //@TODO: add style to show validation error
        if (validate(amount, maxAmount)) {
            onInvest(Number(amount));
        }
    }, [amount]);

    const onInputChange = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(evt.target.value);
    }, []);

    return (
        <Container>
            <InputContainer>
                {/*@TODO: "error" (warning) thrown when using `data-testId` that's used by testing library. Find a way to fix it*/}
                <InputField data-testId='amount-input' type='number' value={amount} onChange={onInputChange} />
            </InputContainer>
            <ButtonContainer>
                <Button onClick={onInvestClick}>invest</Button>
            </ButtonContainer>
        </Container>
    );
}

const dispatchProps = (dispatch: AppDispatch): DispatchProps => ({
    onInvest: (amount: number) => dispatch(ChallengeStore.actions.addInvestment(amount)),
});

const mapStateToProps = (state: RootState): StateProps => ({
    maxAmount: getAmountAvailable(state),
});

export default connect(mapStateToProps, dispatchProps)(InvestmentInputRow);