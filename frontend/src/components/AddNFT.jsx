import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Input,
} from "@mui/material";

export default function AddNFT({
  open,
  newNFT,
  onClose,
  onChange,
  onFileChange,
  onAdd,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Додати новий NFT</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Опис"
          value={newNFT.description}
          onChange={(e) => onChange({ ...newNFT, description: e.target.value })}
        />
        <TextField
          label="Ціна"
          type="number"
          value={newNFT.price}
          onChange={(e) => onChange({ ...newNFT, price: e.target.value })}
        />
        <Input type="file" onChange={onFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button onClick={onAdd} variant="contained" color="primary">
          Додати
        </Button>
      </DialogActions>
    </Dialog>
  );
}
