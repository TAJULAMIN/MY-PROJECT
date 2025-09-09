import React, { useState } from "react";
import { Button, Container, Typography, Paper, IconButton, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { sections } from "../Data/MenuData";
import  additem from "../assets/additem.png";

const StyledContainer = styled(Container)({
  padding: "32px",
  backgroundColor: "#fff8f0",
  minHeight: "80vh",
});

const SectionTitle = styled(Typography)({
  margin: "32px 0",
  fontWeight: "bold",
  color: "#e64a19",
  textAlign: "center",
  fontSize: "2rem",
  textTransform: "uppercase",
  borderBottom: "2px solid #e64a19",
  paddingBottom: "8px",
});

const MenuColumn = styled(Paper)({
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  border: "1px solid #e64a19",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  },
});

const IconWrapper = styled(IconButton)({
  color: "#e64a19",
  marginBottom: "8px",
  fontSize: "2rem",
});

const MenuPage = () => {
  const [menuSections, setMenuSections] = useState(sections);

  // ➕ Add item to a section
  const handleAddItem = (sectionIndex) => {
    const newItem = {
      name: "New Dish",
      price: "$0",
      image: "https://via.placeholder.com/150",
    };

    setMenuSections((prev) => {
      const updated = [...prev];
      updated[sectionIndex].items.push(newItem);
      return updated;
    });
  };

  // 🗑️ Delete item from a section
  const handleDeleteItem = (sectionIndex, itemIndex) => {
    setMenuSections((prev) => {
      const updated = [...prev];
      updated[sectionIndex].items.splice(itemIndex, 1);
      return updated;
    });
  };

  return (
    <StyledContainer>
      {menuSections.map(({ title, items, icon: Icon }, sectionIndex) => (
        <div key={sectionIndex}>
          <SectionTitle>{title}</SectionTitle>
          <Grid container spacing={2}>
            {items.map((item, itemIndex) => (
              <Grid item xs={12} sm={6} md={3} key={itemIndex}>
                <MenuColumn>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                  <IconWrapper>
                    <Icon />
                  </IconWrapper>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {item.price}
                  </Typography>

                  {/* 🗑️ Delete button */}
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteItem(sectionIndex, itemIndex)}
                    style={{ marginTop: "10px" }}
                  >
                    Delete
                  </Button>
                </MenuColumn>
              </Grid>
            ))}

            <Grid item xs={12} sm={6} md={3}>
  <MenuColumn
    onClick={() => handleAddItem(sectionIndex)}
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
       height: "auto",
       minHeight: "300px",
    }}
  >
   <img
  src={additem}
  alt="additem"
  style={{
    width: "60px",
    height: "60px",
    marginBottom: "10px",
  }}
/>
<Typography
  variant="h6"
  style={{
    
    marginTop: "8px",
    color: "#333",
  }}
>
  Add Item
</Typography>
 

  </MenuColumn>
</Grid>
          </Grid>
        </div>
      ))}
    </StyledContainer>
  );
};

export default MenuPage;
