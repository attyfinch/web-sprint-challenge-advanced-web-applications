import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Spinner from './Spinner'


test('sanity', () => {
  expect(true).toBe(true)
})

const spinnerOn = true;
const spinnerOff = false;


// login, Spinner works
// submit article, Spinner works


test('renders without errors with no props', () => { 
  render(<Spinner />)
});


test('renders with proper text on screen', () => { 
  render(<Spinner on={spinnerOn}/>)
  
  const waitingText = screen.queryByText('Please wait...')

  expect(waitingText).toBeInTheDocument();
  expect(waitingText).toHaveTextContent(/please wait.../i);
  expect(waitingText).toBeTruthy;

});

test('Text does NOT appear on render when when Spinner is off', () => { 
  render(<Spinner on={spinnerOff}/>)
  
  const waitingText = screen.queryByText('Please wait...')

  expect(waitingText).not.toBeInTheDocument();
  expect(waitingText).toBeFalsey;

});