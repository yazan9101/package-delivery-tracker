// ==== REGISTER WITH FIREBASE AUTH + FIRESTORE ====
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const fullName = document.querySelector("input[placeholder='Full Name']").value;
  const email    = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;
  const role     = document.getElementById("role").value;

  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return firebase.firestore()
        .collection("users")
        .doc(user.uid)
        .set({ fullName, email, role });
    })
    .then(() => {
      alert("Registration successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// ==== LOGIN WITH FIREBASE AUTH ====
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const email    = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
