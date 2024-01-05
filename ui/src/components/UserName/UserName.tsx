import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from "@mui/material"
import { useUserNameContext } from "../../context/UserNameContextProvider";
import { useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle } from "@mui/icons-material";


const UserName: React.FC<{}> = () => {
  const { userName, setUserName } = useUserNameContext();
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSave = () => {
    if (inputRef.current && inputRef.current.value) {
      setUserName(inputRef.current!.value);
    }
    setOpen(false);
  }
  const editUserName = () => {
    setOpen(true);
  }

  return (<>
    <div>
      Player name: <b>{userName}</b>
      <IconButton aria-label="Edit" onClick={editUserName}>
        <EditIcon />
      </IconButton>
    </div>

    <Dialog data-testid="userNameDialog" open={open}>
      <DialogTitle id="alert-dialog-title">
        {"Change Player Name"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="input-with-icon-textfield"
          label="New Player Name"
          inputRef={inputRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={onSave}>Update</Button>
      </DialogActions>
    </Dialog>
  </>
  )
}

export { UserName }
