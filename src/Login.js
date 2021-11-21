import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from '@mui/system';

const LoginPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useNavigate();

  React.useEffect(() => {
    async function checkUser() {
      if (isAuthenticated) {
        history("/sea");
      } else {
        loginWithRedirect({redirectUri: 'http://localhost:3000/sea'});
      }
    }

    checkUser();                            // called async checkUser()
  }, [isAuthenticated, loginWithRedirect]); // added loginWithRedirect

  return <Box/>;
}

export default LoginPage;