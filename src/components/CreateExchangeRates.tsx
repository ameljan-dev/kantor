import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import getDataFromAPI from '../API/getDataFromAPI';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import { StyledBox, StyledButton, StyledContainer } from '../stylesheet/StyleContext';

interface currenciesContext {
  buy: string;
  currency: string;
  sell: string;
}

const CreateExchangeRates: React.FC = () => {
  const [, send] = useMachine(storageData);
  const [rows, setRows] = useState<currenciesContext[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url: string = 'https://be41-195-136-100-72.ngrok-free.app/currencies';
    const fetchData = async () => {
      try {
        const response: currenciesContext[] = await getDataFromAPI(url);
        if (response && response.length > 0) {
          setRows(response);
          setLoading(false);
        }
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  if (loading) {
    return (
      <StyledBox>
        <StyledContainer>
          <CircularProgress />
        </StyledContainer>
      </StyledBox>
    )
  } else {

    const selectCurrency = (currency: string, sell: string, buy: string): void => {
      const splittedCurrency = currency.split('/')[0];
      const parsedSell = parseFloat(sell);
      const parsedBuy = parseFloat(buy);

      if (isNaN(parsedSell) || isNaN(parsedBuy)) {
        console.error('Błąd formularza: Nieprawidłowo wypełnione pola [1]');
        return;
      }

      send({ type: 'CHANGE_CURRENCY', name: splittedCurrency, sell: parsedSell, buy: parsedBuy });
      window.location.href = '/process';
    }
    return (
      <StyledBox>
        <StyledContainer>
          <TableContainer className='pages-home-table' component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Waluta</TableCell>
                  <TableCell align='right'>Kupno</TableCell>
                  <TableCell align='right'>Sprzedaż</TableCell>
                  <TableCell align='center'>Operacja</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.currency}>
                    <TableCell component='th' scope='row'>
                      {row.currency}
                    </TableCell>
                    <TableCell align='right'>{row.buy}</TableCell>
                    <TableCell align='right'>{row.sell}</TableCell>
                    <TableCell align='center'>
                      <StyledButton color='primary' onClick={() => { selectCurrency(row.currency, row.sell, row.buy) }}>Wybierz parę walutową</StyledButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledContainer>
      </StyledBox>
    );
  }
};

export default CreateExchangeRates;