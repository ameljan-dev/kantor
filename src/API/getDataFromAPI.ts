

async function getDataFromAPI(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const timeout: number = 3000;

    xhr.open("GET", url, true); 
    xhr.timeout = timeout;
    xhr.setRequestHeader('x-currency-token', 'dasdiubasiob1=231231238913y4-n432r2nby83rt29');
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const jsonResponse = JSON.parse(xhr.responseText); 
          resolve(jsonResponse); 
        } catch (error) {
          reject(new Error("Błąd HTTP [1]: Błędny format JSON"));
        }
      } else {
        reject(new Error(`Błąd HTTP [2]: ${xhr.status}`)); 
      }
    };

    xhr.onerror = () => {
      reject(new Error('Błąd HTTP [3]: Problem z połączeniem'));
    };

    xhr.ontimeout = () => {
      reject(new Error(`Błąd HTTP [4]: Czas żądania upłynął (${timeout}ms timeout)`));
    };

    xhr.send();
  });
}

export default getDataFromAPI;