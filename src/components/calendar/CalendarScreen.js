import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendarMessagesES';
import { CalendarEvent } from './CalendarEvent';

import 'react-big-calendar/lib/sass/styles.scss';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const event = [{
  title: 'Entrevista final React',
  start: moment().add().toDate(),
  end: moment().add(2,'hours').toDate(),
  bgcolor: '#6f9ceb',
  notes: 'Celebrar',
  user:{
    _id:'123',
    name:'Frank'
  }
}]

export const CalendarScreen = () => {

  const [lastView, setlastView] = useState(localStorage.getItem('lastview') || 'month');

  const onDoubleClick = ()=>{
    console.log('double')
  }
   const onSelectEvent = ()=>{
    console.log('selected')
  }

  const onViewChange = (e)=> {
    setlastView(e);
    localStorage.setItem('lastview',e);
  }

  const evenStyle = (event,start,end,isSelected)=> {

    const style ={
      backgroundColor: '#FF7C00',
      borderRaidius:'0px',
      opacity: 0.8,
      display: 'block',
      color:'white'
    }
    console.log(event,start,end,isSelected)

    return{
      style
    }


  }

  return (
    <div className="calendar-screen">
    <NavBar/>
    <Calendar
      localizer={localizer}
      events={event}
      startAccessor="start"
      endAccessor="end"
      messages={ messages }
      eventPropGetter={ evenStyle }
      onDoubleClickEvent={ onDoubleClick }
      onSelectEvent ={ onSelectEvent }
      onView={ onViewChange }
      view={ lastView }
      components = {{ event: CalendarEvent }}
    />
    </div>
  )
}
