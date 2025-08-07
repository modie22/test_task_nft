import { Grid, Skeleton } from "@mui/material";
import NFTCard from "./NFTCard";

export default function NFTList({ nfts, loading, onBuy }) {
  return (
    <Grid container spacing={4} justifyContent="center">
      {loading
        ? Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Grid>
          ))
        : nfts.map((nft, index) => (
            <Grid
              item
              key={nft._id}
              xs={12}
              sm={6}
              md={4}
              sx={{
                animation: `fadeIn 0.6s ease ${index * 0.1}s both`,
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(20px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <NFTCard nft={nft} onBuy={onBuy} />
            </Grid>
          ))}
    </Grid>
  );
}
