import React from 'react';
import ConnectButton from './ConnectButton';
import TransferBalance from './TransferBalance'; // Import the Transfer component

const Home = () => {
  return (
    <div>
      <h1>Welcome to My dApp</h1>
      <ConnectButton />
      <TransferBalance /> {/* Add the transfer balance component */}
    </div>
  );
};

export default Home;
