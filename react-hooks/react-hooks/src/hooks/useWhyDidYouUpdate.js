import React, { useEffect, useRef } from 'react'

const useWhyDidYouUpdate = (name, props) => {
    console.log(name, props);

    const previousProps = useRef(props);

    useEffect(() => {
        if (previousProps.current) {
            // merge the keys of previousprops and current
            const keys = Object.keys({ ...previousProps.current, ...props });

            // to store what has changed
            const changedObj = {};

            // check what values has changed between previous and current props
            keys.forEach((key) => {
                if (typeof props[key] === 'object' && typeof previousProps.current[key] === 'object') {
                    if (JSON.stringify(props[key]) !== JSON.stringify(previousProps.current[key])) {
                        changedObj[key] = {
                            from: previousProps.current[key],
                            to: props[key]
                        }
                    }
                }
                else {
                    if (props[key] !== previousProps.current[key]) {
                        changedObj[key] = {
                            from: previousProps.current[key],
                            to: props[key]
                        }
                    }
                }
            });

            // If changedObj is not empty, means something has changed

            if (Object.keys(changedObj).length) {
                console.log("This is causing re-render", name, changedObj)
            }

        }

        // update the previous props with current
        previousProps.current = props;
    })
}

export default useWhyDidYouUpdate