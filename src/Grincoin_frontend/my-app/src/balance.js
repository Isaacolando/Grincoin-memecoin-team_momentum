// src/components/Balance.js
import React, { useState } from 'react';
import icpActor from '../src/icp';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [principal, setPrincipal] = useState('');

  const fetchBalance = async () => {
    try {
      const result = await icpActor.balance_of(principal);
      setBalance(result);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <input
        type="text"
        placeholder="Enter Principal ID"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <button onClick={fetchBalance}>Check Balance</button>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default Balance;
