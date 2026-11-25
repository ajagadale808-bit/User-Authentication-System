const token = localStorage.getItem('token');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in
if (!token) {
    window.location.href = '/login.html';
} else {
    fetch('/api/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Unauthorized');
        }
        return response.json();
    })
    .then(data => {
        userInfo.textContent = data.message;
    })
    .catch(() => {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});