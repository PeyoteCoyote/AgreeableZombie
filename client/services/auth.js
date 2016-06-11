import $ from 'jquery';

module.exports = {
	signin(email, pass, cb){
		var data = {
        email: email,
        password: pass
    };
    console.log('DATA on AUTH PAGE:', data);
    $.ajax({
      url: 'http://localhost:8000/api/signin/',
      dataType: 'json',
      data: data,
      type: 'POST',
      success: (result) => {
        console.log('Data on Signin:', result);
        window.localStorage.setItem('com.classly', result.token);
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('id', result.id);
        window.localStorage.setItem('firstname', result.firstname);
        if(cb){
        	cb(result);
        }
      },
      error: (xhr, status, err) => {
        console.error('Error on Signin:', status, err);
      }
	  });
	},

  signup(data, cb){
  	console.log('woot');
    $.ajax({
    	url: 'http://localhost:8000/api/signup/',
    	type: 'POST',
    	dataType: 'json',
    	data: data,
    	success: (result) => {
    		console.log('result in Signup Page: ', result);
        window.localStorage.setItem('com.classly', result.token);
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('id', result.id);
        window.localStorage.setItem('firstname', result.firstname);
    		if(cb){
          cb(result);
        }
    		// });
    	},
    	error: (xhr, status, err) => {
    		console.error('Error passing to server', status, err.toString());
    	}
    });
  },

  signedin(data, cb) {
    console.log('signedin');
    $.ajax({
      url: 'http://localhost:8000/api/signedin', 
      type: 'POST', 
      dataType: 'json', 
      data: data,
      success: (data) => {
        if(cb) {
          cb(data);
        }
      },
      error: (xhr, status, err) => {
        console.error('Error passing to server', status, err.toString());
      }
    });
  },

  // attachToken() {
  //   var jwt = $window.localStorage.getItem('com.classly');
  //   var attach = {
  //     if (jwt) {
  //       object.headers['x-access-token'] = jwt;
  //     }
  //     object.headers['Allow-Control-Allow-Origin'] = '*';
  //     return object;
  //   }         
  // }    
	getToken(){
		return localStorage.token;
	},

	logout(cb) {
		delete localStorage.token;
		if(cb){
			cb();
		}
		this.onChange(false);
	},
  
  loggedIn(){
  	return !!localStorage.token;
  },

  onChange(){}

}