// src/Wallet.js
import React, { useState } from 'react';
import { PlugConnect } from '@psychedelic/plug-connect';

const Wallet = () => {
  const [principalId, setPrincipalId] = useState(null);

  const onConnect = async () => {
    const connected = await window.ic?.plug?.requestConnect();
    if (connected) {
      const principal = await window.ic.plug.sessionManager.getSession().principalId;
      setPrincipalId(principal);
    }
  };

  return (
    <div>
      {principalId ? (
        <div>
          <p>Connected: {principalId}</p>
        </div>
      ) : (
        <PlugConnect
          onConnectCallback={onConnect}
          whitelist={['YOUR_CANISTER_ID']}
          host={'https://mainnet.dfinity.network'}
        />
      )}
    </div>
  );
};

export default Wallet;
