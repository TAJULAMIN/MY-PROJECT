import React from 'react';
import { Container, Typography, Paper, IconButton, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sections } from '../Data/MenuData';  // 👈 import data

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
