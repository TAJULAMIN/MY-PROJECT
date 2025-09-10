import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Paper, IconButton, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import additem from "../assets/additem.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { LocalDining, Fastfood, Cake, LocalBar } from '@mui/icons-material';
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const StyledContainer = styled(Container)({
  padding: "32px",
  backgroundColor: "#fff8f0",
  minHeight: "80vh",
});
const iconMap = {
  LocalDining: LocalDining,
  Fastfood: Fastfood,
  Cake: Cake,
  LocalBar: LocalBar,
};
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
  const [menuSections, setMenuSections] = useState([]);
  const navigate = useNavigate();


// ✅ Auth and admin check
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  

  // ✅ Fetch menu from MongoDB
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenuSections(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };

    fetchMenu();
  }, []);

// Delete item with toast confirmation
const handleDeleteItem = (sectionIndex, itemIndex) => {
  const section = menuSections[sectionIndex];
  const item = section.items[itemIndex];

  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete the item "{item.name}"?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "white",
              "&:hover": { backgroundColor: "#E64A19" },
            }}
            onClick={async () => {
              try {
                // Call backend to delete the item
                await axios.delete(
                  `http://localhost:5000/api/menu/${section._id}/items/${item._id}`
                );

                // Update frontend state
                setMenuSections((prev) => {
                  const updated = [...prev];
                  updated[sectionIndex].items.splice(itemIndex, 1);
                  return updated;
                });

                toast.success("Item deleted successfully!");
                closeToast();
              } catch (err) {
                console.error("Failed to delete item:", err);
                toast.error("Failed to delete item");
              }
            }}
          >
            Yes, Delete
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#FF5722",
              borderColor: "#FF5722",
              "&:hover": { borderColor: "#E64A19", color: "#E64A19" },
            }}
            onClick={closeToast}
          >
            Cancel
          </Button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};


  const handleAddItem = (sectionIndex) => {
    const sectionId = menuSections[sectionIndex]._id;
    navigate(`/add-item/${sectionId}`); // optional, you can remove this if you don't want Add page
  };

  return (
    <StyledContainer>
      {menuSections.map(({ _id, title, items, icon: Icon }, sectionIndex) => (
        <div key={_id}>
          <SectionTitle>{title}</SectionTitle>
          <Grid container spacing={2}>
            {items.map((item, itemIndex) => {
  const IconComponent = iconMap[menuSections[sectionIndex].icon];
  return (
    <Grid item xs={12} sm={6} md={3} key={item._id}>
      <MenuColumn>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }}
        />
        {IconComponent && <IconWrapper><IconComponent /></IconWrapper>}
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body1" color="textSecondary">{item.price}</Typography>
        {isAdmin && (
  <Button
    size="small"
    color="error"
    onClick={() => handleDeleteItem(sectionIndex, itemIndex)}
    style={{ marginTop: "10px" }}
  >
    Delete
  </Button>
)}

      </MenuColumn>
    </Grid>
  );
})}


            {isAdmin && (
  <Grid item xs={12} sm={6} md={3}>
    <MenuColumn
      onClick={() => handleAddItem(sectionIndex)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        minHeight: "300px",
      }}
    >
      <img
        src={additem}
        alt="additem"
        style={{ width: "60px", height: "60px", marginBottom: "10px" }}
      />
      <Typography variant="h6" style={{ marginTop: "8px", color: "#333" }}>
        Add Item
      </Typography>
    </MenuColumn>
  </Grid>
)}



          </Grid>

          
        </div>
        
      ))}
{isAdmin && (
  <div>
    <SectionTitle>Sections</SectionTitle>

    <Grid container spacing={2}>
      {/* Single Manage Section Card */}
      <Grid item xs={12} sm={6} md={3}>
        <MenuColumn
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
          onClick={() => navigate("/manage-sections")}
        >
          <Typography variant="h6" color="#4caf50">
            Manage Sections
          </Typography>
          <Typography variant="body2" color="#555" sx={{ textAlign: "center", marginTop: 1 }}>
            Add new sections or delete existing ones
          </Typography>
        </MenuColumn>
      </Grid>
    </Grid>
  </div>
)}


       <ToastContainer />
    </StyledContainer>
    
  );
};

export default MenuPage;
