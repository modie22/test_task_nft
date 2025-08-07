import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

export default function NFTCard({ nft, onBuy }) {
  const NEXT_PUBLIC_API_URL = "http://localhost:5000";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        sx={{ objectFit: "cover" }}
        image={`${NEXT_PUBLIC_API_URL}${nft.imageUrl}`}
        alt={nft.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography color="text.secondary">{nft.description}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Ціна: {nft.price}$
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onBuy(nft)}
        >
          Купити
        </Button>
      </CardContent>
    </Card>
  );
}
