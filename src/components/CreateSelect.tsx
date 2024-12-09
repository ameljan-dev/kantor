import React from "react";
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';

const CreateSelect: React.FC = () => {
  const [state, send] = useMachine(storageData);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    send({ type: 'CHANGE_LANGUAGE', value: e.target.value });
    window.location.reload();
  };

  return (
    <select onChange={handleSelectChange} value={state.context.language}>
      <option value="PL">PL - Polski (Zmień język)</option>
      <option value="EN">EN - English (Change language)</option>
    </select>
  );
}

export default CreateSelect;
