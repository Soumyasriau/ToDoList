import React from 'react';

const QUOTES = [
  'Small steps every day lead to big results.',
  'Done is better than perfect.',
  'Focus on one task at a time.',
  'Your future self will thank you.',
  'Start now. Start small. Keep going.',
  'Discipline is choosing what matters most.',
  'Progress, not perfection.',
];

const Quote = () => {
  const q = QUOTES[new Date().getDate() % QUOTES.length];
  return <div className="quote-card">“{q}”</div>;
};

export default Quote;
