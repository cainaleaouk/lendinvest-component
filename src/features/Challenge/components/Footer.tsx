import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Box } from '../../../components/Box';
import { Text } from '../../../components/Text';
import { RootState } from '../../../store';
import { getTotalStr } from '../store/selectors';

const Container = styled(Box)`
    justify-content: center;
    align-items: flex-end;
`;

const Label = styled(Text)`
    text-align: center;
`;

interface StateProps {
    total: string;
}

const Footer = ({total}: StateProps) => {
    return (
        <Container>
            <Label>Total amount available for investments: <b>{total}</b></Label>
        </Container>
    )
}

const mapStateToProps = (state: RootState): StateProps => ({
    total: getTotalStr(state),
})

export default connect(mapStateToProps)(Footer);