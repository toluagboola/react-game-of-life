import React, { Component } from "react";

class Game extends Component {
	constructor() {
		super();
		this.state = {
			size: 600,
			scale: 10,
			cells: [[]],
		};
		this.canvasRef = React.createRef();
		this.step = this.step.bind(this);
	}

	componentDidMount() {
		const { scale } = this.state;
		// Wait for the component to be mounted before getting context
		const context = this.canvasRef.current.getContext("2d");
		context.scale(scale, scale);
		context.fillStyle = "black";
		const cells = this.createCells();
		this.setState(
			{
				cells: this.randomCells(cells),
			},
			() => {
				this.drawCells();
				setInterval(this.step, 50);
			}
		);
	}

	getNeighbourCount(x, y) {
		const { size, scale, cells } = this.state;
		const resolution = size / scale;
		let count = 0;
		for (let yy = -1; yy < 2; yy += 1) {
			for (let xx = -1; xx < 2; xx += 1) {
				if (xx === 0 && yy === 0) continue;
				if (x + xx < 0 || x + xx > resolution - 1) continue;
				if (y + yy < 0 || y + yy > resolution - 1) continue;
				if (cells[x + xx][y + yy]) count += 1;
			}
		}
		return count;
	}

	step() {
		const { size, scale } = this.state;
		let { cells } = this.state;
		const resolution = size / scale;
		const newCells = this.createCells();
		for (let y = 0; y < resolution; y += 1) {
			for (let x = 0; x < resolution; x += 1) {
				const neighbours = this.getNeighbourCount(x, y);
				if (cells[x][y] && neighbours >= 2 && neighbours <= 3)
					newCells[x][y] = true;
				else if (!cells[x][y] && neighbours === 3) newCells[x][y] = true;
			}
		}
		cells = newCells;
		this.setState(
			{
				cells,
			},
			() => this.drawCells()
		);
	}

	createCells() {
		const { size, scale } = this.state;
		const resolution = size / scale;
		const rows = new Array(resolution);
		for (let x = 0; x < resolution; x += 1) {
			const cols = new Array(resolution);
			for (let y = 0; y < resolution; y += 1) {
				cols[y] = false;
			}
			rows[x] = cols;
		}
		return rows;
	}

	drawCells() {
		const { size, scale, cells } = this.state;
		const resolution = size / scale;
		const context = this.canvasRef.current.getContext("2d");
		context.fillStyle = "white";
		context.fillRect(0, 0, resolution, resolution);
		context.fillStyle = "#3728b5";
		for (let y = 0; y < resolution; y += 1) {
			for (let x = 0; x < resolution; x += 1) {
				if (cells[y][x]) context.fillRect(x, y, 1, 1);
			}
		}
	}

	randomCells(newCells) {
		const { size, scale } = this.state;
		const cells = newCells;
		const resolution = size / scale;
		for (let y = 0; y < resolution; y += 1) {
			for (let x = 0; x < resolution; x += 1) {
				if (Math.random() < 0.5) {
					if (cells && cells[x]) cells[x][y] = true;
				}
			}
		}
		return cells;
	}

	render() {
		const { size } = this.state;
		return (
			<canvas
				id="canvas"
				ref={this.canvasRef}
				width={size}
				height={size}
			></canvas>
		);
	}
}

export default Game;
