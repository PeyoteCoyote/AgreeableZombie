import $ from 'jquery';

module.exports = {
	signin(email, pass, cb){
		var data = {
        email: email,
        password: pass
    };
    $.ajax({
      url: 'http://localhost:8000/api/signin',
      datatype: 'json',
      data: data,
      type: 'POST',
      success: (data) => {
        console.log('Data on Signin:', data);
        if(cb){
        	cb(data);
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
    	success: (data) => {
    		console.log('DATA in Signup Page: ', data);
    		// this.setState({
    		if(cb){
          cb(data);
        }
    		// });
    	},
    	error: (xhr, status, err) => {
    		console.error('Error passing to server', status, err.toString());
    	}
    });
  },
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