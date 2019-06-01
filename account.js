document.getElementById('register').addEventListener('click', (event) => {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhttp.responseText
      if (data.length === 5) {
        setCookie('email', document.getElementById('materialFormRegisterEmailEx').value, 1)
        setCookie('password', document.getElementById('materialFormRegisterPasswordEx').value, 1)
        loadUserInfo()
      } else {
        alert('Error: Username already exists!')
      }
    }
  }
  xhttp.open('POST', 'http://flip1.engr.oregonstate.edu:9987/createAccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify({
    email: document.getElementById('materialFormRegisterEmailEx').value,
    password: document.getElementById('materialFormRegisterPasswordEx').value,
  }))
})

