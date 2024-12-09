import { createMachine, assign } from 'xstate';
import { DataContexts, saveToLocalData, syncWithLocalData } from './localStorage';

type DataEvents =
  | { type: 'TERMS_ACCEPT' }
  | { 
      type: 'CHANGE_LANGUAGE';
      value: string;
    }
  | { 
      type: 'CHANGE_CURRENCY';
      name: string;
      sell: number;
      buy: number;
    }
  | { 
      type: 'CHANGE_PREVIOUS_PAGE';
      value: number;
    }
  | { 
      type: 'CREATE_TRANSACTION';
      currency: string;
      method: string;
      amount: number;
      price: number;
    }
  | { type: 'TRANSACTION_START_TIMEOUT' }
  | { type: 'TRANSACTION_STOP_TIMEOUT' }
  | { type: 'TRANSACTION_SESSION_DESTROY' }

export const storageData = createMachine({
  types: {} as {
    context: DataContexts;
    events: DataEvents;
  },
  id: 'dataManagament',
  context: syncWithLocalData(),
  on: {
    TERMS_ACCEPT: {
      actions: assign({
        terms: (context) => {
          const newData = true;
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    },
    CHANGE_LANGUAGE: {
      actions: assign({
        language: (context) => {
          const newData = context.event.value;
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    },
    CHANGE_CURRENCY: {
      actions: assign({
        currency: (context) => {
          const newData = { name: context.event.name, sell: context.event.sell, buy: context.event.buy };
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    },
    CREATE_TRANSACTION: {
      actions: assign({
        transaction: (context) => {
          const newData = { currency: context.event.currency, method: context.event.method, amount: context.event.amount, price: context.event.price };
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    },
    TRANSACTION_START_TIMEOUT: {
      actions: assign({
        transactionSessionTimeout: (context) => {
          let timeInMilliseconds = new Date().getTime() + (30 * 1000);
          const newData = { status: true, timeLeft: timeInMilliseconds }
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    },
    TRANSACTION_STOP_TIMEOUT: {
      actions: assign({
        transactionSessionTimeout: (context) => {
          const newData = { status: false, timeLeft: 0 }
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    },
    TRANSACTION_SESSION_DESTROY: {
      actions: assign({
        transaction: (context) => {
          const newData = { currency: '', method: '', amount: 0, price: 0 };
          saveToLocalData(context.event.type, newData);
          return newData;
        }
      })
    }
  }
});