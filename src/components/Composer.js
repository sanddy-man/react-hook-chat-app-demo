import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import SendIcon from "@material-ui/icons/Send"
import InputAdornment from "@material-ui/core/InputAdornment"
import "./style.css"

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(1),
  },
}))

const Composer = ({ onSend }) => {
  const classes = useStyles()
  const [text, setText] = React.useState("")

  const sendMsg = () => {
    onSend(text)
    setText("")
  }

  return (
    <div className="footer-container">
      <TextField
        multiline
        rowsMax={3}
        placeholder="Send a message..."
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disabled={!text}
                aria-label="send"
                size="medium"
                onClick={sendMsg}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        className={classes.padding}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

Composer.propTypes = {
  onSend: PropTypes.func.isRequired,
}

export default Composer
