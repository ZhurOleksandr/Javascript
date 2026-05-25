function processProducts(products) {
    if (!Array.isArray(products)) {
        return { available: [], totalPrice: 0, cheapest: null, priceList: [] };
    }

    const available = products
        .filter(p => p.inStock)
        .map(p => p.name);

    const totalPrice = products
        .filter(p => p.inStock)
        .reduce((sum, p) => sum + p.price, 0);

    let cheapest = null;
    let minPrice = Infinity;

    for (let p of products) {
        if (p.inStock && p.price < minPrice) {
            minPrice = p.price;
            cheapest = p.name;
        }
    }

    const priceList = products.map(p => `${p.name} — ${p.price} грн`);

    return {
        available,
        totalPrice,
        cheapest,
        priceList
    };
}

// Тест
const products = [
    { name: "Чай", price: 50, inStock: true },
    { name: "Кава", price: 120, inStock: false },
    { name: "Цукор", price: 30, inStock: true }
];

console.log('Task2: ', processProducts(products));