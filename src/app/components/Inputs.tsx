"use client"
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { returnFalse } from "../lib/features/todo/CheckDateSlice";

export default function Inputs() {
    const checkDate = useAppSelector(state => state.checkDate.value);
    const dispatch = useAppDispatch();
    // Create labels by map 
    type fieldTime = 'Day'|'Month'|'Year';
    const buttons: {title:fieldTime, placeholder:string}[] = [
        {title: 'Day',placeholder:'DD'},
        {title: 'Month',placeholder:'MM'},
        {title: 'Year',placeholder:"YYYY"},]
     
    // Update after covert string from input through the function checkInput
    const [inputUserValue, setInputUserValue] = useState({
        Day:'',
        Month:'',
        Year:''
    })

    // check if the value in the input is number, if isn't, return
    function checkInput(field:'Day'|'Month'|'Year', inputValue:string){
        if(!/^\d*$/.test(inputValue)){
            return
        }
        setInputUserValue((prev)=>({
            ...prev, 
            [field]: inputValue
        }))
    }

    const inputsdigits = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    
    const fieldRefs = [
        {   label: useRef<HTMLLabelElement>(null),
            span: useRef<HTMLSpanElement>(null), 
            textError: useRef<HTMLParagraphElement>(null),
        },
        {   label: useRef<HTMLLabelElement>(null),
            span: useRef<HTMLSpanElement>(null), 
            textError: useRef<HTMLParagraphElement>(null),
        },
        {   label: useRef<HTMLLabelElement>(null),
            span: useRef<HTMLSpanElement>(null), 
            textError: useRef<HTMLParagraphElement>(null),
        },
    ];

    // When the site loads, the first input will be focused to digite a number. 
    useEffect(() => {
        inputsdigits[0].current?.focus();
    }, []);

    // Use Enter to jump to next input or use Backspace to return one
    function keyDownButton(event:React.KeyboardEvent<HTMLInputElement>, index:number){
        const isEmpty = inputUserValue[buttons[index].title] === '';
        if(event.key === "Enter"){
            if(index < inputsdigits.length - 1){
                inputsdigits[index + 1].current?.focus();
            }
        } else if(event.key === "Backspace" && isEmpty) {
            if(index > 0) {
                inputsdigits[index - 1].current?.focus();
            }
        }
    }

    // function to check how many digits has in each input. DD/MM 2 digits, YYYY 4 digits    
    function inputDigits(index:number, value:string){
        // Check the expected length based on the field type (4 digits for year, 2 for others)
        const expectedLength = index === 2 ? 4 : 2;

        // If value matches expected length and there's a next input, focus on it
        if (value.length === expectedLength && index < inputsdigits.length - 1) {
            inputsdigits[index + 1].current?.focus();
        }

        if (value.length > 4) {
            const fieldKey = buttons[index].title;
            setInputUserValue(prev => ({
                ...prev,
                [fieldKey]: ''
            }));
        }
    }

    // check possible errors before calc the user time lived
    // types of errors:
    type DateValueErrors = [
        {empty: string, invalidDeted: string},
        {empty: string, invalidDeted: string},
        {empty: string, invalidDeted: string},
        {invalidDeted: string},
    ];
    
    const inputsValuesErrors:DateValueErrors = [
        {empty:'This field is required', invalidDeted:'must be a valid day' },
        {empty:'This field is required', invalidDeted:'must be a valid month'},
        {empty:'This field is required', invalidDeted:'must be a valid year'},
        {invalidDeted:'must be a valid Date'},
    ];

    // to change inputs values(User date) from string to numbers
    type userDateNumber = [
        {value: number},
        {value: number},
        {value: number},
    ] 

    const userDate: userDateNumber = [
        {value: Number(inputUserValue.Day)},
        {value: Number(inputUserValue.Month)},
        {value: Number(inputUserValue.Year)},
    ];

    useEffect(() => {
        if (checkDate) {
            // check number value invalid at each field
            const DayFieldvalue = Number(userDate[0].value);
            const inputDayRef = inputsdigits[0].current;
            const spanDayRef = fieldRefs[0].span.current;
            const isDayInvalid = DayFieldvalue > 31 || DayFieldvalue < 0;
            const textDayRef = fieldRefs[0].textError.current;

            if (textDayRef) {
                textDayRef.innerHTML = isDayInvalid
                ? inputsValuesErrors[0].invalidDeted : '';
            }
            if (inputDayRef) {
                inputDayRef.style.border = isDayInvalid 
                ? 'solid 1px #ff5757' 
                : 'solid 1px #716f6f';
            }
            if (spanDayRef) {
                spanDayRef.style.color = isDayInvalid 
                ? '#ff5757' 
                : '#716f6f';
            }

            // if value month is biggest than 12 and smallest than 0 
            const MonthFieldvalue = Number(userDate[1].value);
            const inputMonthRef = inputsdigits[1].current;
            const spanMonthRef = fieldRefs[1].span.current;
            const isMonthInvalid = MonthFieldvalue > 12 || MonthFieldvalue < 0;
            const textMonthRef = fieldRefs[1].textError.current;

            if(textMonthRef) {
                textMonthRef.innerHTML = isMonthInvalid ? 
                inputsValuesErrors[1].invalidDeted : '';
            }

            if (inputMonthRef) {
                inputMonthRef.style.border = isMonthInvalid 
                ? 'solid 1px #ff5757' 
                : 'solid 1px #716f6f';
            }
          
            if (spanMonthRef) {
                spanMonthRef.style.color = isMonthInvalid 
                ? '#ff5757' 
                : '#716f6f';
            }
            
            const yearFieldvalue = Number(userDate[2].value);
            const inputYearRef = inputsdigits[2].current;
            const spanYearRef = fieldRefs[2].span.current;
            const isYearInvalid = yearFieldvalue > new Date().getFullYear() || yearFieldvalue < 0;
            const textYearRef = fieldRefs[2].textError.current;

            if(textYearRef) {
                textYearRef.innerHTML = isYearInvalid ? 
                inputsValuesErrors[2].invalidDeted : '';
            }
            if (inputYearRef) {
                inputYearRef.style.border = isYearInvalid 
                ? 'solid 1px #ff5757' 
                : 'solid 1px #716f6f';
            }  
            if (spanYearRef) {
                spanYearRef.style.color = isYearInvalid 
                ? '#ff5757' 
                : '#716f6f';
            }

            // check if the inputs are empty
            const isDayInputEmpty = inputUserValue.Day === '';
            if (textDayRef) {
                textDayRef.innerHTML = isDayInputEmpty
                ? inputsValuesErrors[0].empty : isDayInvalid ? inputsValuesErrors[0].invalidDeted : '';
            }
            if (inputDayRef) {
                inputDayRef.style.border = isDayInputEmpty 
                ? 'solid 1px #ff5757' 
                : isDayInvalid ? 'solid 1px #ff5757' : 'solid 1px #716f6f';
            }
            if (spanDayRef) {
                spanDayRef.style.color = isDayInputEmpty 
                ? '#ff5757' 
                : isDayInvalid ? '#ff5757' : '#716f6f';
            }
            
            const isMonthInputEmpty = inputUserValue.Month === '';
            if (textMonthRef) {
                textMonthRef.innerHTML = isMonthInputEmpty
                ? inputsValuesErrors[1].empty : isMonthInvalid ? inputsValuesErrors[1].invalidDeted : '';
            }
            if (inputMonthRef) {
                inputMonthRef.style.border = isMonthInputEmpty 
                ? 'solid 1px #ff5757' 
                : isMonthInvalid ? 'solid 1px #ff5757' : 'solid 1px #716f6f';
            }
            if (spanMonthRef) {
                spanMonthRef.style.color = isMonthInputEmpty 
                ? '#ff5757' 
                : isMonthInvalid ? '#ff5757' : '#716f6f';
            }
            
            const isYearInputEmpty = inputUserValue.Year === '';
            if (textYearRef) {
                textYearRef.innerHTML = isYearInputEmpty
                ? inputsValuesErrors[2].empty : isYearInvalid ? inputsValuesErrors[2].invalidDeted : '';
            }
            if (inputYearRef) {
                inputYearRef.style.border = isYearInputEmpty 
                ? 'solid 1px #ff5757' 
                : isYearInvalid ? 'solid 1px #ff5757' : 'solid 1px #716f6f';
            }
            if (spanYearRef) {
                spanYearRef.style.color = isYearInputEmpty 
                ? '#ff5757' 
                : isYearInvalid ? '#ff5757' : '#716f6f';
            }
            
            dispatch(returnFalse());
        }
    }, [checkDate, dispatch, fieldRefs, inputsValuesErrors, inputsdigits, inputUserValue.Day, inputUserValue.Month, inputUserValue.Year, userDate]);

    return (
        <div className="rounded-t-[8vw] sm:rounded-t-[1vw] w-full h-[25%] flex items-center sm:items-end justify-center sm:justify-start gap-4 px-6 sm:px-2">
            {buttons.map((value, index) => (
                <label 
                    ref={fieldRefs[index].label}  
                    key={index} 
                    className="relative w-[30%] sm:w-[20%] h-[50%] sm:h-[70%] flex flex-col items-start">
                    <span 
                        ref={fieldRefs[index].span} 
                        className="text-[#716f6f] text-[12px] font-black font-poppins-sans-serif uppercase tracking-[2px]">
                        {value.title}
                    </span>
                    <input 
                        ref={inputsdigits[index]}
                        value={inputUserValue[value.title]} 
                        placeholder={value.placeholder}
                        onChange={(e) => {
                            checkInput(value.title, e.target.value); 
                            inputDigits(index, e.target.value);
                        }} 
                        onKeyDown={(e) => keyDownButton(e, index)}
                        className="text-black focus:border-[#854dff] caret-[#854dff] pl-2 sm:pl-0 sm:text-center font-black text-[25px] font-poppins-sans-serif w-[100%] border-1 border-[#716f6f] rounded-md h-[70%] outline-0" 
                        type="text"
                    />
                    <p 
                        ref={fieldRefs[index].textError}
                        className="absolute bottom-[0vh] text-[#ff5757] text-[15px] sm:text-[0.8vw]">
                    </p>
                </label>
            ))}
        </div>
    );
}