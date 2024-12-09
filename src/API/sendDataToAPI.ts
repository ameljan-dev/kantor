async function sendDataToAPI(url: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    const timeout: number = 3000;

    xhr.open("POST", url, true);
    xhr.timeout = timeout;
    xhr.setRequestHeader('x-currency-token', 'dasdiubasiob1=231231238913y4-n432r2nby83rt29');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`Błąd HTTP [1]: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("[Błąd HTTP [2]: Problem z połączeniem"));

    xhr.ontimeout = () => {
      reject(new Error(`Błąd HTTP [3]: Czas żądania upłynął (${timeout}ms timeout)`));
    };

    xhr.send(JSON.stringify(data));
  });
}

export default sendDataToAPI;