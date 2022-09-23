import { sample } from 'lodash';


const users = [...Array(6)].map(() => ({
  Name:"",
  ProductAmount: 0,
  PaymentAmount: 0,
  PaymentDate: 0,
  Debt: 0
    
}));

export default users;
