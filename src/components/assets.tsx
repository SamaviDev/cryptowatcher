import { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import Table from './table';

type CoinsType = {
  id: number;
  pair: string;
  price?: string;
};

export default function Assets({ list }: { list: CoinsType[] }) {
  const { lastMessage, sendJsonMessage } = useSocket();
  const [coins, update] = useState<CoinsType[]>(list);

  //   useEffect(() => {
  //     console.log(coins);
  //   }, []);

  useEffect(() => {
    (async () => {
      if (!lastMessage) return;
      const { data } = lastMessage;
      const { marketUpdate } = JSON.parse(await data.text());

      if (!marketUpdate) return;

      const {
        market: { marketId: id },
        tradesUpdate: { trades },
      } = marketUpdate;
      const trade = trades[trades.length - 1];
      const _coins = [...coins];
      const coin = _coins.find((c) => c.id === Number(id));

      if (coin) coin.price = trade.priceStr;

      update(_coins);
    })();
  }, [lastMessage]);

  useEffect(() => {
    sendJsonMessage({
      subscribe: {
        subscriptions: Object.values(coins).map((asset) => ({
          streamSubscription: { resource: `markets:${asset.id}:trades` },
        })),
      },
    });
  }, []);

  return (
    <Table>
      <tbody>
        {Object.entries(coins).map(([i, coin]) => (
          <tr key={i}>
            <td>{coin.pair}</td>
            <td>{coin.price ?? '--'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
