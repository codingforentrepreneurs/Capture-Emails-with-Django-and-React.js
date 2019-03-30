import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {getCookies, useDisplayMsg} from './utils'

const CaptureEmailUI = (props) => {
    const [value, setValue] = useState('')
    const [msg, isError, setDisplayMsg] = useDisplayMsg()

    const handleSubmit = (event) =>{
        event.preventDefault()
        const csrftoken = getCookies('csrftoken')
        if (!csrftoken) {
            setDisplayMsg("This is not a valid embed.", true)
        }

        if (value === '' || value === undefined || value === null) {
            setDisplayMsg("Value is required", true)
            return
        }
        // send to backend!
        
        const url = `${rootURL}/api/capture/email/`
        const data = {
            email: value
        }

        const jsonData = JSON.stringify(data)

        const xhr = new XMLHttpRequest()

        xhr.open("POST", url, true) // async
        xhr.setRequestHeader('Content-Type', 'application/json')

        
        xhr.setRequestHeader('X-CSRFTOKEN', csrftoken)
        xhr.onerror = () => {
            setDisplayMsg('Error! Please try again later.', true)
        }
        xhr.onload = () => {
            if (xhr.status === 201) {
                setValue('')
                setDisplayMsg('Success! You email is saved.', false)
            } else {
                setDisplayMsg('Error! Please try again.', true)
            }
        }

        xhr.send(jsonData)


    }

    const handleChange = (event) => {
        setValue(event.target.value)
        setDisplayMsg('', false)
    }
    const {config} = props
    return <form className={config.formClass} onSubmit={handleSubmit}>
        {(!isError && msg) && <div 
            className={config.successClass ? 
                config.successClass : 'alert alert-success'
            }>{msg}</div>}

        <input 
            className={config.inputClass} 
            value={value}
            onChange={handleChange}
            type='email' 
            placeholder='your email' 
            required
             />
        {(isError && msg) && <p className={config.errorClass}>{msg}</p>}
        {config.btnShow === 'false' ? '' :
         
            <p><button className={config.btnClass}  type='submit'>Save Email</button></p>
          }
    </form>
}

export default CaptureEmailUI;
