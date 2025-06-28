'use client';
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch} from "../store/hook";
import { getUservalue } from "../lib/features/todo/GetInputDate";
import { SendUserTime } from "../lib/features/todo/UserTimeLiveSlice";

export default function Time() {
  const timeLived = useAppSelector(state => state.TimeLived);
  const userDate = useAppSelector(state => state.UserDate);
  const dateError = useAppSelector(state => state.checkError);
  const canSend = useAppSelector(state => state.checkDate);
  const dispatch = useAppDispatch();
  const [timeLivedState, setTimeLivedState] = useState({years: 0, months: 0, days: 0});

  useEffect(() => {
    // Reset state when new values arrives
 
    setTimeLivedState({years: 0, months: 0, days: 0});
  }, [timeLived.yearInput, timeLived.monthInput, timeLived.dayInput]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    // Animate years first
    if (timeLivedState.years < timeLived.yearInput) {
      timer = setTimeout(() => {
        setTimeLivedState((prev) => ({
          ...prev,
          years: prev.years + 1
        }));
      }, 30);
    }
    // Animate month after years complets
    else if (timeLivedState.years === timeLived.yearInput && timeLivedState.months < timeLived.monthInput) {
      timer = setTimeout(() => {
        setTimeLivedState((prev) => ({
          ...prev,
          months: prev.months + 1
        }));
      }, 30);
    }
    // Animate days after months complets
    else if (timeLivedState.months === timeLived.monthInput && timeLivedState.days < timeLived.dayInput) {
      timer = setTimeout(() => {
        setTimeLivedState((prev) => ({
          ...prev,
          days: prev.days + 1
        }));
      }, 20);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeLived.yearInput, timeLived.monthInput, timeLived.dayInput, 
      timeLivedState.years, timeLivedState.months, timeLivedState.days]);

  return (
    <div className="w-full h-[60%] sm:h-[40%] rounded-[8vw] sm:rounded-[1vw] rounded-t-none sm:rounded-t-none rounded-br-[30vw] sm:rounded-br-[10vw] flex justify-center flex-col gap-1 items-center">
      <div className="w-[80%] h-15 sm:h-17 flex justify-start flex-row items-center gap-3">
        <p className="text-[#854dff] text-[3em] sm:text-[4.5em] font-black font-poppins italic">
          {timeLivedState.years === 0 ? '--': timeLivedState.years}
        </p>
        <p className="text-[#000] lowercase text-[13vw] sm:text-[4vw] font-poppins font-black italic">
          years
        </p>
      </div>
      <div className="w-[80%] h-15 sm:h-17 flex justify-start flex-row items-center gap-3">
        <p className="text-[#854dff] text-[3em] sm:text-[4.5em] font-black font-poppins italic">
          {timeLivedState.months === 0 ? '--': timeLivedState.months}
        </p>
        <p className="text-[#000] lowercase text-[13vw] sm:text-[4vw] font-poppins font-black italic">
          months
        </p>
      </div>
      <div className="w-[80%] h-15 sm:h-17 flex justify-start flex-row items-center gap-3">
        <p className="text-[#854dff] text-[3em] sm:text-[4.5em] font-black font-poppins italic">
          {timeLivedState.days === 0 ? '--': timeLivedState.days}
        </p>
        <p className="text-[#000] lowercase text-[13vw] sm:text-[4vw] font-poppins font-black italic">
          Days
        </p>
      </div>
    </div>
  );
}