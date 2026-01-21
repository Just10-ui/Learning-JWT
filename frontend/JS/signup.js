const submit = document.getElementById('signup');

submit.addEventListener('click', userSignup);

async function userSignup() {
  const errorMsg = document.getElementById('error');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  try {
    const response = await fetch('http://localhost:8080/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      })
    });
    const data = await response.json();

    if (response.ok) {
      window.alert(data.message);
    } else {
      errorMsg.innerText = `* ${data.message}`;
      errorMsg.style.opacity = 1;
    }

  } catch (error) {
    console.log(error);
  }
}