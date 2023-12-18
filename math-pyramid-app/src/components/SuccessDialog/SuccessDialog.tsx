import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent } from "@mui/material"

type Props = {
  open: boolean
  onClose: () => void
}
const SuccessDialog: React.FC<Props> = ({ open, onClose }: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Alert variant="filled" severity="success">
          <AlertTitle>Solved!</AlertTitle>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export { SuccessDialog }
