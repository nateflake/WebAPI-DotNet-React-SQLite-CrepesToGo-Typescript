import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
  const history = useHistory();
  const { state } = useLocation<any>();
  return (
    <Container component={Paper}>
      <Button component={Link} to={'/catalog'}>« Back to shop</Button>
      {
        state?.error ?
          (
            <>
              <Typography variant='h3' color='error' gutterBottom>{state.error.title}</Typography>
              <Divider />
              <Typography>{state.error.detail || 'Internal server error'}</Typography>
            </>
          ) :
          (
            <Typography variant='h5' gutterBottom>Server Error</Typography>
          )
      }
      <Divider />
      <Button onClick={() => history.push('/catalog')}>« Back to shop</Button>
    </Container>
  )
}