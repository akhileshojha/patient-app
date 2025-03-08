import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  AnimatePresence: jest.fn(({ children }) => children),
}));