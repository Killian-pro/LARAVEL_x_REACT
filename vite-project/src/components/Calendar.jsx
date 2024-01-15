import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";

const Calendar = ({ events }) => {
    const eventsTitle = events.map(({ name, ...rest }) => {
        return {
            ...rest,
            title: name,
        };
    });

    const headerToolbar = {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,listYear",
    };

    return (
        <div className="p-8 h-screen">
            <FullCalendar
                plugins={[listPlugin, multiMonthPlugin, dayGridPlugin]}
                initialView="listYear"
                events={eventsTitle}
                height={"100%"}
                headerToolbar={headerToolbar}
                locale={frLocale}
            />
        </div>
    );
};

export default Calendar;
