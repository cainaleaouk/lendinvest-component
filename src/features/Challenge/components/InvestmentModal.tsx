import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Box } from '../../../components/Box';
import { Text } from '../../../components/Text';
import { Header1 } from '../../../components/Text';

import { Colors } from '../../../themes';

import { getAmountAvailableStr, getIsInvestmentModalOpen, getSelectedLoanTitle, getWhenLoanEnds } from '../store/selectors';
import { ChallengeStore } from '../store/challengeStore';
import { AppDispatch, RootState } from '../../../store';
import InvestmentInputRow from '../../../components/InvestmentInputRow';

Modal.setAppElement('#root');

const Container = styled(Box)`
    padding: 16px;
    flex-direction: column;
`;

const InfoText = styled(Text)`
    margin-bottom: 4px;
`;

const InputContainer = styled(Box)`

`;

//@TODO: Haven't used this lib in ages, not sure if there's a better way of doing this, just skimmed the docs for minimal info
const modalCustomStyle = {
    overlay: {
        position: "absolute" as "absolute",
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        width: 512,
        height: 512,
    },
    content: {
        top: '28%',
        bottom: '28%',
        left: '15%',
        right: '15%',
        backgroundColor: Colors.GREY_LIGHT,
        padding: 0,
        borderRadius: 0,
    }
}

interface StateProps {
    isOpen: boolean;
    title: string;
    amountAvailable: string;
    endOfLoanDate: string;
}

interface DispatchProps {
    closeModal: () => void;
}

type Props = StateProps & DispatchProps;

const InvestmentModal = ({
    amountAvailable,
    closeModal, 
    endOfLoanDate,
    isOpen, 
    title
}: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalCustomStyle}
        >
            <Container>
                <Header1>Invest in Loan</Header1>
                <InfoText>{title}</InfoText>
                <br />
                <InfoText>Amount available: {amountAvailable}</InfoText>
                <InfoText>Loan ends in: {endOfLoanDate}</InfoText>
                <br />
                <InfoText>Investment amount (£)</InfoText>
                <InputContainer>
                    <InvestmentInputRow />
                </InputContainer>
            </Container>
        </Modal>
    )
}

const dispatchProps = (dispatch: AppDispatch): DispatchProps => ({
    closeModal: () => dispatch(ChallengeStore.actions.closeInvestmentModal()),
});

const mapStateToProps = (state: RootState): StateProps => ({
    amountAvailable: getAmountAvailableStr(state),
    isOpen: getIsInvestmentModalOpen(state),
    title: getSelectedLoanTitle(state),
    endOfLoanDate: getWhenLoanEnds(state),
});

export default connect(mapStateToProps, dispatchProps)(InvestmentModal);