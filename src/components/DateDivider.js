import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import moment from "moment"
import "./style.css"

const DateDivider = ({ timestamp }) => {
  return (
    <Grid container justify="center" direction="row">
      <div className="date-container">
        <div className="date-text">
          {moment.unix(timestamp).utc().format("MMMM DD,YYYY")}
        </div>
      </div>
    </Grid>
  )
}

DateDivider.propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
}

export default DateDivider
