/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
// import AutoSizer from "react-virtualized-auto-sizer"
import moment from "moment"
import Bubble from "./Bubble"
import DateDivider from "./DateDivider"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    padding: 0,
  },
}))

export default function ChatContent({ data, listRef, markAsRead }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List className={classes.root} innerRef={listRef}>
        {data.map((message, index) => {
          const nextMsg = data[index + 1]
          let dayDiff = 0
          if (nextMsg) {
            dayDiff =
              moment.unix(nextMsg.timestamp).utc().day() -
              moment.unix(message.timestamp).utc().day()
          }
          if (dayDiff !== 0) {
            return (
              <div key={message.id}>
                <Bubble
                  message={message}
                  markAsRead={markAsRead}
                  index={index}
                />
                <DateDivider timestamp={nextMsg.timestamp} />
              </div>
            )
          }
          return (
            <Bubble
              key={message.id}
              message={message}
              markAsRead={markAsRead}
              index={index}
            />
          )
        })}
      </List>
    </div>
  )
}

ChatContent.propTypes = {
  data: PropTypes.array.isRequired,
  listRef: PropTypes.any.isRequired,
  markAsRead: PropTypes.func.isRequired,
}
