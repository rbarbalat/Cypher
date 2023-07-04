import { useState, useRef, useEffect } from 'react';

export default function useOutsideClick(initIsVisible) {
    const [ isVisible, setIsVisible] = useState(initIsVisible);
    const ref = useRef(null)

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return { ref, isVisible, setIsVisible }
}
