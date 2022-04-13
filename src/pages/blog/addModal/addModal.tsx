import React, { useState, VFC } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

import s from './addModal.module.css'
import { Container, TextareaAutosize, TextField } from '@mui/material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const AddModal: VFC<Props> = ({ isOpen, handleClose, handleSaveAddModal }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleCancel = () => {
    emptify();
    handleClose();
  }

  const handleSave = () => {
    if(title && text){
      handleSaveAddModal(title, text)
      emptify();
      handleClose();
    }
  }

  const emptify = () => {
    setText('');
    setTitle('');
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleCancel}
        TransitionComponent={Transition}
        className={s.dialog}
      >
        <AppBar sx={{ position: 'relative' }} color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCancel}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add new article
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={s.body}>
          <Container>
            <TextField
              label="Title"
              variant="standard"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
              placeholder="Start writing the article..."
              className={s.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Container>
        </div>
      </Dialog>
    </div>
  )
}

type Props = {
  isOpen: boolean
  handleSaveAddModal: (title: string, content: string) => void
  handleClose: () => void
}
