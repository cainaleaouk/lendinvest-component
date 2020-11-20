import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import Body from './components/Body';
import Footer from './components/Footer';

import { Box } from '../../components/Box';
import { Header1 } from '../../components/Text/Headers';

import { Colors } from '../../themes';
import InvestmentModal from './components/InvestmentModal';

const Container = styled(Box)`
    background-color: ${Colors.GREY_LIGHT};
    flex-direction: column;
    padding: 24px;
    position: relative;
`;

const HeaderContainer = styled(Box)``;

const BodyContainer = styled(Box)`
    flex: 5;
`;

const FooterContainer = styled(Box)`
    flex: 0.75;
`;

export const Challenge = () => {
    return (
        <Container>
            <InvestmentModal />

            <HeaderContainer>
                <Header1>Current Loans</Header1>
            </HeaderContainer>

            <BodyContainer>
                <Body />
            </BodyContainer>

            <FooterContainer>
                <Footer />
            </FooterContainer>
        </Container>
    )
}