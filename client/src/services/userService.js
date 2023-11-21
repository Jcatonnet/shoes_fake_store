
const registerUser = async (userData) => {
    try {
        const response = await fetch(`api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

const loginUser = async (loginData) => {
    try {
        const response = await fetch(`api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
const getUserProfile = async () => {
    const response = await fetch('/api/users/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    return response.json();
};


const updateUserProfile = async (userData) => {
    try {
        const response = await fetch('/api/users/updateProfile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }

        const updatedData = await response.json();
        return updatedData;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
