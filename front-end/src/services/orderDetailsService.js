import { getOrderDetails, updateOrderStatus } from './api';

export const getOrder = async (id) => getOrderDetails(id);

export const updateStatus = async (id, setOrder, string) => {
  const newOrder = await updateOrderStatus(id, string);

  setOrder(newOrder);
};
