import { Table } from '@components/ui/table';
import Input from '@components/ui/form/input';
import { useState } from 'react';
import Pagination from '@components/ui/pagination';
import ActionsButton from '@components/ui/action-button';
import { TotalPrice } from '@components/order/price';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';

export const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
};

export const Status: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <span className={item?.status?.name?.replace(/\s/g, '_').toLowerCase()}>
      <span
        className="bullet"
        style={{ backgroundColor: item?.status?.color }}
      />
      {item?.status?.name}
    </span>
  );
};

const OrderTable: React.FC<{ orders?: any; admin: any }> = ({
  orders,
  admin,
}) => {
  return (
    <>
      <div className="order-list-table-wraper">
        <div className="table w-full ">
          <div className="table-header-group font-bold bg-slate-200 p-3">
            <div className="table-cell whitespace-nowrap p-3">
              {admin ? 'Email' : 'Order Id'}
            </div>
            <div className="table-cell whitespace-nowrap p-3">Status</div>
            <div className="table-cell whitespace-nowrap p-3">Order Date</div>
            <div className="table-cell whitespace-nowrap p-3">Amount</div>
            <div className="table-cell whitespace-nowrap p-3">Price</div>
          </div>
          <div className="table-row-group">
            {orders.map((order) => {
              return (
                <div className="table-row border-t border-black">
                  <div className="table-cell whitespace-nowrap p-2">
                    {admin ? order.userId.email : order._id}
                  </div>
                  <div className="table-cell whitespace-nowrap p-2">
                    {order.status}
                  </div>
                  <div className="table-cell whitespace-nowrap p-2">
                    {moment(order.createdAt).format('DD/MM/YYYY hh:mm')}
                  </div>
                  <div className="table-cell whitespace-nowrap p-2">
                    {order?.amount ? order.amount : 1}
                  </div>
                  <div className="table-cell whitespace-nowrap p-2">
                    $
                    {order.amount
                      ? order.amount * order.prouductId?.price
                      : order.prouductId?.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
