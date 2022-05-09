import React, { useEffect, useState } from 'react';
import {customStyles} from '../../helpers/modalStyles';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const now = moment().minutes(0).seconds(0).add(1,'hours');

const late = now.clone().add(1,'hours');

const initEvent = {
        title:'',
        notes:'',
        start:now.toDate(),
        end:late.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);
    const [dateStart, setdateStart] = useState(now.toDate());
    const [dateEnd, setdateEnd] = useState(late.toDate())
    const [titleValid, settitleValid] = useState(true)
    const [formValues, setformValues] = useState(initEvent);
    const {notes, title, start, end} = formValues;

    useEffect(() => {
        
        if (activeEvent) {
            setformValues(activeEvent);
        }else{
            setformValues(initEvent);
        }

    }, [activeEvent,setformValues])
     
    

    const handleInputChange = ({target})=>{
        
        setformValues({
            ...formValues,
            [target.name]: target.value
        })

    }

     const handleSumit =(e)=>{
         e.preventDefault();
         const momentStart = moment(start);
         const momentEnd = moment(end);

       if (momentStart.isSameOrAfter(momentEnd)) {
         return Swal.fire('Error','End date must be higher than start date');
       }

       if (title.trim().length < 2) {
          return settitleValid(false);           
       }
       
       if ( activeEvent ) {
           dispatch(eventUpdated( formValues ));
       }else{
           settitleValid(true)
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user:{
                    _id:'123',
                    name:'Frank'
                }
            
            }))
       }

        //TODO: Realizar grabacion base de datos
       closeModal();
     }

    const startDateChanged = (e)=> {
    setdateStart(e);
    setformValues({
        ...formValues,
        start: e
    })
    }

    const endDateChanged = (e)=> {
          setdateEnd(e);
        setformValues({
        ...formValues,
        end: e
    })
    }

    Modal.setAppElement('#root');

    const closeModal = ()=>{
      dispatch(uiCloseModal());
      dispatch(eventClearActiveEvent());
      setformValues(initEvent);
    }


  return (
    <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
     <h1>
        { (activeEvent) ?  'Edit Event' : 'New Event'  }
     </h1> 
         <hr/>
    <form 
    className="container"
    onSubmit={ handleSumit }
    >

        <div className="form-group">
            <label>Fecha y hora inicio</label>
                  <DateTimePicker 
                  onChange={startDateChanged}  
                  className="form-control" 
                  value={ dateStart } />
        </div>

        <div className="form-group">
            <label>Fecha y hora fin</label>
                <DateTimePicker 
                onChange={ endDateChanged } 
                className="form-control"
                minDate={ dateStart }
                value={ dateEnd }/>
        </div>

        <hr />
        <div className="form-group">
            <label>Titulo y notas</label>
            <input 
                type="text" 
                className= {`form-control ${!titleValid && 'is-invalid' }`}
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
                value={ title }
                onChange ={ handleInputChange }
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
            <textarea 
                type="text" 
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"
                value={ notes }
                onChange ={ handleInputChange }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>

    </form>
      </Modal>
  )
}
