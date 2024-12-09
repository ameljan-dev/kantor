import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { useForm } from 'react-hook-form';
import parseStringToFloat from '../middleware/parseStringToFloat';
import { storageData } from '../middleware/storageData';
import { StyledBox, StyledButton, StyledContainer } from '../stylesheet/StyleContext';

interface FormData {
  action: string;
  from: number;
  to: number;
}

const CreateExchangeForm: React.FC = () => {
  const [state, send] = useMachine(storageData);
  const { register } = useForm<FormData>();
  const { name, sell, buy } = state.context.currency;
  let method = 'sell';
  let amount = 1;
  let price = sell;
  let transactionData = state.context.transaction;
  if (transactionData && transactionData.price !== 0) {
    method = transactionData.method;
    amount = transactionData.amount;
    price = transactionData.price;
  }

  const initializeOutputData = () => ({
    action: method,
    from: method === 'buy' ? amount : price,
    to: method === 'buy' ? price : amount,
  });

  const [outputData, setOutputData] = useState(initializeOutputData);

  const calculateExchange = (type: 'from' | 'to', value: number, action: string) => {
    if (type === 'from') {
      return action === 'sell' ? { to: value * sell } : { to: value / buy };
    } else {
      return action === 'sell' ? { from: value / sell } : { from: value * buy };
    }
  };

  const handleValueChange = (type: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const newValues = calculateExchange(type, value, outputData.action);
    setOutputData((prev) => ({ ...prev, [type]: value, ...newValues }));
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    setOutputData({
      action,
      from: action === 'sell' ? 1 : buy,
      to: action === 'sell' ? sell : 1,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { action, from, to } = outputData;
    const currency = `${name}/PLN`;
    const transaction = action === 'sell'
      ? { amount: to, price: from }
      : { amount: from, price: to };

    send({ type: 'CREATE_TRANSACTION', currency, method: action, ...transaction });
    window.location.href = '/confirm';
  };

  return (
    <StyledBox>
      <StyledContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Akcja</label>
            <select
              {...register('action', { required: 'Wybierz akcję' })}
              value={outputData.action}
              onChange={handleActionChange}
            >
              <option value="sell">Sprzedaj ({name} za PLN)</option>
              <option value="buy">Kup ({name} za PLN)</option>
            </select>
          </div>
          <div>
            <label>
              {outputData.action === 'sell' ? `Posiadam (${name})` : `Otrzymam (${name})`}
            </label>
            <input
              {...register('to', { required: 'To pole jest wymagane' })}
              value={parseStringToFloat(outputData.to)}
              onChange={handleValueChange('to')}
            />
          </div>
          <div>
            <label>
              {outputData.action === 'sell' ? 'Otrzymam (PLN)' : 'Posiadam (PLN)'}
            </label>
            <input
              {...register('from', { required: 'To pole jest wymagane' })}
              value={parseStringToFloat(outputData.from)}
              onChange={handleValueChange('from')}
            />
          </div>
          <StyledButton type="submit" color='success'>Wymień walutę</StyledButton>
        </form>
      </StyledContainer>
    </StyledBox>
  );
};

export default CreateExchangeForm;