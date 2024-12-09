export interface DataContexts {
  terms: boolean;
  language: string;
  currency: {
    name: string;
    sell: number;
    buy: number;
  };
  transaction: {
    currency: string;
    method: string;
    amount: number;
    price: number;
  },
  transactionSessionTimeout: {
    status: boolean;
    timeLeft: number;
  },
  payment: number;
  amount: number;
}

export function saveToLocalData(type: string, data: any): void {
  try {
    const session = localStorage.getItem('session');
    if (!session) {
      throw new Error('Wystąpił problem z zapisanem danych do lokalnej sesji [2]');
    }
    let tmp = JSON.parse(session);
    switch (type) {
      case 'TERMS_ACCEPT':
        tmp.terms = data;
        break;
      case 'CHANGE_LANGUAGE':
        tmp.language = data;
        break;
      case 'CHANGE_CURRENCY':
        tmp.currency = data;
        break;
      case 'CREATE_TRANSACTION':
      case 'TRANSACTION_SESSION_DESTROY':
        tmp.transaction = data;
        break;
      case 'TRANSACTION_START_TIMEOUT':
      case 'TRANSACTION_STOP_TIMEOUT':
        tmp.transactionSessionTimeout = data;
        break;
    }
    localStorage.setItem('session', JSON.stringify(tmp));
  } catch (error) {
    throw new Error('Wystąpił problem z zapisanem danych do lokalnej sesji [1]');
  }
}

export function syncWithLocalData(): DataContexts {
  let check = localStorage.getItem('session');
  if (check) {
    return JSON.parse(check);
  } else {
    const defaultDataContext: DataContexts = {
      terms: false,
      language: 'PL',
      currency: {
        name: '',
        sell: 0,
        buy: 0
      },
      transaction: {
        currency: '',
        method: '',
        amount: 0,
        price: 0
      },
      transactionSessionTimeout: {
        status: false,
        timeLeft: 0
      },
      payment: 0,
      amount: 0
    };
    localStorage.setItem('session', JSON.stringify(defaultDataContext));
    return defaultDataContext;
  }
}