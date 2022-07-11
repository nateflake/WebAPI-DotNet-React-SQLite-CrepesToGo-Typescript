import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import OrderDetail from "./OrderDetail";
import OrdersTable from "./OrdersTable";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    agent.Orders.list()
      .then(orders => setOrders(orders))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent message='Loading orders...' />

  if (orderNumber > 0) {
    var order = orders?.find(o => o.id === orderNumber);
    if (order == null) return (<></>);
    return (<OrderDetail order={order} setOrderNumber={setOrderNumber} />);
  }
  else {
    return (
      <OrdersTable orders={orders} setOrderNumber={setOrderNumber} />
    );
  }
}