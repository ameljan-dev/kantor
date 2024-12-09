import { styled } from '@mui/material/styles';
import { Box, Button, Container } from '@mui/material';
import { PaletteColor } from '@mui/material/styles';

export const StyledBox = styled(Box)<{ bgcolor?: string }>(({ bgcolor, theme }) => ({
  backgroundColor: bgcolor || theme.palette.background.default,
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledFooter = styled(Box)<{ bgcolor?: string }>(({ bgcolor, theme }) => ({
  backgroundColor: bgcolor || theme.palette.background.default,
  textAlign: 'center'
}));


export const StyledContainer = styled(Container)<{ maxWidth?: string }>(({ maxWidth, theme }) => ({
  maxWidth: maxWidth || theme.breakpoints.values.md,
  padding: theme.spacing(2),
  margin: '0 auto',
}));

export const StyledButton = styled(Button)<{ color?: string }>(({ color, theme }) => {
  const paletteColor = theme.palette[color as keyof typeof theme.palette] as PaletteColor | undefined;

  return {
    backgroundColor: paletteColor?.main || theme.palette.primary.main,
    color: theme.palette.getContrastText(paletteColor?.main || theme.palette.primary.main),
    fontSize: '14px',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: paletteColor?.dark || theme.palette.primary.dark,
    },
  };
});
