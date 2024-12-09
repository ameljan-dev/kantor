import React, { useEffect, useState } from 'react';
import CreateBackPageButton from '../components/CreateBackPageButton';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import { StyledBox, StyledButton, StyledContainer } from '../stylesheet/StyleContext';

const Payment: React.FC = () => {
  const [state, send] = useMachine(storageData);
  const [timer, setTimer] = useState<number>(30);

  const { status, timeLeft } = state.context.transactionSessionTimeout;

  useEffect(() => {
    if (!status) {
      send({ type: 'TRANSACTION_START_TIMEOUT' });
    }

    let localTimer = 30; 
    const interval = setInterval(() => {
      if (localTimer <= 1) {
        clearInterval(interval);

        send({ type: 'TRANSACTION_STOP_TIMEOUT' });
        send({ type: 'TRANSACTION_SESSION_DESTROY' });
        window.location.href = '/paymentStatus?session=false';
      } else {
        const currentTimeInMilliseconds = new Date().getTime();
        const remainingTime = Math.max((timeLeft - currentTimeInMilliseconds) / 1000, 0);
        localTimer = Math.floor(remainingTime);
        setTimer(localTimer);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, timeLeft, send]);

  const handleClick = () => {
    send({ type: 'TRANSACTION_STOP_TIMEOUT' });
    window.location.href = '/paymentStatus';
  };

  return (
    <StyledBox>
      <StyledContainer>
        <CreateBackPageButton />
        <StyledButton onClick={handleClick} color='primary'>Zapłać</StyledButton>
        {timer <= 0 ? (
          <p>Sesja wygasła!</p>
        ) : (
          <p>Twoja sesja wygaśnie za <b>{timer} sekund</b></p>
        )}
      </StyledContainer>
    </StyledBox>
  );
};

export default Payment;