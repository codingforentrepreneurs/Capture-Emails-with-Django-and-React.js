'use strict'

const e = React.createElement;

function HelloWorld (props) {


    function handleClick (event){
        alert("Hi")
    }

    return <button onClick={handleClick}>Click me</button>
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