import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import sendDataToAPI from '../API/sendDataToAPI';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import CreateBackPageButton from '../components/CreateBackPageButton';

interface payRequestContext {
  amount: number;
}

interface transactionRequestContext {
  transationId: number;
  currency: string;
  type: string;
  amount: number;
}

const PaymentStatus: React.FC = () => {
  const [state,] = useMachine(storageData);
  const [status, setStatus] = useState(0);

  let sessionStatus = true;

  sessionStatus = window.location.search.split('?session=')[1] === 'false' ? false : true;

  /*
   * Status
   * - 0 before send
   * - 1 processing
   * - 2 http status: 200
   * - 3 http error status, timeout or amount > 1000
   */

  useEffect(() => {
    const { currency, method, amount } = state.context.transaction;
    const payUrl: string = 'https://be41-195-136-100-72.ngrok-free.app/pay';
    const transactionUrl: string = 'https://be41-195-136-100-72.ngrok-free.app/transaction';

    const transactionFetchData = async (data: transactionRequestContext) => {
      let transactionPayload: transactionRequestContext = data;
      try {
        const transactionResponse: [] = await sendDataToAPI(transactionUrl, transactionPayload);
        if (transactionResponse && transactionResponse.length > 0) {
          setStatus(2);
        }
      } catch (err) {
        setStatus(3);
      }
      return;
    };

    const payFetchData = async (amount: number) => {
      try {
        if (amount <= 1000) {
          const payPayload: payRequestContext = { amount };
          const payResponse: string = await sendDataToAPI(payUrl, payPayload);
          setStatus(1);
          if (payResponse && payResponse.length > 0) {
            const payResponseParsed = JSON.parse(payResponse);
            const data: transactionRequestContext = {
              transationId: payResponseParsed.transactionId,
              currency: currency,
              type: method,
              amount: amount
            }
            transactionFetchData(data);
          }
        } else {
          setStatus(3);
        }
      } catch (err) {
        setStatus(3);
      }
      return;
    };

    if (sessionStatus) {
      payFetchData(amount);
    } else {
      setStatus(4);
    }

  }, [sessionStatus, state.context.transaction]);

  let statusMessage: string = '';
  switch (status) {
    case 0:
      statusMessage = 'Inicjowanie płatności...';
      break;
    case 1:
      statusMessage = 'Prztwarzanie płatności...';
      break;
    case 2:
      statusMessage = 'Zapłacono pomyślnie';
      break;
    case 3:
      statusMessage = 'Odrzucono płatność';
      break;
    case 4:
      statusMessage = 'Wygaśnięcie sesji';
      break;
  }

  return (
    <Box>
      <CreateBackPageButton />
      <h1>Status płatności: {statusMessage}</h1>
    </Box>
  );
};

export default PaymentStatus;