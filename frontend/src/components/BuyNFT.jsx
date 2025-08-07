import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function BuyNFT({ open, nft, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Підтвердження покупки</DialogTitle>
      <DialogContent>
        {nft && (
          <>
            <Typography>
              <strong>Опис:</strong> {nft.description}
            </Typography>
            <Typography>
              <strong>Ціна:</strong> {nft.price}$
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button onClick={onConfirm} variant="contained" color="success">
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  );
}
