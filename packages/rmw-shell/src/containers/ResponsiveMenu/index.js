import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Reorder from '@mui/icons-material/Reorder'
import React, { useState } from 'react'
import { Typography } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

const ResponsiveMenu = ({
  scroll,
  sections = [],
  handleMenuClose,
  statemobileMoreAnchorEl,
  transparent,
  contrastColor = 'white',
}) => {
  const classes = useStyles()
  const [isOpen, setOpen] = useState(false)

  const handleOpen = (e) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <div
        className={classes.sectionDesktop}
        style={{ color: transparent ? contrastColor : undefined }}
      >
        {sections.map(({ onClick, name, isDivider = false }, i) => {
          if (isDivider) {
            return (
              <Divider
                key={`divider${i}`}
                orientation="vertical"
                flexItem
                style={{
                  margin: 5,
                  backgroundColor: transparent ? contrastColor : null,
                }}
              />
            )
          }

          return (
            <Button
              key={`button_${name}`}
              style={{ margin: 8 }}
              onClick={onClick}
              aria-label={name}
              color="inherit"
            >
              <Typography variant="h6">{name}</Typography>
            </Button>
          )
        })}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          <MenuIcon
            style={{ color: transparent ? contrastColor : undefined }}
          />
        </IconButton>
      </div>
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <List>
          <ListItem button key={'0'} onClick={handleClose}>
            <ListItemIcon>
              <ChevronRight />
            </ListItemIcon>
          </ListItem>
          <Divider />
          {sections.map(
            ({ name = '', onClick, icon, isDivider = false }, i) => {
              if (isDivider) {
                return <Divider key={`divider_${i}`} />
              }
              return (
                <ListItem
                  button
                  key={name}
                  onClick={() => {
                    handleClose()
                    setTimeout(onClick, 1)
                  }}
                >
                  <ListItemIcon>{icon || <Reorder />}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              )
            }
          )}
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default ResponsiveMenu
