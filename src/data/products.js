import headphone from '@/assets/images/headphone.jpg'
import clock from '@/assets/images/clock.jpg'
import bag from '@/assets/images/bag.jpg'
import shoes from '@/assets/images/shoes.jpg'
import seeds from '@/assets/images/seeds.jpg'
import cover from '@/assets/images/cover.jpg'
import glass from '@/assets/images/glass.jpg'
import lamp from '@/assets/images/lamp.jpg'
import speaker from '@/assets/images/speaker.jpg'
import jacket from '@/assets/images/jacket.jpg'
import mouse from '@/assets/images/mouse.jpg'
import flower from '@/assets/images/flower.jpg'

export const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 129.99, rating: 4.8, image: headphone, description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.' },
    { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 199.0, rating: 4.6, image: clock, description: 'Stay connected with a sleek smartwatch featuring heart-rate tracking, GPS, and a vibrant AMOLED display.' },
    { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', price: 79.5, rating: 4.4, image: bag, description: 'Portable Bluetooth speaker delivering rich 360° sound, deep bass, and up to 12 hours of playtime.' },
    { id: 4, name: 'Gaming Mouse', category: 'Fashion', price: 49.99, rating: 4.7, image: shoes, description: 'Ergonomic gaming mouse with adjustable DPI, programmable buttons, and responsive RGB lighting.' },
    { id: 5, name: 'Denim Jacket', category: 'Fashion', price: 89.0, rating: 4.5, image: seeds, description: 'Classic denim jacket crafted from durable cotton with a comfortable fit for everyday style.' },
    { id: 6, name: 'Running Sneakers', category: 'Fashion', price: 110.0, rating: 4.8, image: cover, description: 'Lightweight running sneakers with breathable mesh and cushioned soles for all-day comfort.' },
    { id: 7, name: 'Leather Backpack', category: 'Fashion', price: 75.0, rating: 4.3, image: glass, description: 'Stylish leather backpack with spacious compartments and a padded laptop sleeve.' },
    { id: 8, name: 'Aviator Sunglasses', category: 'Fashion', price: 59.99, rating: 4.2, image: lamp, description: 'Timeless aviator sunglasses with UV400 protection and a lightweight metal frame.' },
    { id: 9, name: 'Modern Table Lamp', category: 'Home', price: 45.0, rating: 4.6, image: speaker, description: 'Minimalist table lamp with a warm ambient glow, perfect for bedrooms and workspaces.' },
    { id: 10, name: 'Modern Table Lamp', category: 'Home', price: 45.0, rating: 4.6, image: jacket, description: 'Elegant table lamp with adjustable brightness and a contemporary design that complements any room.' },
    { id: 11, name: 'Throw Blanket', category: 'Home', price: 39.99, rating: 4.7, image: mouse, description: 'Soft and cozy throw blanket made from premium fabric to keep you warm on chilly evenings.' },
    { id: 12, name: 'Coffee Maker', category: 'Home', price: 89.0, rating: 4.5, image: flower, description: 'Compact coffee maker brewing rich, aromatic coffee with a built-in timer and auto shut-off.' },
    {
        id: 13,
        name: 'Running Shoes',
        category: 'Sports', 
        price: 99.99,
        rating: 4.8,
        image: shoes,
        description: 'High-performance running shoes with responsive cushioning and a durable grip outsole.'
    },
    {
        id: 14,
        name: 'Sports Backpack',
        category: 'Sports',
        price: 65.00,
        rating: 4.5,
        image: bag,
        description: 'Durable sports backpack with multiple pockets and breathable straps for active days.'
    },
]

export const getProductById = (id) => products.find((product) => String(product.id) === String(id))
