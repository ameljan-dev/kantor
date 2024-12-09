import React from 'react';
import TranslateProcess from '../middleware/translateManagament';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import { StyledFooter, StyledContainer } from '../stylesheet/StyleContext';

const Footer: React.FC = () => {
  const [state,] = useMachine(storageData);

  return (
    <StyledFooter bgcolor='grey'>
      <StyledContainer>
        {TranslateProcess('message_aboutUs', state.context.language)}
      </StyledContainer>
      <StyledContainer>
        {TranslateProcess('message_needHelp', state.context.language)}
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;