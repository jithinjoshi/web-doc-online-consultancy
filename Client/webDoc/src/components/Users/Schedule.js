
import React, { useState } from 'react'


const Schedule = () => {
    const [date,setDate] = useState();
    

    const onSelectedDay = (d) => {
        console.log(d)
        setDate(d);
    }

    return (
        <div className="flex justify-center">
            {/* <ReactHorizontalDatePicker
                selectedDay={onSelectedDay}
                enableScroll={true}
                enableDays={10}
            /> */}
        </div>

    )
}

export default Schedule