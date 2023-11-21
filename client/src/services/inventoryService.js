export const fetchUserInventory = async (userId, setInventory) => {
    try {
        const response = await fetch(`api/inventory/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user inventory');
        }
        const inventoryData = await response.json()
        setInventory(inventoryData)
    } catch (error) {
        console.error('Error fetching user inventory:', error);
        throw error;
    }
};

export const addUserInventoryItems = async (userId, purchasedItems) => {
    try {
        const response = await fetch(`/api/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ userId, items: purchasedItems })
        });

        if (!response.ok) {
            throw new Error('Failed to add items to inventory');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding items to inventory:', error);
        throw error;
    }
};
