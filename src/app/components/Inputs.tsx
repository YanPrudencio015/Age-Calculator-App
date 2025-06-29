"use client"
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { returnFalse, turnTrue } from "../lib/features/todo/CheckDateSlice";
import { hasError, NoError } from "../lib/features/todo/CanCalcTime";

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


function focusAtEnd(inputRef: RefObject<HTMLInputElement | null>) {
    if (inputRef.current) {
        inputRef.current.focus();
        setTimeout(() => {
            if (inputRef.current) { // Add this null check
                const length = inputRef.current.value.length;
                inputRef.current.setSelectionRange(length, length);
            }
        }, 0);
    }
}


    useEffect(() => {
        inputsdigits[0].current?.focus();
    }, []);

    // Use Enter to jump to next input or use Backspace to return one
function keyDownButton(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    const isEmpty = inputUserValue[buttons[index].title] === '';
    
    if (event.key === "Enter") {
        const cancalcByEnter =  inputsdigits[2].current?.value;
        if (index < inputsdigits.length - 1) {
            focusAtEnd(inputsdigits[index + 1]);
        }
        if(cancalcByEnter?.length === 4){
        dispatch(turnTrue())
    }
    } else if (event.key === "Backspace" && isEmpty) {
        if (index > 0) {
            focusAtEnd(inputsdigits[index - 1]);
        }
    }

    if (event.key === "ArrowRight") {
        if (index < inputsdigits.length - 1) {
            focusAtEnd(inputsdigits[index + 1]);
        }
    } else if (event.key === "ArrowLeft") {
        if (index > 0) {
            focusAtEnd(inputsdigits[index - 1]);
        }
    }
}

useEffect(()=>{
    const cancalcByEnter =  inputsdigits[2].current?.value;
    if(cancalcByEnter?.length === 4){
        console.log('Enter para calcular')
    }
},[inputsdigits[2].current?.value])



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
        {empty: string,invalidDeted: string},
    ];
    
    const inputsValuesErrors:DateValueErrors = [
        {empty:'This field is required', invalidDeted:'must be a valid day' },
        {empty:'This field is required', invalidDeted:'must be a valid month'},
        {empty:'This field is required', invalidDeted:'must be in the past'},
        {empty:'This field is required', invalidDeted:'must be a valid Date'},
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
        let hasValidationErrors = false;

        const DateConditons = [
            {
                Fieldvalue: DayFieldvalue,
                inputsdigits: inputsdigits[0].current,
                spanRef: fieldRefs[0].span.current,
                isInvalid: DayFieldvalue > 31 || DayFieldvalue < 1,
                textRef: fieldRefs[0].textError.current,
                isInputEmpty: inputUserValue.Day === '',
            },
            {
                Fieldvalue: MonthFieldvalue,
                inputsdigits: inputsdigits[1].current,
                spanRef: fieldRefs[1].span.current,
                isInvalid: MonthFieldvalue > 12 || MonthFieldvalue < 1,
                textRef: fieldRefs[1].textError.current,
                isInputEmpty: inputUserValue.Month === '',
            },
            {
                Fieldvalue: yearFieldvalue,
                inputsdigits: inputsdigits[2].current,
                spanRef: fieldRefs[2].span.current,
                isInvalid: yearFieldvalue > new Date().getFullYear() || yearFieldvalue < 0,
                textRef: fieldRefs[2].textError.current,
                isInputEmpty: inputUserValue.Year === '',
            },
        ];

        // basic field's validations
        DateConditons.forEach((values, index) => {
            if (values.isInputEmpty || values.isInvalid) {
                hasValidationErrors = true;
            }

            // apply erros styles
            if (values.textRef) {
                values.textRef.innerHTML = values.isInputEmpty 
                    ? inputsValuesErrors[index].empty 
                    : values.isInvalid 
                        ? inputsValuesErrors[index].invalidDeted 
                        : '';
            }

            if (values.inputsdigits) {
                values.inputsdigits.style.border = (values.isInvalid || values.isInputEmpty)
                    ? 'solid 1px #ff5757' 
                    : 'solid 1px #716f6f';
            }

            if (values.spanRef) {
                values.spanRef.style.color = (values.isInvalid || values.isInputEmpty)
                    ? '#ff5757' 
                    : '#716f6f';
            }
        });

        // specify validation date (only if fields are valid)
        if (!hasValidationErrors) {
            // check if the date is valid
            const testDate = new Date(yearFieldvalue, MonthFieldvalue - 1, DayFieldvalue);
            const isValidDate = testDate.getFullYear() === yearFieldvalue &&
                               testDate.getMonth() === MonthFieldvalue - 1 &&
                               testDate.getDate() === DayFieldvalue;

            if (!isValidDate) {
                hasValidationErrors = true;
                
                // Apply styles of erro to all fields
                DateConditons.forEach((value) => {
                    if (value.inputsdigits) {
                        value.inputsdigits.style.border = 'solid 1px #ff5757';
                    }
                    if (value.spanRef) {
                        value.spanRef.style.color = '#ff5757';
                    }
                });
                
                // show erro in day's field
                if (DateConditons[0].textRef) {
                    DateConditons[0].textRef.innerHTML = inputsValuesErrors[3].invalidDeted;
                }
            }
        }

        // Dispatch based on validation
        if (hasValidationErrors) {
            dispatch(hasError());
        } else {
            dispatch(getUservalue({
                dayInput: DayFieldvalue,
                monthInput: MonthFieldvalue,
                yearInput: yearFieldvalue,
            }));
            dispatch(NoError());
        }

        dispatch(returnFalse());
    }
}, [checkDate, dispatch, fieldRefs, inputsValuesErrors, inputsdigits, inputUserValue.Day, inputUserValue.Month, inputUserValue.Year, userDate]);
    return (
        <div className=" 
                        rounded-t-[8vw] sm:rounded-t-[1vw] w-full h-[25%] 
                        flex items-center sm:items-end 
                        justify-center sm:justify-start
                        sm:px-2 sm:pl-6">
            {buttons.map((value, index) => (
                <label 
                    ref={fieldRefs[index].label}  
                    key={index} 
                    className="relative w-[6.5em] sm:w-[23%] h-[70%] sm:h-[70%] flex flex-col items-start">
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
                        className="text-black focus:border-[#854dff] caret-[#854dff] pl-2 sm:pl-0
                                    sm:text-center font-black text-[25px] font-poppins-sans-serif 
                                    w-[90%] border-1 border-[#716f6f] rounded-md h-[70%] outline-0" 
                        type="text"
                    />
                    <p 
                        ref={fieldRefs[index].textError}
                        className="absolute bottom-[-2.5em] sm:bottom-[-1em] text-[#ff5757] w-full text-center text-[15px] sm:text-[0.8vw]">
                    </p>
                </label>
            ))}
        </div>
    );
}