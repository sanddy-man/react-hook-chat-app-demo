import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import green from "@material-ui/core/colors/green"
import "./style.css"

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  },
  statusIcon: {
    fontSize: 16,
    color: green[500],
    marginRight: 10,
  },
}))

const TopBanner = ({ name, unreadCounts }) => {
  const classes = useStyles()

  return (
    <div className="banner-container">
      <FiberManualRecordIcon className={classes.statusIcon} />
      <h5 className="user-name">{`${name} (${unreadCounts} new messages)`}</h5>
    </div>
  )
}

TopBanner.propTypes = {
  name: PropTypes.string.isRequired,
  unreadCounts: PropTypes.number.isRequired,
}

export default TopBanner
