function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
   for(var i = 0; i <ca.length; i++) {
     var c = ca[i];
     while (c.charAt(0) == ' ') {
       c = c.substring(1);
     }
     if (c.indexOf(name) == 0) {
       return c.substring(name.length, c.length);
     }
   }
   return "";
 }

 function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/*
function loadUserInfo () {
  // Load user info
  let userButton = document.getElementById('userButton')
  if (getCookie('username').length > 0) {
    // User is logged in
    userButton.textContent = 'Hello ' + getCookie('username') + '!'
    userButton.setAttribute('data-target', '')
    userButton.setAttribute('data-toggle', '')
    userButton.setAttribute('href', './myAccount.html')

  } else {
    // User is not logged in
    userButton.textContent = 'Sign In'
    userButton.setAttribute('data-target', '#signinModal')
    userButton.setAttribute('data-toggle', 'modal')
    userButton.setAttribute('onclick', '')
  }
}
*/
/*
document.getElementById('signInButton').addEventListener('click', function (e) {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhttp.responseText)
      if (data.length > 0) {
        setCookie('username', document.getElementById('emailInput').value, 1)
        setCookie('password', document.getElementById('passwordInput').value, 1)
        loadUserInfo()
        console.log(getCookie('username'))
      } else {
        alert('Incorrect username or password.')
      }
    }
  }
  xhttp.open('POST', 'http://flip1.engr.oregonstate.edu:9987/login', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify({
    username: document.getElementById('emailInput').value,
    password: document.getElementById('passwordInput').value
  }))
})
*/
//loadUserInfo()