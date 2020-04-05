import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Typography, TextField, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { toggleFilterChange } from '../../../redux/action/filter'
import SwitchFilter from '../switch-filter/SwitchFilter'

export default function ToggleFilter() {
  const dispatch = useDispatch()
  const [online, setOnline] = useState(false)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    if (!online && !offline) {
      dispatch(toggleFilterChange(null))
    } else {
      dispatch(toggleFilterChange(online && !offline))
    }
  }, [online, offline, dispatch])

  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography color="primary" variant="overline">
          TOGGLE FILTER
        </Typography>
      </Grid>
      <Grid container item sm={12} spacing={2}>
        <Grid item sm={6}>
          <SwitchFilter
            label="Online"
            checked={online}
            onChange={() => {
              setOnline(!online)
              setOffline(false)
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <SwitchFilter
            label="Offline"
            checked={offline}
            onChange={() => {
              setOnline(false)
              setOffline(!offline)
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}