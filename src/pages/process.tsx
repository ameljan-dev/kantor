import React from 'react';
import { Box } from '@mui/material';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import CreateBackPageButton from '../components/CreateBackPageButton';
import CreateExchangeForm from '../components/CreateExchangeForm';

const Home: React.FC = () => {
  const [state,] = useMachine(storageData);

  const { currency } = state.context;

  return (
    <Box>
      <CreateBackPageButton />
      {currency ? <CreateExchangeForm /> : <h1>Nie wybrałeś pary walutowej!</h1>}
    </Box>
  );
};

export default Home;