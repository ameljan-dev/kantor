import React from 'react';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import CreateBackPageButton from '../components/CreateBackPageButton';
import CreateExchangePaymentConfirm from '../components/CreateExchangePaymentConfirm';
import { StyledBox, StyledContainer } from '../stylesheet/StyleContext';

const Home: React.FC = () => {
  const [state,] = useMachine(storageData);

  const { currency, transaction } = state.context;

  return (
    <StyledBox>
      <StyledContainer>
        <CreateBackPageButton />
        {currency && transaction ? <CreateExchangePaymentConfirm /> : <h1>Dane są błędnie uzupełnione!</h1>}
      </StyledContainer>
    </StyledBox>
  );
};

export default Home;