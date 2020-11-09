import axios from "axios";

export default {
  saveUserSignUpForm: function (signUpData) {
    return axios.post('/register', signUpData)
      .then(data => window.location = '/login');
  },

  logInUser: function (logInData) {
    return axios.post('/login', logInData)
      .then(data => {
        console.log(data.data.username)
          window.location = '/';
          return data;

      })
      .catch(error => {
        console.log(error);
        if (error) {
          alert('Incorrect email or password');
          return;
        }
      });
  }
};
