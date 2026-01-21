const submit = document.getElementById('login');

submit.addEventListener('click', userLogin);

async function userLogin() {
  const errorMsg = document.getElementById('error');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  try {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value
      })
    });
    const data = await response.json();

    if (response.ok) {
      errorMsg.style.opacity = 0;
      localStorage.setItem('token', data.token);
      console.log(data.token);     
      window.alert(data.message);
    } else {
      errorMsg.innerText = `* ${data.message}`;
      errorMsg.style.opacity = 1;
    }

  } catch (error) {
    console.log(error);
  }
}