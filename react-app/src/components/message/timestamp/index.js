import React from 'react'
import './timestamp.css'
import { format, isToday, isYesterday } from 'date-fns'

function TimeStamp({children, label}) {
  return (
    <div className='time_stamp--wrapper'>
        <div className='time_stamp--node'>
            { isToday(new Date(label)) ?
              'Today' :
              isYesterday(new Date(label)) ?
              'Yesterday' :
              format(new Date(label), 'eeee')}, {format(new Date(label), 'LLLL')} {format(new Date(label), 'do')
            }
        </div>
        {children}
    </div>
  )
}

export default TimeStamp
