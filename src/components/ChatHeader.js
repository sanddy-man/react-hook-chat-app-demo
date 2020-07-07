import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import green from "@material-ui/core/colors/green"
import "./style.css"

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  },
  extendedIcon: {
    fontSize: 30,
  },
  userIcon: {
    fontSize: 40,
  },
  statusIcon: {
    fontSize: 16,
    color: green[500],
    marginLeft: 10,
  },
}))

const ChatHeader = ({ name, isTyping, onClose }) => {
  const classes = useStyles()

  return (
    <div className="header-container">
      <IconButton aria-label="back" size="small" onClick={onClose}>
        <ChevronLeftIcon className={classes.extendedIcon} color="primary" />
      </IconButton>
      <IconButton aria-label="user" size="small" className={classes.margin}>
        <AccountCircleIcon className={classes.userIcon} color="primary" />
      </IconButton>
      <div>
        <div className="row-container">
          <h5 className="user-name">{name}</h5>
          <FiberManualRecordIcon className={classes.statusIcon} />
        </div>
        <p className="action-description">
          {isTyping ? "User is typing..." : ""}
        </p>
      </div>
    </div>
  )
}

ChatHeader.propTypes = {
  name: PropTypes.string.isRequired,
  isTyping: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ChatHeader
