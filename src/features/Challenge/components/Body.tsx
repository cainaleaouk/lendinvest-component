import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { Box } from '../../../components/Box';
import { Card } from '../../../components/Card';
import { Text } from '../../../components/Text';
import { getIsLoading, getLoans } from '../../App/store/selectors';
import { Loan, NormalizedLoan } from '../../App/types';
import { AppDispatch, RootState } from '../../../store';
import { ChallengeStore } from '../store/challengeStore';

import { attemptFetchLoans } from '../../App/store/appStore';

const Container = styled(Box)`
    flex-direction: column;
    overflwow-y: scroll;
`;

interface StateProps {
    loans: NormalizedLoan[];
    isLoading: boolean;
}

interface DispatchProps {
    investInLoanId: (id: string) => void;
    fetchLoans: () => void;
}

type Props = StateProps & DispatchProps;

const Body = ({fetchLoans, investInLoanId, isLoading, loans}: Props) => {

    // For the sake of the execise fetch loans when the component mounts
    React.useEffect(() => {
        fetchLoans();
    }, []);

    const cardsOrLoading = React.useMemo(() => {
        if (isLoading) {
            return 'Loading...';
        }
        return loans.map(loan => (
            <Card
                key={loan.id}
                id={loan.id}
                title={loan.title}
                details={'my loan  details'}
                onClick={investInLoanId}
            />
        ));
    }, [loans, isLoading]);

    return <Container>{cardsOrLoading}</Container>;
}

const dispatchProps = (dispatch: AppDispatch): DispatchProps => ({
    investInLoanId: (id: string) => dispatch(ChallengeStore.actions.investInLoanId(id)),
    fetchLoans: () => dispatch(attemptFetchLoans()),
});

const mapStateToProps = (state: RootState): StateProps => ({
    loans: getLoans(state),
    isLoading: getIsLoading(state),
});

export default connect(mapStateToProps, dispatchProps)(Body);
