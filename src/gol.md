Exactly a year ago, John Conway passed away after developing Covid-19 symptoms. So in honor of his life and as part of my learning process, I decided to build the game he invented using React. This article assumes that you have a basic knowledge of React.

##The Game of Life
According to the [Wikipedia page](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), the Game of Life is a cellular automaton that requires no players. It shows how simple rules can create complex patterns. The gist of the game is, every cell is either alive or dead, and that is determined by its interaction with its eight neighbors.

##Setting up React
Set up your React app by running `npx create-react-app game-of-life` in your terminal. More information on Create React App can be found [here](https://create-react-app.dev/docs/getting-started).

##JavaScript
In this project, we're going to have 2 components: the App and Game components. In the Game component, import React, define the things that might or will change and set them to the initial state, and in the `render` method, we'll create our game board with the HTML [`canvas`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element which is used to draw graphics via JavaScript.

```javascript
//Game.js
import React, { Component, Fragment } from "react";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      size: 700,
      scale: 7,
      cells: [[]],
    };
    this.canvasRef = React.createRef();
  }

  render() {
    return <canvas id="canvas" ref={this.canvasRef}></canvas>;
  }
}

export default Game;
```

The main reason why I stored the size and scale in the state object is that I would need to access them frequently in several other places and setting them to state makes it easier. Here, we've created a [`ref`](https://reactjs.org/docs/refs-and-the-dom.html) on our canvas element using `React.createRef()` and attached it to its instance via the `ref` attribute. `ref` is used to identify DOM nodes in a component. And it's bad practice to use DOM methods like `querySelector()` in React. The next thing is to render the Game component in the App:

```javascript
import React, { Component } from "react";
import Game from "./components/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
```

When the component output is rendered to the DOM (or mounted), we want to perform some actions. For this we'll use the `componentDidMount()` lifecycle method. This will only run when the component is 'mounted'.

```javaScript
class Game extends Component {
//...
  componentDidMount() {
        //destructure scale and cells from state
  const { scale, cells } = this.state;
        //get the canvas context
  this.context = this.canvasRef.current.getContext("2d");
  const { context } = this;
  context.scale(scale, scale);
        //make the whole thing black
  context.fillStyle = "black";
  this.setState({
    cells: this.createCells(),
  });
  console.log(cells);
  this.randomCells();
  this.drawCells();
  }
}
```

What is happening above is, we're getting our `canvas` element's context which is the thing onto which the drawing will be rendered, scaling the individual pixels to the size of `scale`.
