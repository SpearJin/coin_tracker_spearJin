import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import { ChartProps, IHistorical } from '../type';

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 10000,
  });

  const getChartData = () =>
    data?.map((item) => {
      let x = item.time_close;
      let y = [item.open.toFixed(3), item.high.toFixed(3), item.low.toFixed(3), item.close.toFixed(3)];
      return { x, y };
    });

  return (
    <div>
      {isLoading ? (
        <Loader>Loading Chart...</Loader>
      ) : (
        <ChartContainer>
          <ApexChart
            type='candlestick'
            series={[
              {
                name: 'Price',
                data: getChartData(),
              },
            ]}
            options={{
              theme: { mode: isDark ? 'dark' : 'light' },
              chart: {
                type: 'candlestick',
                height: 300,
                background: 'transparent',
                toolbar: { show: false },
              },
              title: {
                text: '2주간 기록',
                align: 'center',
              },
              stroke: {
                width: 5,
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: '#D25044',
                    downward: '#1261C4',
                  },
                },
              },
              xaxis: {
                type: 'datetime',
                labels: { rotate: 0 },
              },
            }}
          />
        </ChartContainer>
      )}
    </div>
  );
}

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
`;

const Loader = styled.h2`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

export default Chart;
