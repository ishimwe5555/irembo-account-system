const api = {
    baseUrl: 'https://irembo-account-system-production.up.railway.app',
  
    async request(method, path, data) {
      const url = this.baseUrl + path;
      const headers = {
        'Content-Type': 'application/json',
      };
      const options = {
        method: method.toUpperCase(),
        headers,
      };
      if (data) {
        options.body = JSON.stringify(data);
      }
      const response = await fetch(url, options);
    
      const responseJson = await response.json();
      return responseJson;
    },
  
    async get(path) {
      return this.request('GET', path);
    },
  
    async post(path, data) {
      return this.request('POST', path, data);
    },
  
    async put(path, data) {
      return this.request('PUT', path, data);
    },
  
    async delete(path) {
      return this.request('DELETE', path);
    },
  };
  
  export default api;
  