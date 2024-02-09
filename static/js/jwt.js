export function fetchJWT(email, password) {
    const credentials = btoa(`${email}:${password}`);

    const apiUrl = 'https://01.kood.tech/api/auth/signin';

    // POST request with Basic authentication
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        },
    })
        .then(response => response.json())
        .then(data => {
            // Wrong credentials
            if (data.error != null) {
                document.getElementById("jwtError").innerHTML = "Oops! Check your username and password"
            } else {
                // Right credentials
                // Set session cookie with jwt
                document.cookie = `jwt=${data}; secure; samesite=strict; path=/`;
                // Move to dashboard page
                window.location.href = '/dashboard';
            }
        })
        .catch(error => {
            // Fetch error
            console.error('Error:', error.message);
        });
}

export function getId() {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
    const decodedToken = JSON.parse(atob(jwt.split('.')[1]));
    // Access the x-hasura-user-id property
    return decodedToken['https://hasura.io/jwt/claims']['x-hasura-user-id'];
}