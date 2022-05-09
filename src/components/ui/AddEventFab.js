import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddEventFab = () => {

  const dispatch = useDispatch();

  const handleNewEvent = ()=> {

    dispatch(eventClearActiveEvent());
    dispatch(uiOpenModal());

  }

  return (
    <button 
    className="btn btn-primary fab" 
    onClick= { handleNewEvent }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
