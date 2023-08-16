import { useEffect, useState } from 'react';
import axios from 'axios';
import Assets from './components/assets';
import useSocket from './hooks/useSocket';

function App() {
  const { readyState } = useSocket();
  const [assets, updateAssets] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'http://localhost:4200/api/markets/binance?limit=20'
      );
      updateAssets(data.result.slice(0, 50));
    })();
  }, []);

  return <>{readyState && assets ? <Assets list={assets} /> : ''}</>;
}

export default App;
