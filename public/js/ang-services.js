app.service('sessionService', function(){
    var userIsAuthenticated = false;
    var userData = null;

    this.setUserAuthenticated = function(value){
        userIsAuthenticated = value;
    };
    
    this.setUserData = function(data){
        userData = data;
    }

    this.getUserAuthenticated = function(){
        return userIsAuthenticated;
    }

    this.getUserData = function(){
        return userData;
    }
});