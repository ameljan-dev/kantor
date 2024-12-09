import React from 'react';
import CreateForm from '../components/CreateForm';
import CreateExchangeRates from '../components/CreateExchangeRates';
import CreateSelect from '../components/CreateSelect';
import { Box } from '@mui/material';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';

const Home: React.FC = () => {
  const [state,] = useMachine(storageData);

  const { terms } = state.context;

  return (
    <Box>
      <div className='pages-home-languages'>
        <p>Obecnie korzystasz z języka:</p>
        <CreateSelect />
      </div>
      <h1>Witaj w kantorze walut!</h1>
      {terms ? <CreateExchangeRates /> : <CreateForm />}
    </Box>
  );
};

export default Home;