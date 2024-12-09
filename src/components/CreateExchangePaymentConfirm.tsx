import React from 'react';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import parseStringToFloat from '../middleware/parseStringToFloat';
import { StyledBox, StyledButton, StyledContainer } from '../stylesheet/StyleContext';

const CreateExchangePaymentConfirm: React.FC = () => {
  const [state,] = useMachine(storageData);

  const { currency, transaction } = state.context;

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = '/payment';
  }

  return (
    <StyledBox>
      <StyledContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='currency'>Waluta:</label>
            <input type='text' id='currency' value={currency.name} disabled />
          </div>
          <div>
            <label htmlFor='action'>Akcja:</label>
            <input type='text' id='action' value={transaction.method === 'sell' ? `Wymiana ${currency.name} na PLN` : `Wymiana PLN na ${currency.name}`} disabled />
          </div>
          <div>
            <label htmlFor='rate'>Kurs:</label>
            <input type='text' id='rate' value={transaction.method === 'sell' ? currency.sell : currency.buy} disabled />
          </div>
          <div>
            <label htmlFor='from'>Dajesz:</label>
            <input type='text' id='from' value={parseStringToFloat(transaction.amount)} disabled />
          </div>
          <div>
            <label htmlFor='to'>Otrzymasz:</label>
            <input type='text' id='to' value={parseStringToFloat(transaction.price)} disabled />
          </div>
          <StyledButton type='submit' color='success'>Potwierdzam dane i płacę</StyledButton>
        </form>
      </StyledContainer>
    </StyledBox>
  )
}

export default CreateExchangePaymentConfirm;