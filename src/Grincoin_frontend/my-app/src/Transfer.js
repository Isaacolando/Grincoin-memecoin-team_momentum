// src/components/Transfer.js
import React, { useState } from 'react';
import icpActor from '../src/icp';

const Transfer = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const transferTokens = async () => {
    try {
      const result = await icpActor.transfer(to, amount);
      setMessage(result ? 'Transfer successful' : 'Transfer failed');
    } catch (error) {
      setMessage('Error during transfer: ' + error);
    }
  };

  return (
    <div>
      <h2>Transfer Tokens</h2>
      <input
        type="text"
        placeholder="Recipient Principal ID"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={transferTokens}>Transfer</button>
      <p>{message}</p>
    </div>
  );
};

export default Transfer;
