import React, { useState, useEffect } from 'react';
import Home from '../pages/home';
import Process from '../pages/process';
import Confirm from '../pages/confirm';
import Payment from '../pages/payment';
import PaymentStatus from '../pages/paymentStatus';
import PageNotFound from '../pages/pageNotFound';
import { StyledBox, StyledContainer } from '../stylesheet/StyleContext';

const Page: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');
  let content: any;

  useEffect(() => {
    const page = window.location.pathname.replaceAll('/', '') || 'home';
    setActivePage(page);
  }, []);

  switch (activePage) {
    case 'home':
      content = <Home />;
      break;
    case 'process':
      content = <Process />;
      break;
    case 'confirm':
      content = <Confirm />;
      break;
    case 'payment':
      content = <Payment />;
      break;
    case 'paymentStatus':
      content = <PaymentStatus />;
      break;
    default:
      content = <PageNotFound />;
      break;
  }

  return (
    <StyledBox>
      <StyledContainer>
        {content}
      </StyledContainer>
    </StyledBox>
  );
}

export default Page;