export const getShoes = async () => {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        const response = await fetch('/api/products', { headers });
        if (!response.ok) throw new Error('Error fetching shoes');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
