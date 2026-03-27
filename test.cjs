fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({username: "test2028", password: "password"})
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
});
