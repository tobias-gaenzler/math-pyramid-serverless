import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent } from "@mui/material"

type Props = {
  onClose: () => void
  solvedBy: string
  userName: string
}
const GameSolvedDialog: React.FC<Props> = ({ onClose, solvedBy, userName }: Props) => {
  const solvedByCurrentPlayer = (userName === solvedBy)
  const title = (solvedByCurrentPlayer ? "YOU" : solvedBy) + " solved the pyramid!"
  const severity = solvedByCurrentPlayer ? "success" : "error"

  return (
    <Dialog data-testid="gameSolvedDialog" open={solvedBy !== ""}>
      <DialogContent>
        <Alert variant="filled" severity={severity}>
          <AlertTitle>{title}</AlertTitle>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export { GameSolvedDialog }
