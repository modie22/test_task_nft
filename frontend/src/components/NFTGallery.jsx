import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import NFTList from "../components/NFTList";
import BuyNFTDialog from "./BuyNFT";
import AddNFTDialog from "./AddNFT";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
  },
});

export default function NFTGalleryPage() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [buyOpen, setBuyOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newNFT, setNewNFT] = useState({
    description: "",
    price: "",
    image: null,
  });

  const NEXT_PUBLIC_API_URL = "http://localhost:5000";

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${NEXT_PUBLIC_API_URL}/api/nfts`)
        .then((res) => {
          setNfts(res.data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching NFTs:", err));
    }, 1000);
  }, []);

  const handleBuyClick = (nft) => {
    setSelectedNFT(nft);
    setBuyOpen(true);
  };

  const deleteNft = async (nftId) => {
    try {
      const response = await axios.delete(
        `${NEXT_PUBLIC_API_URL}/api/nfts/${nftId}`
      );
      console.log("NFT deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting NFT:", error);
      throw error;
    }
  };

  const handleConfirmPurchase = () => {
    alert(`Ви купили: NFT за ${selectedNFT.price}$`);
    setBuyOpen(false);
    setSelectedNFT(null);
    deleteNft(selectedNFT._id);
    const newItems = nfts.filter(item => item._id !== selectedNFT._id);
    setNfts(newItems);
  };

  const handleAddNFT = async () => {
    const formData = new FormData();
    formData.append("description", newNFT.description);
    formData.append("price", newNFT.price);
    formData.append("image", newNFT.image);

    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/nfts`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setNfts([...nfts, res.data]);
      setAddOpen(false);
      setNewNFT({ description: "", price: "", image: null });
    } catch (err) {
      console.error("Error adding NFT:", err);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          NFT Галерея
        </Typography>

        <Box textAlign="center" mb={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setAddOpen(true)}
          >
            Додати новий NFT
          </Button>
        </Box>

        <NFTList nfts={nfts} loading={loading} onBuy={handleBuyClick} />

        <BuyNFTDialog
          open={buyOpen}
          nft={selectedNFT}
          onClose={() => setBuyOpen(false)}
          onConfirm={handleConfirmPurchase}
        />

        <AddNFTDialog
          open={addOpen}
          newNFT={newNFT}
          onClose={() => setAddOpen(false)}
          onChange={setNewNFT}
          onFileChange={(e) =>
            setNewNFT({ ...newNFT, image: e.target.files[0] })
          }
          onAdd={handleAddNFT}
        />
      </Container>
    </ThemeProvider>
  );
}
