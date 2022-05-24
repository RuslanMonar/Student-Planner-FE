import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    Appointments,
    ViewSwitcher,
    Toolbar,
    DateNavigator,
    TodayButton,
    MonthView
} from '@devexpress/dx-react-scheduler-material-ui';
import { Header } from '../Navigation/Header';
import moment from 'moment';
import { useState, useEffect } from 'react';
import ProjectGateway from '../../Gateway/ProjectGateway';



export const Calendar = () => {
    const [tasks, setTaks] = useState([]);

    const allappointments = [
        {
            title: 'Website Re-Design Plan',
            startDate: new Date(2022, 5, 15, 9, 35),
            endDate: new Date(2022, 5, 15, 11, 30),
            id: 0,
            location: 'Room 1',
        }
    ];

    useEffect(() => {

        ProjectGateway.GetAllTasks().then(response => {
            setTaks(response.data);
        })

    }, []);

    const currentDate = moment();
    let curdate = currentDate.date();

    const makeTodayAppointment = (startDate, endDate) => {
        const days = moment(startDate).diff(endDate, 'days');

        const nextStartDate = moment(startDate)
            .year(currentDate.year())
            .month(currentDate.month())
            .date(curdate);
        const nextEndDate = moment(endDate)
            .year(currentDate.year())
            .month(currentDate.month())
            .date(curdate + days);

        return {
            startDate: nextStartDate.toDate(),
            endDate: nextEndDate.toDate(),
        };
    };

    var appointments = tasks?.map(({ date, tomatoCount, tomatoLength, ...restArgs }) => {
        var startDate = moment(date).format('YYYY-MM-DD h:mm:ss a')
        var endDate = moment(date).add(tomatoCount * tomatoLength, 'minutes').format('YYYY-MM-DD h:mm:ss a')

        const result = {

            ...{
                startDate,
                endDate,
                id: restArgs.id,
                title: restArgs.title
            },
        };
        curdate += 1;
        if (curdate > 31) curdate = 1;
        return result;
    });

    const formatTimeScaleDate = date => moment(date).format('HH:mm');

    const PREFIX = 'Demo';

    const classes = {
        todayCell: `${PREFIX}-todayCell`,
        weekendCell: `${PREFIX}-weekendCell`,
        today: `${PREFIX}-today`,
        weekend: `${PREFIX}-weekend`,
    };

    const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
        [`&.${classes.todayCell}`]: {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.14),
            },
            '&:focus': {
                backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
        },
        [`&.${classes.weekendCell}`]: {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
            '&:hover': {
                backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
            },
            '&:focus': {
                backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
            },
        },
    }));

    const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
        [`&.${classes.today}`]: {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
        [`&.${classes.weekend}`]: {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
        },
    }));

    const TimeTableCell = (props) => {
        const { startDate } = props;
        const date = new Date(startDate);

        if (date.getDate() === new Date().getDate()) {
            return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
        } if (date.getDay() === 0 || date.getDay() === 6) {
            return <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />;
        } return <StyledWeekViewTimeTableCell {...props} />;
    };

    const TimeScaleLabel = (
        { formatDate, ...restProps },
    ) => <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />;

    const DayScaleCell = (props) => {
        const { startDate, today } = props;

        if (today) {
            return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
        } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
            return <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />;
        } return <StyledWeekViewDayScaleCell {...props} />;
    };



    return (
        <div>
            <Header></Header>

            <Paper>
                <Scheduler
                    data={appointments}
                    height={"100%"}
                >
                    <ViewState />
                    <WeekView
                        startDayHour={1}
                        endDayHour={24}
                        timeScaleLabelComponent={TimeScaleLabel}
                        timeTableCellComponent={TimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <DayView
                        startDayHour={1}
                        endDayHour={24}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <Appointments />
                </Scheduler>
            </Paper>

        </div>
    );
}