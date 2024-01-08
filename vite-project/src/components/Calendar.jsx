import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";

const Calendar = ({ events }) => {
    const eventsTitle = events.map((item) => {
        return {
            ...item,
            title: item.name,
        };
    });

    const headerToolbar = {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,listWeek",
    };

    const views = {
        listWeek: {
            duration: { weeks: 53 },
        },
    };

    return (
        <div className="p-8 h-screen">
            <FullCalendar
                plugins={[listPlugin, multiMonthPlugin, dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventsTitle}
                height={"100%"}
                headerToolbar={headerToolbar}
                views={views}
                locale={frLocale}
            />
        </div>
    );
};

export default Calendar;
