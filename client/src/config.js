const config = {
  development: {
    API_URL: "http://localhost:3030"
  },
  test: {
    API_URL: "http://localhost:3030"
  },
  production: {
    API_URL: "https://restful-link.herokuapp.com"
  }
};

export const { API_URL } = config[process.env.NODE_ENV];
