import React, { useState, useContext } from 'react';

const PeriodContext = React.createContext();

export function usePeriod(){
    return useContext(PeriodContext);
}

export function PeriodProvider({ children }){

    const [ schedule, setSchedule ] = useState({});

    function addActivity(day, obj){
        var sch = schedule;
        let i = 0;
        if(sch[day]){
            i = sch[day].length;
            sch[day][i] = obj;
        } else {
            sch[day] = [];
            sch[day][i] = obj;
        }
        setSchedule(sch);
    }

    function emptySchedule(){
        setSchedule({});
    }

    function deleteActivity(day, idx){
        var sch = schedule;
        checkIfThereIsUndefined(sch, day, idx);
        setSchedule(sch);
    }

    function checkIfThereIsUndefined(obj, day, idx) {
        delete obj[day][idx];
        var newArr = obj[day].filter((value) =>
          value !== undefined ? value : null
        );
        if (newArr.length === 0) {
          delete obj[day];
        } else obj[day] = newArr;
    }

    const value = {
        schedule,
        addActivity,
        deleteActivity,
        emptySchedule
    };

    return (
        <PeriodContext.Provider value={value}>
            { children }
        </PeriodContext.Provider>
    )
}

    /*
    {
        "YYYY-MM-DD" : [
            {
                name: timerange,
                content: description,
                day: "YYYY-MM-DD"
            },
            {
                name: timerange,
                content: description,
                day: "YYYY-MM-DD"
            }
        ],
        "YYYY-MM-DD" : [
            {
                name: timerange,
                content: description,
                day: "YYYY-MM-DD"
            }
        ]
    }
    */