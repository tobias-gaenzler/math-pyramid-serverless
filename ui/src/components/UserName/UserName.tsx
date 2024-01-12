import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from "@mui/material"
import { useUserNameContext } from "../../context/UserNameContextProvider"
import { useRef, useState } from "react"
import { AccountCircle } from "@mui/icons-material"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import "./UserName.css"

const UserName: React.FC = () => {
  const { userName, setUserName } = useUserNameContext()
  const [open, setOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSave = () => {
    if (inputRef.current?.value && inputRef.current?.value !== userName) {
      setUserName(inputRef.current.value)
    }
    setOpen(false)
  }
  const onClose = () => {
    if (inputRef.current) {
      inputRef.current.value = userName
    }
    setOpen(false)
  }

  const editUserName = () => {
    setOpen(true)
  }

  return (<>
    <div>
      <IconButton data-testid="edit" aria-label="Edit" onClick={editUserName} size="large" color="inherit">
        <AccountCircleOutlinedIcon />
        <div className="username">{userName}</div>
      </IconButton>
    </div>

    <Dialog data-testid="userNameDialog" open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">
        {"Change Player Name"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="input-with-icon-textfield"
          label="New Player Name"
          inputRef={inputRef}
          data-testid="userNameInput"
          defaultValue={userName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSave()
              event.preventDefault()
            }
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
