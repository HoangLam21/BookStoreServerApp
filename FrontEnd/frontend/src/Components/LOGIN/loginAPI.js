const loginAPI = async (username, password) => {
    try {
      let response = await fetch('http://167.172.69.8:8010/BookStore/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        let errorData = await response.json();
        return { status: response.status, data: errorData };
      }
  
      let data = await response.json();
      console.log(data.token, "token ben loginAPI");
      return data;
  
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, data: { error: 'Something went wrong, please try again later.' } };
    }
  };
  
  export default loginAPI;
  