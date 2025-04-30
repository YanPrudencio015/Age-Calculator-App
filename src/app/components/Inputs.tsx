"use client"
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { returnFalse } from "../lib/features/todo/CheckDateSlice";

export default function Inputs() {
    const checkDate = useAppSelector(state => state.checkDate.value);
    const dispatch = useAppDispatch();
    
    // Define field types and button configuration
    type FieldTime = 'Day' | 'Month' | 'Year';
    const buttons: { title: FieldTime, placeholder: string }[] = [
        { title: 'Day', placeholder: 'DD' },
        { title: 'Month', placeholder: 'MM' },
        { title: 'Year', placeholder: "YYYY" },
    ];
     
    // State for user input values
    const [inputUserValue, setInputUserValue] = useState({
        Day: '',
        Month: '',
        Year: ''
    });

    // Create refs for input elements
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    
    // Create refs for field elements (label, span, error text)
    const fieldRefs = buttons.map(() => ({
        label: useRef<HTMLLabelElement>(null),
        span: useRef<HTMLSpanElement>(null),
        textError: useRef<HTMLParagraphElement>(null),
    }));

    // Error messages for validation
    const errorMessages = {
        day: {
            empty: 'This field is required',
            invalid: 'Must be a valid day'
        },
        month: {
            empty: 'This field is required',
            invalid: 'Must be a valid month'
        },
        year: {
            empty: 'This field is required',
            invalid: 'Must be a valid year'
        },
        date: {
            invalid: 'Must be a valid date'
        }
    };

    // Focus first input on component mount
    useEffect(() => {
        // This effect only runs once on mount
        inputRefs[0].current?.focus();
    }, []); // Empty dependency array = run only on mount

    // Validate input to ensure only digits are entered
    const validateNumericInput = (field: FieldTime, value: string) => {
        // Return early if input contains non-digit characters
        if (!/^\d*$/.test(value)) {
            return;
        }
        
        setInputUserValue(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle keyboard navigation between fields
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const isEmpty = inputUserValue[buttons[index].title] === '';
        
        if (event.key === "Enter") {
            // Move to next field on Enter if not the last field
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current?.focus();
            }
        } else if (event.key === "Backspace" && isEmpty) {
            // Move to previous field on Backspace if current field is empty
            if (index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        }
    };

    // Handle auto-focus to next field when current field is filled
    const handleDigitInput = (index: number, value: string) => {
        // Expected length is 4 for year, 2 for day and month
        const expectedLength = index === 2 ? 4 : 2;

        // Auto-focus to next field when current field is filled
        if (value.length === expectedLength && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        }

        // Clear input if it exceeds max length
        if (value.length > expectedLength) {
            const fieldKey = buttons[index].title;
            setInputUserValue(prev => ({
                ...prev,
                [fieldKey]: value.slice(0, expectedLength)
            }));
        }
    };

    // Validate the date when checkDate is true
    useEffect(() => {
        if (!checkDate) return;

        // Convert string inputs to numbers
        const dayValue = Number(inputUserValue.Day);
        const monthValue = Number(inputUserValue.Month);
        const yearValue = Number(inputUserValue.Year);

        // Validate day
        const isDayEmpty = inputUserValue.Day === '';
        const isDayInvalid = dayValue > 31 || dayValue <= 0;
        
        // Validate month
        const isMonthEmpty = inputUserValue.Month === '';
        const isMonthInvalid = monthValue > 12 || monthValue <= 0;
        
        // Validate year
        const isYearEmpty = inputUserValue.Year === '';
        const isYearInvalid = yearValue > new Date().getFullYear() || yearValue <= 0;

        // Apply validation styles for day
        if (fieldRefs[0].textError.current) {
            if (isDayEmpty) {
                fieldRefs[0].textError.current.innerHTML = errorMessages.day.empty;
            } else if (isDayInvalid) {
                fieldRefs[0].textError.current.innerHTML = errorMessages.day.invalid;
            } else {
                fieldRefs[0].textError.current.innerHTML = '';
            }
        }
        
        if (fieldRefs[0].span.current) {
            fieldRefs[0].span.current.style.color = (isDayEmpty || isDayInvalid) ? '#ff5757' : '#716f6f';
        }
        
        if (inputRefs[0].current) {
            inputRefs[0].current.style.border = (isDayEmpty || isDayInvalid) ? 'solid 1px #ff5757' : 'solid 1px #716f6f';
        }

        // Apply validation styles for month
        if (fieldRefs[1].textError.current) {
            if (isMonthEmpty) {
                fieldRefs[1].textError.current.innerHTML = errorMessages.month.empty;
            } else if (isMonthInvalid) {
                fieldRefs[1].textError.current.innerHTML = errorMessages.month.invalid;
            } else {
                fieldRefs[1].textError.current.innerHTML = '';
            }
        }
        
        if (fieldRefs[1].span.current) {
            fieldRefs[1].span.current.style.color = (isMonthEmpty || isMonthInvalid) ? '#ff5757' : '#716f6f';
        }
        
        if (inputRefs[1].current) {
            inputRefs[1].current.style.border = (isMonthEmpty || isMonthInvalid) ? 'solid 1px #ff5757' : 'solid 1px #716f6f';
        }

        // Apply validation styles for year
        if (fieldRefs[2].textError.current) {
            if (isYearEmpty) {
                fieldRefs[2].textError.current.innerHTML = errorMessages.year.empty;
            } else if (isYearInvalid) {
                fieldRefs[2].textError.current.innerHTML = errorMessages.year.invalid;
            } else {
                fieldRefs[2].textError.current.innerHTML = '';
            }
        }
        
        if (fieldRefs[2].span.current) {
            fieldRefs[2].span.current.style.color = (isYearEmpty || isYearInvalid) ? '#ff5757' : '#716f6f';
        }
        
        if (inputRefs[2].current) {
            inputRefs[2].current.style.border = (isYearEmpty || isYearInvalid) ? 'solid 1px #ff5757' : 'solid 1px #716f6f';
        }

        // Reset the checkDate state
        dispatch(returnFalse());
    }, [checkDate, dispatch, inputUserValue, errorMessages]);

    return (
        <div className="rounded-t-[8vw] sm:rounded-t-[1vw] w-full h-[25%] flex items-center sm:items-end justify-center sm:justify-start gap-4 px-6 sm:px-2">
            {buttons.map((value, index) => (
                <label 
                    ref={fieldRefs[index].label}  
                    key={index} 
                    className="relative w-[30%] sm:w-[20%] h-[50%] sm:h-[70%] flex flex-col items-start"
                >
                    <span 
                        ref={fieldRefs[index].span} 
                        className="text-[#716f6f] text-[12px] font-black font-poppins-sans-serif uppercase tracking-[2px]"
                    >
                        {value.title}
                    </span>
                    <input 
                        ref={inputRefs[index]}
                        value={inputUserValue[value.title]} 
                        placeholder={value.placeholder}
                        onChange={(e) => {
                            validateNumericInput(value.title, e.target.value); 
                            handleDigitInput(index, e.target.value);
                        }} 
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="text-black focus:border-[#854dff] caret-[#854dff] pl-2 sm:pl-0 sm:text-center font-black text-[25px] font-poppins-sans-serif w-[100%] border-1 border-[#716f6f] rounded-md h-[70%] outline-0" 
                        type="text"
                    />
                    <p 
                        ref={fieldRefs[index].textError}
                        className="absolute bottom-[0vh] text-[#ff5757] text-[15px] sm:text-[0.8vw]"
                    ></p>
                </label>
            ))}
        </div>
    );
}