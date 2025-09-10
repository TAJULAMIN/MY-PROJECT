import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledContainer = styled(Container)({
  padding: "32px",
  minHeight: "80vh",
  backgroundColor: "#fff8f0",
});

const Card = styled(Paper)({
  padding: "24px",
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
  },
});

const AddItemPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [formData, setFormData] = useState({ name: "", price: "", image: "" });

  if (!isAdmin) return <Typography>You are not authorized to access this page.</Typography>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
const handleAddItemWithConfirmation = () => {
  if (!formData.name || !formData.price || !formData.image) {
    return toast.error("Please fill in all fields!", { position: "top-center" });
  }

  toast(
    ({ closeToast }) => (
      <div style={{ textAlign: "center", minWidth: 250 }}>
        <p>Do you want to add the item "{formData.name}"?</p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#4CAF50", color: "white", "&:hover": { backgroundColor: "#388E3C" } }}
             
            onClick={async () => {
              toast.success("Item added successfully!", { position: "top-center", autoClose: 2500 });
              closeToast(); // Close the confirmation toast
              try {

                await axios.post(`http://localhost:5000/api/menu/${sectionId}/items`, formData);
                setFormData({ name: "", price: "", image: "" });
              
                // ✅ Close the toast immediately after success
              

                // Optional redirect
                navigate("/menu");
              } catch (err) {
                console.error(err);
                toast.error("Failed to add item!", { position: "top-center", autoClose: 2500 });
                closeToast(); // Close toast even on error
               
              }
            }}
          >
            Yes, Add
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#4CAF50", borderColor: "#4CAF50", "&:hover": { borderColor: "#388E3C", color: "#388E3C" } }}
            onClick={closeToast}
          >
            Cancel
          </Button>
        </div>
      </div>
    ),
    { autoClose: false, position: "top-center" }
  );
};


  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" gutterBottom>Add New Item</Typography>

      <Card>
        <form style={{ width: "100%" }} onSubmit={ (e) => { e.preventDefault(); handleAddItemWithConfirmation(); } }>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Item Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Price" name="price" value={formData.price} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Image URL" name="image" value={formData.image} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="success" fullWidth>
                + Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      <ToastContainer />
    </StyledContainer>
  );
};

export default AddItemPage;
