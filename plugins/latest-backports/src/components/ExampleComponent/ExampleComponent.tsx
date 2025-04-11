import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { BarChart } from '@mui/x-charts/BarChart';
import { salApiRef } from '../../api';
import { useApi } from '@backstage/core-plugin-api';

export const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  }];
const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
      series={[
        { dataKey: 'london', label: 'London', valueFormatter },
        { dataKey: 'paris', label: 'Paris', valueFormatter },
        { dataKey: 'newYork', label: 'New York', valueFormatter },
        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
export function BasicBars() {
  const salApi = useApi(salApiRef);
  const dataPromise = salApi.getLatestBackportsPerYear();
  let newData = {};
  dataPromise.then((data:any) => {
    console.log(data);
    newData = data;
  })

  /**
   * rows: [type, year, count]   */
  // {
  //   london: 59,
  //   paris: 57,
  //   newYork: 86,
  //   seoul: 21,
  //   month: 'Jan',
  // }];

  const years = new Set([]);
  const types = new Set([]);
  const series = [];
  newData['rows']?.array.forEach(element => {
    types.add(element[0]);
    // if (!types.includes(element[0])) {
    //   types.push(element[0]);
    // }
    series.push({
      type: element[0],
      year: element[1],
      count: element[2]
    })
[2]; 
  const typeArray = Array.fromSet(types)
 });
  
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />
  );
}

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to latest-backports!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <BasicBars />
        </Grid>
        <Grid item>
          <ExampleFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
