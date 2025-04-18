import React, { useEffect, useRef } from 'react'

const usePrevious = (current) => {
    // create a new reference
    let previous = useRef();

    // Stores the current value in ref
    useEffect(() => {
        previous.current = current
    }, [current])

    // returns previous value as useEffect runs after update
    return previous.current;
}

export default usePrevious