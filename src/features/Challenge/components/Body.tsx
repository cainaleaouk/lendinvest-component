import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Box } from '../../../components/Box';
import { Card } from '../../../components/Card';
import { getIsLoading, getLoans } from '../../App/store/selectors';
import { InvestmentRecord, NormalizedLoan } from '../../App/types';
import { AppDispatch, RootState } from '../../../store';
import { ChallengeStore } from '../store/challengeStore';

import { attemptFetchLoans } from '../../App/store/appStore';
import { getInvestmentRecords, getLoanDetails } from '../store/selectors';

const Container = styled(Box)`
    flex-direction: column;
    overflwow-y: scroll;
`;

interface StateProps {
    loans: NormalizedLoan[];
    investedRecords: InvestmentRecord;
    isLoading: boolean;
}

interface DispatchProps {
    investInLoanId: (id: string) => void;
    fetchLoans: () => void;
}

type Props = StateProps & DispatchProps;

const Body = ({fetchLoans, investInLoanId, investedRecords, isLoading, loans}: Props) => {

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
                details={getLoanDetails(loan)}
                onClick={investInLoanId}
                showInvested={Boolean(investedRecords[loan.id])}
            />
        ));
    }, [loans, isLoading, investedRecords]);

    return <Container>{cardsOrLoading}</Container>;
}

//@TODO: this is not ideal, creating anon functions every time the store is updating. Change to use hooks
const dispatchProps = (dispatch: AppDispatch): DispatchProps => ({
    investInLoanId: (id: string) => dispatch(ChallengeStore.actions.investInLoanId(id)),
    fetchLoans: () => dispatch(attemptFetchLoans()),
});

const mapStateToProps = (state: RootState): StateProps => ({
    loans: getLoans(state),
    investedRecords: getInvestmentRecords(state),
    isLoading: getIsLoading(state),
});

export default connect(mapStateToProps, dispatchProps)(Body);
