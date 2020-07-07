import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import DoneIcon from "@material-ui/icons/Done"
import green from "@material-ui/core/colors/green"
import moment from "moment"
import VisibilitySensor from "react-visibility-sensor"
import "./style.css"

const Bubble = ({ message, markAsRead, index }) => {
  const bubbleRef = React.useRef(null)
  const incoming = message.direction === "in"

  const onChangeVisibility = (visible) => {
    if (message.direction === "in" && message.status !== "read" && visible) {
      markAsRead(index)
    }
  }

  const renderIcon = (status) => {
    switch (status) {
      case "read":
        return (
          <DoneAllIcon
            style={{ fontSize: 10, marginLeft: 4, color: green[500] }}
          />
        )

      case "received":
        return <DoneAllIcon style={{ fontSize: 10, marginLeft: 4 }} />

      case "sent":
        return <DoneIcon style={{ fontSize: 10, marginLeft: 4 }} />

      default:
        return null
    }
  }

  return (
    <Grid
      container
      justify={incoming ? "flex-start" : "flex-end"}
      direction="row"
    >
      <VisibilitySensor onChange={onChangeVisibility}>
        <div className="bubble-container" ref={bubbleRef}>
          <div className="message-text">{message.text}</div>
          <div className="time-text">
            {moment.unix(message.timestamp).format("hh:mm")}
            {!incoming && renderIcon(message.status)}
          </div>
        </div>
      </VisibilitySensor>
    </Grid>
  )
}

Bubble.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  markAsRead: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

export default Bubble
