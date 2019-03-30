import {useState, useEffect} from 'react'

export const useDisplayMsg = () => {
    const [msg, setMsg] = useState('')
    const [isError, setIsError] = useState(false)


    const setDisplayMsg = (msg, isError) => {
        setMsg(msg)
        const error = String(isError) === 'true' ? true : false
        setIsError(error)
    }

    useEffect(()=>{
        let timeout;
        if (msg !== '') {
            const duration = isError ? 20 * 1000 : 5 * 1000
            timeout = setTimeout(()=>{
                setDisplayMsg("", false)
            }, duration)
        }

        return () => {
            clearTimeout(timeout)
        }
    })
    return [msg, isError, setDisplayMsg]
}