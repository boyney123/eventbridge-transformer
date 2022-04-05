export const event = {
  version: '0',
  id: '0d079340-135a-c8c6-95c2-41fb8f496c53',
  'detail-type': 'OrderCreated',
  source: 'myapp.orders',
  account: '123451235123',
  time: '2022-02-01T18:41:53Z',
  region: 'us-west-1',
  detail: {
    metadata: {
      correlation_id: 'dddd9340-135a-c8c6-95c2-41fb8f492222',
      service: 'my-service',
      domain: 'SHOP',
    },
    data: {
      amount: '19.99',
      quantity: '2',
      orderId: '0d079340-535a-c8c6-95c2-41fb8f496c53',
      userId: '9e223efa-e318-4e06-84d3-8734db2f31ea',
    },
  },
};
