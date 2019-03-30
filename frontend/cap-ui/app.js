'use strict'

const e = React.createElement;
const useEffect = React.useEffect;
const useState = React.useState;
const rootURL = 'http://127.0.0.1:8000'

const getCookies = (name) => {
    // vanilla javascript
    // docs have jquery
    var cookies = {};
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            var m = c.trim().match(/(\w+)=(.*)/);
            if(m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }
    if (name) {
        return cookies[name]
    }
    return cookies;
}

const useDisplayMsg = () => {
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


// Find all DOM containers, and render our component into them.
var containers = document.querySelectorAll('.cap-ui')
containers.forEach(domContainer => {
    // render the component into the DOM
    ReactDOM.render(
      e(CaptureEmailUI, { config: domContainer.dataset}),
      domContainer
    )
});