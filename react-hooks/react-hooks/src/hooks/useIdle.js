import React, { useEffect, useRef, useState } from 'react'

const useIdle = (delay) => {

    const [isIdle, setIsIdle] = useState(false);

    // create a new reference to track timer
    const timeoutId = useRef();

    const goActive = () => {
        setIsIdle(false);
        // start the timer to track Inactiveness
        startTimer();
    }

    const goInActive = () => {
        setIsIdle(true);
    }

    const startTimer = () => {
        // wait till delay time before calling goInactive
        timeoutId.current = setTimeout(goInActive, delay);
    }

    const resetTimer = () => {
        //reset the timer and make user active
        clearTimeout(timeoutId.current);
        goActive();
    }

    useEffect(() => {
        setUp();

        return () => {
            cleanUp();
        }
    })

    const setUp = () => {
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('mousedown', resetTimer);
        document.addEventListener('keypress', resetTimer);
        document.addEventListener('mousewheel', resetTimer);
        document.addEventListener('touchmove', resetTimer);
        document.addEventListener('MSPointerMove', resetTimer);
        document.addEventListener('DOMMouseScroll', resetTimer);

        window.addEventListener('blur', startTimer);
        window.addEventListener('focus', resetTimer);
    }

    const cleanUp = () => {
        document.removeEventListener('mousemove', resetTimer);
        document.removeEventListener('mousedown', resetTimer);
        document.removeEventListener('keypress', resetTimer);
        document.removeEventListener('mousewheel', resetTimer);
        document.removeEventListener('touchmove', resetTimer);
        document.removeEventListener('MSPointerMove', resetTimer);
        document.removeEventListener('DOMMouseScroll', resetTimer);

        window.removeEventListener('blur', startTimer);
        window.removeEventListener('focus', resetTimer);

        clearTimeout(timeoutId);
    }

    return isIdle;

}

export default useIdle