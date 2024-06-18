import { Container } from '@mui/material';

import CardMammagamma from '../components/card/CardMammagamma.tsx';
import CardPromoCodes from '../components/card/CardPromoCodes.tsx';

function MainPage() {
  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <CardPromoCodes />

        <CardMammagamma />
      </Container>
    </>
  );
}

export default MainPage;
