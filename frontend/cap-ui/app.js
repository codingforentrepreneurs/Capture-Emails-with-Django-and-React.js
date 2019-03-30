'use strict'

const e = React.createElement;
const useState = React.useState;

function HelloWorld (props) {
    const [someVal, setSomeVal] = useState('')

    function handleSubmit (event){
        event.preventDefault()
        console.log(someVal)
        // send to backend!
        setSomeVal('')
    }

    function handleChange (event) {
        setSomeVal(event.target.value)
    }
    return <form onSubmit={handleSubmit}>
        <input 
            value={someVal}
            onChange={handleChange}
            type='email' 
            placeholder='your email' 
            required />
        <button type='submit'>Save Email</button>
    </form>
}


// Find all DOM containers, and render our component into them.
var containers = document.querySelectorAll('.cap-ui')
containers.forEach(domContainer => {
    // Read the user ID from a data-* attribute.
    const userid = domContainer.dataset.userid
    // render the component into the DOM
    ReactDOM.render(
      e(HelloWorld, { userid: userid}),
      domContainer
    )
});