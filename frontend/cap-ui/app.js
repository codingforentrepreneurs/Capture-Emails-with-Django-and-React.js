'use strict'

const e = React.createElement;

class HelloWorld extends React.Component {

    handleClick = () => {
        alert("Hello world")
    }

    render () {
        return <button onClick={this.handleClick}>Click me</button>
    }
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