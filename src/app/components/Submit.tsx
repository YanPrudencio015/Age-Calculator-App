'use client';

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { turnTrue} from "../lib/features/todo/CheckDateSlice";
import { useEffect, useState } from "react";
import { getUservalue } from "../lib/features/todo/GetInputDate";
import { SendUserTime } from "../lib/features/todo/UserTimeLiveSlice";

export default function Submit() {
    const correctUserDate = useAppSelector(state => state.UserDate );
    const userTimeLived = useAppSelector(state => state.TimeLived );
    const checkDate = useAppSelector(state => state.checkDate.value);
    const dispatch = useAppDispatch();
    const [timeLived, setTimeLived] = useState({daysLived: 0, monthsLived:0, yearsLived:0});

        function checkUserDate() {
            dispatch(turnTrue());
        }

    // after update the redux, show the currently user date comes from input.tsx 
    useEffect(()=>{
        // create date
        const dateToday = new Date();

        const date = {
            day: dateToday.getDate(),
            month: dateToday.getMonth() +1,
            year: dateToday.getFullYear(),
        }

        // to calc the time
        if(correctUserDate.dayInput !== 0 && correctUserDate.monthInput !== 0 && correctUserDate.yearInput !== 0){
            let dayCalc  = date.day - correctUserDate.dayInput;
            let monthCalc = date.month - correctUserDate.monthInput;
            let yearCalc = date.year - correctUserDate.yearInput;
            
            // puttin in useState
            
            if(dayCalc < 0){
                monthCalc--;
                const lastDaOgfLastMonth = new Date(date.year, date.month -1, 0).getDate();
                dayCalc += lastDaOgfLastMonth;
            }
        if(monthCalc < 0){
            yearCalc--;
            monthCalc += 12;
        }
        
        setTimeLived({daysLived: dayCalc, monthsLived:monthCalc, yearsLived:yearCalc})
    }
    },[correctUserDate])
    // transfer the time lived's result to the Time jsx through of the Redux
    
    useEffect(()=>{
            dispatch(SendUserTime({
                dayInput:timeLived.daysLived,
                monthInput: timeLived.monthsLived,
                yearInput: timeLived.yearsLived
            }))
    },[timeLived])
    
    // after update the redux, show the currently user date comes from input.tsx 




    return (
        <div className="
                        relative after:absolute sm:after:relative after:content-[''] 
                        after:block after:w-[80%] sm:after:w-[80%] after:h-[2px] 
                        after:bg-[#f0f0f0] after:z-0 rounded-none w-full h-[20%] 
                        sm:h-[15%] flex justify-center items-center sm:flex-row-reverse">
            <button 
                onClick={() => checkUserDate()}
                className="
                            cursor-pointer 
                            w-[4em] sm:w-[4em] h-[4em] sm:h-[4em] 
                            rounded-[20em] bg-[#854dff] 
                            flex justify-center 
                            items-center z-10"
            >
                <Image src='/icon-arrow.svg' width={0} height={0} alt="arrow" className="w-1/2 h-1/2"/>  
            </button>
        </div>
    );
}