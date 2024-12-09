import React from "react";
import { StyledBox, StyledButton } from '../stylesheet/StyleContext';

const CreateSelect: React.FC = () => {
  const handleBackButtonClick = (): void => {
    const pageMap: Record<string, string> = {
      process: "home",
      confirm: "process",
      payment: "confirm",
      paymentStatus: "payment",
    };

    const currentPage = window.location.pathname.replaceAll('/', '');
    const previousPage = pageMap[currentPage] || "home";
    window.location.href = `/${previousPage}`;
  };

  return (
    <StyledBox>
      <StyledButton onClick={handleBackButtonClick} color='primary'>Powrót do poprzedniej strony</StyledButton>
    </StyledBox>
  );
};

export default CreateSelect;
