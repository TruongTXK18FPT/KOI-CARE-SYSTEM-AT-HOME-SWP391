import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import '../styles/OrderDashboard.css';

const OrderDashBoard = () => {
  const [totalDeliveredAmount, setTotalDeliveredAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersByLocalDate, setOrdersByLocalDate] = useState([]);
  const [ordersByMonth, setOrdersByMonth] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get('http://localhost:8080/api/orders/filter?status=delivered', config);
        const deliveredOrders = response.data.content;
        const totalDeliveredAmount = deliveredOrders.reduce(
          (total, order) => total + order.totalAmount,
          0
        );
        setTotalDeliveredAmount(totalDeliveredAmount);
        setOrders(deliveredOrders);
        setFilteredOrders(deliveredOrders);

        // Group orders by local date
        const ordersByLocalDate = deliveredOrders.reduce((acc, order) => {
          const localDate = new Date(order.orderDate).toLocaleDateString();
          if (!acc[localDate]) {
            acc[localDate] = { localDate, totalAmount: 0 };
          }
          acc[localDate].totalAmount += order.totalAmount;
          return acc;
        }, {});
        setOrdersByLocalDate(Object.values(ordersByLocalDate));

        // Group orders by month
        const ordersByMonth = deliveredOrders.reduce((acc, order) => {
          const month = new Date(order.orderDate).toLocaleString('default', { month: 'short' });
          if (!acc[month]) {
            acc[month] = { month, totalAmount: 0 };
          }
          acc[month].totalAmount += order.totalAmount;
          return acc;
        }, {});
        setOrdersByMonth(Object.values(ordersByMonth));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter((order) =>
      order.customerFullName.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  return (
    <Card className="order-dashboard">
      <CardHeader>
        <h2 className="card-title">Order Dashboard</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Total Delivered Orders Amount</h2>
          <p className="text-4xl font-bold">{totalDeliveredAmount.toFixed(2)}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Delivered Orders by Local Date</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={ordersByLocalDate}>
              <XAxis dataKey="localDate" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Delivered Orders by Month</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={ordersByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Order Report</h2>
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.orderID}>
                  <TableCell>{order.orderID}</TableCell>
                  <TableCell>{order.customerFullName}</TableCell>
                  <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDashBoard;