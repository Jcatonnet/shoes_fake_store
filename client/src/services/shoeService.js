export const getShoes = async () => {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Error fetching shoes');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
