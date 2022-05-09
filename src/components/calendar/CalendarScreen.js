import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendarMessagesES';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/sass/styles.scss';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, setActive } from '../../actions/events';
import { AddEventFab } from '../ui/AddEventFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

  const dispatch  = useDispatch();
  const {events,activeEvent} = useSelector(state => state.calendar);


  const [lastView, setlastView] = useState(localStorage.getItem('lastview') || 'month');

  const onDoubleClick = (e)=>{
   dispatch(uiOpenModal());
  }
  
  const onSelectEvent = (e)=>{
   dispatch(setActive(e));
  }

  const onSelectedSlot = (e) => {
    //TODO: Crear Evento a partir de click en calendario
  
    dispatch(eventClearActiveEvent());
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
   
    return{
      style
    }

  }

  return (
    <div className="calendar-screen">
    <NavBar/>
    <Calendar
      localizer={ localizer }
      events={ events }
      startAccessor="start"
      endAccessor="end"
      messages={ messages }
      eventPropGetter={ evenStyle }
      onDoubleClickEvent={ onDoubleClick }
      onSelectEvent ={ onSelectEvent }
      onView={ onViewChange }
      view={ lastView }
      onSelectSlot = { onSelectedSlot }
      selectable = { true }
      components = {{ event: CalendarEvent }}
    />

    <AddEventFab/>
    {
      (activeEvent)  && <DeleteEventFab/>
      
    }
    <CalendarModal/>
    </div>
  )
}
