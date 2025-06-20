'use client';

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { turnTrue} from "../lib/features/todo/CheckDateSlice";
import { useEffect } from "react";

export default function Submit() {
    const checkDate: boolean = useAppSelector(state => state.checkDate.value);
    const correctUserDate = useAppSelector(state => state.UserDate )
    const dispatch = useAppDispatch();

    function checkUserDate() {
        dispatch(turnTrue());
    }
    
    useEffect(()=>{
        console.log('debugando do Submut jsx: ', correctUserDate)
    },[checkDate])


    // calcular o tempo de vida com a idade 

    return (
        <div className="relative after:absolute sm:after:relative after:content-[''] after:block after:w-[90%] sm:after:w-[65%] after:h-1 after:bg-[#f0f0f0] after:z-0 rounded-none w-full h-[20%] sm:h-[15%] flex justify-center items-center sm:flex-row-reverse">
            <button 
                onClick={() => checkUserDate()}
                className="cursor-pointer w-[4em] sm:w-[4em] h-[4em] sm:h-[4em] rounded-[20em] bg-[#854dff] flex justify-center items-center z-10"
            >
                <Image src='/icon-arrow.svg' width={0} height={0} alt="arrow" className="w-1/2 h-1/2"/>  
            </button>
        </div>
    );
}