import { createRoot } from 'react-dom/client';
import * as Chakra from '@chakra-ui/react';
import App from './App';
import theme from './theme';

const root = createRoot(document.getElementById('root'));
root.render(
  <Chakra.ChakraProvider theme={theme}>
    <Chakra.ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </Chakra.ChakraProvider>
);