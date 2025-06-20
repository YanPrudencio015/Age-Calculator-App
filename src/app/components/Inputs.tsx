"use client"
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { returnFalse } from "../lib/features/todo/CheckDateSlice";

import { getUservalue } from "../lib/features/todo/GetInputDate";
export default function Inputs() {
    const checkDate = useAppSelector(state => state.checkDate.value);
    const dispatch = useAppDispatch();

    // Create labels jsx by map 
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
            const DayFieldvalue = Number(userDate[0].value);
            const MonthFieldvalue = Number(userDate[1].value);
            const yearFieldvalue = Number(userDate[2].value);
            let canCalcDate:boolean = true;

            const DateConditons = [
                {
                    Fieldvalue:Number(userDate[0].value),
                    inputsdigits: inputsdigits[0].current,
                    spanRef: fieldRefs[0].span.current,
                    isInvalid: DayFieldvalue > 31 || DayFieldvalue < 0,
                    textRef: fieldRefs[0].textError.current,
                    isInputEmpty:inputUserValue.Day === '',
                },
                {
                    Fieldvalue:Number(userDate[1].value),
                    inputsdigits: inputsdigits[1].current,
                    spanRef:fieldRefs[1].span.current,
                    isInvalid:MonthFieldvalue > 12 || MonthFieldvalue < 0,
                    textRef: fieldRefs[1].textError.current,
                    isInputEmpty:inputUserValue.Month === '',
                },
                {
                    Fieldvalue:Number(userDate[2].value),
                    inputsdigits: inputsdigits[2].current,
                    spanRef:fieldRefs[2].span.current,
                    isInvalid:yearFieldvalue > new Date().getFullYear() || yearFieldvalue < 0,
                    textRef: fieldRefs[2].textError.current,
                    isInputEmpty:inputUserValue.Year === '',
                },
            ]

            
            DateConditons.map((values, index)=>{
                    if(values.isInputEmpty || values.isInvalid){
                        canCalcDate = false;
                    }
                // texts erros
                if (values.textRef) {
                    values.textRef.innerHTML = values.isInvalid
                    ? inputsValuesErrors[index].invalidDeted : '';
                }
                // inputs erros
                if (values.inputsdigits) {
                    values.inputsdigits.style.border = values.isInvalid 
                    ? 'solid 1px #ff5757' 
                    : 'solid 1px #716f6f';
                }
                // values erros
                if (values.spanRef) {
                    values.spanRef.style.color = values.isInvalid 
                    ? '#ff5757' 
                    : '#716f6f';
                    }

            })

            // condition to check if the date is invalid 
                // se o mês tiver 30 dias e colocar 31 tem que dar erro, além dos inputs vazios

            if(canCalcDate){
                console.log('dia: ', DayFieldvalue);
                console.log('mês: ', MonthFieldvalue);
                console.log('ano: ', yearFieldvalue);  
                
                dispatch(getUservalue({
                    dayInput: DayFieldvalue,
                    monthInput: MonthFieldvalue,
                    yearInput: yearFieldvalue,
                }))
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