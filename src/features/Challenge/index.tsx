import React from 'react';
import styled from 'styled-components';

import { Box } from '../../components/Box';
import { Card } from '../../components/Card';
import { Header1 } from '../../components/Text/Headers';
import { Colors } from '../../themes';


import { Footer } from './components/Footer';

const Container = styled(Box)`
    background-color: ${Colors.GREY_LIGHT};
    flex-direction: column;
    padding: 24px;
`;

const HeaderContainer = styled(Box)``;

const CardListContainer = styled(Box)`
    flex: 5;
    background-color: red;
    flex-direction: column;
    overflwow-y: scroll;
`;

const TotalContainer = styled(Box)`
    flex: 0.75;
`;

interface StateProps {

}

interface DispatchProps {

}

type Props = StateProps & DispatchProps;

export const Challenge = (props: Props) => {
    return (
        <Container>
            <HeaderContainer>
                <Header1>Current Loans</Header1>
            </HeaderContainer>

            <CardListContainer>
                <Card
                    id={'0'}
                    title={'Loan 1'}
                    details={'my loan  details'}
                    onClick={(id: string) => {console.log('click', id)}}
                />
            </CardListContainer>

            <TotalContainer>
                <Footer total={'£100.000'}/>
            </TotalContainer>
        </Container>
    )
}