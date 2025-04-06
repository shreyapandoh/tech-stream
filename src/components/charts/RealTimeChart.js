// src/components/charts/RealTimeChart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChartData } from '../../store/slices/dashboardSlice';
import { LineChart, BarChart, AreaChart, PieChart, Line, Bar, Area, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RealTimeChart = ({ chartId, type, title }) => {
  const dispatch = useDispatch();
  const chartData = useSelector(state => state.dashboard.chartData[chartId]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      let newData;

      switch (type) {
        case 'lineChart':
        case 'areaChart':
          newData = {
            timestamp,
            value: Math.floor(Math.random() * 100),
          };
          break;
        case 'barChart':
          newData = {
            timestamp,
            value1: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 100),
            value3: Math.floor(Math.random() * 100),
          };
          break;
        case 'pieChart':
          newData = [
            { name: 'Group A', value: Math.floor(Math.random() * 100) },
            { name: 'Group B', value: Math.floor(Math.random() * 100) },
            { name: 'Group C', value: Math.floor(Math.random() * 100) },
            { name: 'Group D', value: Math.floor(Math.random() * 100) },
          ];
          break;
        default:
          newData = { timestamp, value: Math.floor(Math.random() * 100) };
      }

      dispatch(updateChartData({ chartId, data: newData }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [dispatch, chartId, type]);

  const renderChart = () => {
    switch (type) {
      case 'lineChart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'barChart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value1" fill="#8884d8" />
              <Bar dataKey="value2" fill="#82ca9d" />
              <Bar dataKey="value3" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'areaChart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pieChart':
        if (chartData.length === 0) return <div>Loading data...</div>;
        const latestData = chartData[chartData.length - 1];
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={latestData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {latestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="chart-container bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading data...</p>
        </div>
      ) : (
        renderChart()
      )}
    </div>
  );
};

export default RealTimeChart;