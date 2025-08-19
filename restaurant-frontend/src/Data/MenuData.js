// src/data/menuData.js
import { LocalDining, Fastfood, Cake, LocalBar } from '@mui/icons-material';

export const sections = [
  {
    title: 'Starters',
    icon: LocalDining,
    items: [
      { name: 'Samosa', price: 'Rs:50', image: '/images/samosa.jpg' },
      { name: 'Spring Rolls', price: 'Rs:60', image: '/images/spring_rolls.jpg' },
      { name: 'Hummus', price: 'Rs:80', image: '/images/hummus.jpg' },
      { name: 'Cheese Balls', price: 'Rs:90', image: '/images/cheese_balls.jpg' },
      { name: 'Onion Rings', price: 'Rs:70', image: '/images/onion_rings.jpg' },
      { name: 'Stuffed Mushrooms', price: 'Rs:100', image: '/images/stuffed_mushrooms.jpg' },
      { name: 'Vegetable Pakora', price: 'Rs:80', image: '/images/vegetable_pakora.jpg' }
    ]
  },
  {
    title: 'Main Course',
    icon: Fastfood,
    items: [
      { name: 'Paneer Butter Masala', price: 'Rs:150', image: '/images/paneer_butter_masala.jpg' },
      { name: 'Dal Makhani', price: 'Rs:130', image: '/images/dal_makhani.jpg' },
      { name: 'Vegetable Biryani', price: 'Rs:180', image: '/images/vegetable_biryani.jpg' },
      { name: 'Vegetable Korma', price: 'Rs:140', image: '/images/vegetable_korma.jpg' },
      { name: 'Palak Paneer', price: 'Rs:160', image: '/images/palak_paneer.jpg' },
      { name: 'Chana Masala', price: 'Rs:140', image: '/images/chana_masala.jpg' },
      { name: 'Aloo Gobi', price: 'Rs:130', image: '/images/aloo_gobi.jpg' }
    ]
  },
  {
    title: 'Desserts',
    icon: Cake,
    items: [
      { name: 'Gulab Jamun', price: 'Rs:80', image: '/images/gulab_jamun.jpg' },
      { name: 'Jalebi', price: 'Rs:70', image: '/images/jalebi.jpg' },
      { name: 'Ras Malai', price: 'Rs:90', image: '/images/ras_malai.jpg' },
      { name: 'Kheer', price: 'Rs:75', image: '/images/kheer.jpg' },
      { name: 'Chocolate Mousse', price: 'Rs:100', image: '/images/chocolate_mousse.jpg' },
      { name: 'Fruit Custard', price: 'Rs:85', image: '/images/fruit_custard.jpg' },
      { name: 'Paneer Tikka', price: 'Rs:120', image: '/images/paneer_tikka.jpg' }
    ]
  },
  {
    title: 'Beverages',
    icon: LocalBar,
    items: [
      { name: 'Lassi', price: 'Rs:60', image: '/images/lassi.jpg' },
      { name: 'Mango Smoothie', price: 'Rs:70', image: '/images/mango_smoothie.jpg' },
      { name: 'Cold Coffee', price: 'Rs:80', image: '/images/cold_coffee.jpg' },
      { name: 'Masala Chai', price: 'Rs:50', image: '/images/masala_chai.jpg' },
      { name: 'Green Tea', price: 'Rs:40', image: '/images/green_tea.jpg' },
      { name: 'Buttermilk', price: 'Rs:55', image: '/images/buttermilk.jpg' },
      { name: 'Mint Lemonade', price: 'Rs:65', image: '/images/mint_lemonade.jpg' }
    ]
  }
];
