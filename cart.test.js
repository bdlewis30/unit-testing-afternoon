const cart = require('./cart');
const cars = require('./data/cars');

describe('Cart Properties:', () => {
    test('Cart should default to an empty array', () => {
        expect(Array.isArray(cart.cart)).toEqual(true)
        expect( cart.cart.length).toEqual(0)
    })
    test('Total should default to 0', () => {
        expect(cart.total).toEqual(0)
    })
})

describe('Cart Methods:', () => {
    afterEach(() => {
        cart.cart = [];
        cart.total = 0;
    })
    test('addToCart() should add a car object to the cart array', () => {
        cart.addToCart(cars[5])
        cart.addToCart(cars[6])

        expect(cart.cart.length).toEqual(2)
        expect(cart.cart[0]).toEqual(cars[5])
        expect(cart.cart[1]).toEqual(cars[6])
    })
    test('addToCart() should increase the total', () => {
        cart.addToCart(cars[0])
        cart.addToCart(cars[15])
        cart.addToCart(cars[12])

        expect(cart.total).toEqual(cars[0].price + cars[15].price + cars[12].price)
    })
    test('removeFromCart() should remove one item from the cart', () => {
        cart.addToCart(cars[0])
        cart.addToCart(cars[1])
        cart.addToCart(cars[2])

        cart.removeFromCart(1, cars[1].price)

        expect(cart.cart.length).toEqual(2)
        expect(cart.cart[0]).toEqual(cars[0])
        expect(cart.cart[1]).toEqual(cars[2])
    })
    test('removeFromCart() should decrease the total', () => {
        cart.addToCart(cars[0])
        cart.addToCart(cars[15])
        cart.addToCart(cars[12])

        cart.removeFromCart(0, cars[0].price)
        cart.removeFromCart(1, cars[12].price)
        
        expect(cart.total).toEqual(cars[15].price)
    })
    test('checkout() should empty the cart array and set total to 0', () => {
        cart.addToCart(cars[9])
        cart.addToCart(cars[13])
        cart.addToCart(cars[17])
        cart.addToCart(cars[1])

        cart.checkout()

        expect(cart.cart.length).toEqual(0)
        expect(cart.total).toEqual(0)
    })
})