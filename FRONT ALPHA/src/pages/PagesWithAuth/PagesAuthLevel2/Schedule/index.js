import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const Schedule = (props) => {

    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }
    const renderEventContent = (eventInfo) => (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
    return(
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            weekends={false}
            eventContent={renderEventContent}
            events={[
                { title: 'event 1', date: '2020-07-01' },
                { title: 'event 2', date: '2020-07-01' }
            ]}
        />
    )
}


export default Schedule;