import { createContext } from 'react';
import useWebSocket from 'react-use-websocket';
import { VITE_CRYPTOWATCH_API_KEY } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SocketContextType = {[k: string]: any}

const SocketContext = createContext<SocketContextType>(useWebSocket);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const socket = useWebSocket(
    `wss://stream.cryptowat.ch/connect?apikey=${VITE_CRYPTOWATCH_API_KEY}`
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
