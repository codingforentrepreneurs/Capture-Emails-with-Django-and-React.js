'use strict'

const e = React.createElement;
const useEffect = React.useEffect;
const useState = React.useState;
const rootURL = 'http://127.0.0.1:8000'


const CaptureEmailUI = (props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        const url = `${rootURL}/api/capture/token/`
        const xhr = new XMLHttpRequest()
        xhr.open("GET", url, true) // async
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            if (xhr.status === 200) {
               const responseJson = JSON.parse(xhr.responseText)
               setToken(responseJson['csrfToken'])
            } else {
                alert("Error")
            }
        }
        xhr.send()
    }, [])

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (value === '' || value === undefined || value === null) {
            setError("Value is required")
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
        xhr.setRequestHeader('X-CSRFTOKEN', token)

        xhr.onload = () => {
            console.log(xhr.responseText)
            if (xhr.status === 201) {
                alert("Success!")
                setValue('')
                setError('')

            } else {
                alert("Error")
            }
        }

        xhr.send(jsonData)


    }

    const handleChange = (event) => {
        setValue(event.target.value)
        setError('')
    }
    console.log(props)
    const {config} = props
    return <form className={config.formClass} onSubmit={handleSubmit}>
        <input 
            className={config.inputClass} 
            value={value}
            onChange={handleChange}
            type='email' 
            placeholder='your email' 
            required
             />
        {error && <p className={config.errorClass}>{error}</p>}
        {config.btnShow === 'false' ? '' :
         
            <p><button className={config.btnClass}  type='submit'>Save Email</button></p>
          }
    </form>
}


// Find all DOM containers, and render our component into them.
var containers = document.querySelectorAll('.cap-ui')
containers.forEach(domContainer => {
    // Read the user ID from a data-* attribute.
    console.log(domContainer.dataset)
    const userid = domContainer.dataset.userid
    // render the component into the DOM
    ReactDOM.render(
      e(CaptureEmailUI, { config: domContainer.dataset}),
      domContainer
    )
});