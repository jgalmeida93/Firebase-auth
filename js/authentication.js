// Buttons
const authEmailPassButton = document.getElementById('authEmailPassButton');
const createUserButton = document.getElementById('createUserButton');
const authGitHubButton = document.getElementById('authGitHubButton');
const authFacebookButton = document.getElementById('authFacebookButton');
const authTwitterButton = document.getElementById('authTwitterButton');
const authGoogleButton = document.getElementById('authGoogleButton');
const authAnonymousButton = document.getElementById('authAnonymousButton');
const logOutButton = document.getElementById('logOutButton');

// Inputs
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// Displays
const displayName = document.getElementById('displayName');


//Criar novo usuário
createUserButton.addEventListener('click', function () {
    firebase.auth()
            .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then(function () {
                alert('Bem vindo ' + emailInput.value + '!');
            })
            .catch(function (error) {
                console.error(error.code);
                console.error(error.message);
                alert('Falha ao cadastrar, verifique o erro no console!');
            });
});

// Logar usuário já cadastrado
authEmailPassButton.addEventListener('click', function () {
    firebase
            .auth()
            .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then(function (result) {
                console.log(result);
                displayName.innerText = 'Bem vindo,' + emailInput.value + '!';
                alert('Autenticado ' + emailInput.value);                
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
});

//Logar com GitHub
authGitHubButton.addEventListener('click', function () {
    var provider = new firebase.auth.GithubAuthProvider();


      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.emailInput;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    
});

logOutButton.addEventListener('click', function () {
    firebase
            .auth()
            .signOut()
            .then(function () {
                displayName.innerText = 'Você não está autenticado';
                alert('Você deslogou!');
            }, function(error) {
                console.log(error);
                
            });
});
