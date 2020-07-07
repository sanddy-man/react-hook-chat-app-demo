import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Button from "@material-ui/core/Button"
import ChatHeader from "./components/ChatHeader"
import Composer from "./components/Composer"
import ChatContent from "./components/ChatContent"
import "./App.css"
import data from "./chat.json"
import TopBanner from "./components/TopBanner"

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

function App() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState(data)
  const listRef = React.useRef(null)
  const readIndexArr = React.useRef([])
  let timeout = null

  React.useEffect(() => {
    setMessages(data)
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getUnreadCounts = () => {
    return messages.reduce((acc, curVal) => {
      const isUnread = curVal.direction === "in" && curVal.status !== "read"
      return acc + (isUnread ? 1 : 0)
    }, 0)
  }

  const sendMessage = (text) => {
    setMessages([
      ...messages,
      {
        text,
        id: messages.length + 1,
        direction: "out",
        status: "sent",
        timestamp: Math.round(new Date().getTime() / 1000),
      },
    ])
    setTimeout(() => {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }, 200)
  }

  const markAsRead = (index) => {
    readIndexArr.current.push(index)
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      const newArr = [...messages]
      readIndexArr.current.forEach((ind) => {
        newArr[ind].status = "read"
      })
      setMessages(newArr)
      readIndexArr.current = []
      clearTimeout(timeout)
    }, 500)
  }

  return (
    <div className="App App-header">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Message Room
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="Dialog-container">
            <TopBanner name="user101" unreadCounts={getUnreadCounts()} />
            <ChatHeader name="user113" isTyping onClose={handleClose} />
            <ChatContent
              data={messages}
              listRef={listRef}
              markAsRead={markAsRead}
            />
            <Composer onSend={sendMessage} />
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default App
