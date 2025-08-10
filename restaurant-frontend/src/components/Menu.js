import React from 'react';
import { Container, Typography, Paper, IconButton, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalDining, Fastfood, Cake, LocalBar } from '@mui/icons-material';

const StyledContainer = styled(Container)({
    padding: '32px',
    backgroundColor: '#fff8f0',
    minHeight: '80vh',
});

const SectionTitle = styled(Typography)({
    margin: '32px 0',
    fontWeight: 'bold',
    color: '#e64a19',
    textAlign: 'center',
    fontSize: '2rem',
    textTransform: 'uppercase',
    borderBottom: '2px solid #e64a19',
    paddingBottom: '8px',
});

const MenuColumn = styled(Paper)({
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    border: '1px solid #e64a19',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
    },
});

const IconWrapper = styled(IconButton)({
    color: '#e64a19',
    marginBottom: '8px',
    fontSize: '2rem',
});

const sections = [
    {
      title: 'Starters',
      icon: LocalDining,
      items: [
        { name: 'Samosa', price: '₹50', image: '/images/samosa.jpg' },
        { name: 'Spring Rolls', price: '₹60', image: '/images/spring_rolls.jpg' },
        { name: 'Hummus', price: '₹80', image: '/images/hummus.jpg' },
        { name: 'Cheese Balls', price: '₹90', image: '/images/cheese_balls.jpg' },
        { name: 'Onion Rings', price: '₹70', image: '/images/onion_rings.jpg' },
        { name: 'Stuffed Mushrooms', price: '₹100', image: '/images/stuffed_mushrooms.jpg' },
        { name: 'Vegetable Pakora', price: '₹80', image: '/images/vegetable_pakora.jpg' }
      ]
    },
    {
      title: 'Main Course',
      icon: Fastfood,
      items: [
        { name: 'Paneer Butter Masala', price: '₹150', image: '/images/paneer_butter_masala.jpg' },
        { name: 'Dal Makhani', price: '₹130', image: '/images/dal_makhani.jpg' },
        { name: 'Vegetable Biryani', price: '₹180', image: '/images/vegetable_biryani.jpg' },
        { name: 'Vegetable Korma', price: '₹140', image: '/images/vegetable_korma.jpg' },
        { name: 'Palak Paneer', price: '₹160', image: '/images/palak_paneer.jpg' },
        { name: 'Chana Masala', price: '₹140', image: '/images/chana_masala.jpg' },
        { name: 'Aloo Gobi', price: '₹130', image: '/images/aloo_gobi.jpg' }
      ]
    },
    {
      title: 'Desserts',
      icon: Cake,
      items: [
        { name: 'Gulab Jamun', price: '₹80', image: '/images/gulab_jamun.jpg' },
        { name: 'Jalebi', price: '₹70', image: '/images/jalebi.jpg' },
        { name: 'Ras Malai', price: '₹90', image: '/images/ras_malai.jpg' },
        { name: 'Kheer', price: '₹75', image: '/images/kheer.jpg' },
        { name: 'Chocolate Mousse', price: '₹100', image: '/images/chocolate_mousse.jpg' },
        { name: 'Fruit Custard', price: '₹85', image: '/images/fruit_custard.jpg' },
        { name: 'Paneer Tikka', price: '₹120', image: '/images/paneer_tikka.jpg' }
      ]
    },
    {
      title: 'Beverages',
      icon: LocalBar,
      items: [
        { name: 'Lassi', price: '₹60', image: '/images/lassi.jpg' },
        { name: 'Mango Smoothie', price: '₹70', image: '/images/mango_smoothie.jpg' },
        { name: 'Cold Coffee', price: '₹80', image: '/images/cold_coffee.jpg' },
        { name: 'Masala Chai', price: '₹50', image: '/images/masala_chai.jpg' },
        { name: 'Green Tea', price: '₹40', image: '/images/green_tea.jpg' },
        { name: 'Buttermilk', price: '₹55', image: '/images/buttermilk.jpg' },
        { name: 'Mint Lemonade', price: '₹65', image: '/images/mint_lemonade.jpg' }
      ]
    }
  ];
  

  const MenuPage = () => (
    <StyledContainer>
      {sections.map(({ title, items, icon: Icon }, idx) => (
        <div key={idx}>
          <SectionTitle>{title}</SectionTitle>
          <Grid container spacing={2}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MenuColumn>
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '8px',
                    }}
                  />
  
                  {/* Icon */}
                  <IconWrapper>
                    <Icon />
                  </IconWrapper>
  
                  {/* Name */}
                  <Typography variant="h6">{item.name}</Typography>
  
                  {/* Price */}
                  <Typography variant="body1" color="textSecondary">
                    {item.price}
                  </Typography>
                </MenuColumn>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </StyledContainer>
  );
  

export default MenuPage;
