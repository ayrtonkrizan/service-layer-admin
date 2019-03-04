# service-layer-admin - Simplified Service Layer client
This is a node module designed to be the simplest way possible to admin SAP Business One Service Layer calls.

### Features
- Session Administration;
- Simplified request names;
- Update and insert data with same JSON.
- Async methods.

### Testing
1 - Create a folder `mkdir sl-test`;
2 - Enter in this folder `cd sl-test`;
3 - Run `npm install service-layer-admin`;
4 - Create a file `index.js` and paste the code:
```javascript
var admin = require('service-layer-admin');
var sl = new admin({
    server: 'https://hanab1:50000/b1s/v1/',
    database: 'SBODEMOBR',
    sapUser: 'manager',
    sapPassword: '1234'
});

sl.getPN('C00001')
    .then(console.log)
    .catch(err => console.error('GETPN', err));
    
```
5 - run in terminal `node index.js`;

### ENDPOINTS
- Business Partners
    - getPN - sl.getPN('CardCode');
    - insertPN - sl.insertPN(json);
    - updatePN - sl.updatePN(json);

- Items
    - getItem - sl.getItem('ItemCode');
    - insertItem - sl.insertItem(json);
    - updateItem - sl.updateItem(json);

- Orders    
    - getPV - sl.getPV(DocEntry);
    - insertPV - sl.insertPV(json);
    - cancelPV - sl.cancelPV(DocEntry);

- Invoices
    - getNFS - sl.getNFS(DocEntry);
    - insertNFS - sl.insertNFS(json);
    - cancelNFS - sl.cancelNFS(DocEntry);

- Down Payments
    - getAdto - sl.getAdto(DocEntry);
    - insertAdto - sl.insertAdto(json);
    - cancelAdto - sl.cancelAdto(DocEntry);

- Incomming Payments
    - getCR - sl.getCR(DocEntry);
    - insertCR - sl.insertCR(json);
    - cancelCR - sl.cancelCR(DocEntry);

- Purchase Orders
    - getPC - sl.getPC(DocEntry);
    - insertPC - sl.insertPC(json);
    - cancelPC - sl.cancelPC(DocEntry);

- Purchase Invoices
    - getNFE - sl.getNFE(DocEntry);
    - insertNFE - sl.insertNFE(json);
    - cancelNFE - sl.cancelNFE(DocEntry);

- Outcomming Payments
    - getCP - sl.getCP(DocEntry);
    - insertCP - sl.insertCP(json);
    - cancelCP - sl.cancelCP(DocEntry);

- Journal Entries
    - getLCM - sl.getLCM(TransId);
    - insertLCM - sl.insertLCM(json);