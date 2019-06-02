document.getElementById('register').addEventListener('click', (event) => {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhttp.responseText
      if (data.length === 5) {
        setCookie('username', document.getElementById('inputUsername').value, 1)
        setCookie('password', document.getElementById('inputPassword').value, 1)
        loadUserInfo()
      } else {
        alert('Error: Username already exists!')
      }
    }
  }
  xhttp.open('POST', 'http://flip1.engr.oregonstate.edu:9987/createAccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify({
    userName: document.getElementById('emailInput').value,
    password: document.getElementById('passwordInput').value,
    firstName: document.getElementById('inputFirstName').value,
    lastName: document.getElementById('inputLastName').value,
  }))
})

/*
if (getCookie('username').length > 0) {
  let button = document.getElementById('mainButton')
  button.setAttribute('data-toggle', '')
  button.setAttribute('data-target', '')
  button.setAttribute('href', 'flights.html')
  button.textContent = 'Find a Flight'
}
*/