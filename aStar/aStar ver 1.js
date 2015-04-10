width = 20;
height = 20;
margin = 5;
size = 26;
startPresent = false;
finishPresent = false;
red = "#FF0000";
black = "#000000";
green = "#00FF00";
blue = "#0000FF";
lightBlue = "#00FFFF"
white = "#FFFFFF";
orange = "#FFBB00";
finalPath = new Array();
isActive = false;
dijkstraActive = false;
var grid = new Array();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
tempG = 0;
var openSet = new Array();
var closedSet = new Array();
var currentNode = Node;
var startNode = Node;
var finishNode = Node;
var fastAnimation = false;
var medAnimation = false;
var slowAnimation = true;




Node = function()
{
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.yPos = 0;
	this.xPos = 0;
	this.row;
	this.col;
	this.isStart = false;
	this.isFinish = false;
	this.wall = false;
	this.ground = false;
	this.parent;	
	this.color;
	this.neighbors = new Array();
	

	this.changeFormat = function()
	{

		if(startPresent == false && finishPresent == false)
		{
			if(this.color == black)
			{
				this.color = green;
				this.isStart = true;
				startPresent = true;
				this.wall = false;
				this.ground = false;
			}
			else if(this.color == white)
			{
				this.color = black;
				this.ground = false;
				this.wall = true;
				this.isStart = false;
				this.isFinish = false;
			}
			
		}
		else if(startPresent == true && finishPresent == false)
		{
			if(this.color == green)
			{
				this.color = white;
				startPresent = false;
				this.isStart = false;
				this.ground = true;
				this.wall = false;
			}
			else if(this.color == white)
			{
				this.color = black;
				this.wall = true;
				this.ground = false;
			}
			else if(this.color == black)
			{
				this.color = red;
				finishPresent = true;	
				this.isFinish = true;
				this.ground = false;
				this.wall = false;
			}
		}
		else if(startPresent == false && finishPresent == true)
		{
			if(this.color = red)
			{
				this.color = white;
				finishPresent = false;
				this.isFinish = false;
				this.ground = true;
				this.wall = false;
			}
			else if(this.color == black)
			{
				this.color = green;
				startPresent = true;
				this.isStart = true;
				this.wall = false;
				this.ground = false;
			}
			
			else if(this.color == white)
			{
				this.color = black;
				this.ground = false;
				this.wall = true;
			}
			
		}
		else if(startPresent == true && finishPresent == true)
		{
			if(this.color == red)
			{
				this.color = white;
				finishPresent = false;
				this.isFinish = false;
				this.ground = true;
				this.wall = false;
			}
			else if(this.color == green)
			{
				this.color = white;
				startPresent = false;
				this.isStart = false;
				this.ground = true;
				this.wall = false;
			}
			else if(this.color == black)
			{
				this.color = white;
				this.ground = false;
				this.wall = false;
			}
			else if(this.color = white)
			{
				this.color = black;
				this.wall = true;
				this.ground = false;
			}
		}
		ctx.fillStyle = this.color;
		ctx.fillRect(this.xPos, this.yPos, width, height);
	}

	this.colorNeighbors = function()
	{
		this.color = lightBlue;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.xPos, this.yPos, width, height);
		return;
	}


	this.getNeighbors = function()
	{
		var count = 0;
		
		if(this.row-1 >= 0 && this.col-1 >= 0 && this.color!=black)
		{
			this.neighbors.push(grid[this.row-1][this.col-1]);
			//this.neighbors[count].g = 14;
			count++;
		}

		if(this.row-1 >= 0 && this.col >= 0 && this.color!=black)
		{
			this.neighbors.push(grid[this.row-1][this.col]);
			//this.neighbors[count].g = 10;
			count++;

		}

		if(this.row-1 >= 0 && this.col+1 <= 25 && this.color !=black)
		{
			this.neighbors.push(grid[this.row-1][this.col+1]);
			//this.neighbors[count].g = 14;
			count++;
		}

		if(this.row >= 0 && this.col-1 >= 0 && this.color !=black)
		{
			this.neighbors.push(grid[this.row][this.col-1]);
			//this.neighbors[count].g = 10;
			count++;
		}

		if(this.row >= 0 && this.col+1 <= 25 && this.color!=black)
		{
			this.neighbors.push(grid[this.row][this.col+1]);
			//this.neighbors[count].g = 10;
			count++;

		}

		if(this.row+1 <= 13 && this.col-1 >= 0 && this.color != black)
		{
			this.neighbors.push(grid[this.row+1][this.col-1]);
			//this.neighbors[count].g = 14;
			count++;
		}

		if(this.row+1 <= 13 && this.col >= 0 && this.color != black)
		{
			this.neighbors.push(grid[this.row+1][this.col]);
			//this.neighbors[count].g = 10;
			count++;
		}

		if(this.row+1 <= 13 && this.col+1 <= 25 && this.color != black)
		{
			this.neighbors.push(grid[this.row+1][this.col+1])
			//this.neighbors[count].g = 14;
			count++;
		}

		var i;
		for(i = 0; i < this.neighbors.length; i++)
		{
			if(this.neighbors[i].color != black)
			{
				if(this.neighbors[i].color == red || this.neighbors[i].color == green)
					continue;
				
				this.neighbors[i].colorNeighbors();
			}
				
		} 
		return;
	}

	//used for debugging

	// this.toString = function()
	// { 
	// 	return ("I am "+ this.row + " " + this.col);
	// }
}

//retrieves h values for grid
function getHValues(Node)
{
	var finishNode = Node;
	var i, j, horizontal, vertical;
	for(i=0; i < size; i++)
		for(j=0; j<size; j++)
		{
			horizontal = Math.abs(grid[i][j].col - finishNode.col);
			vertical = Math.abs(grid[i][j].row - finishNode.row);
			grid[i][j].h = ((horizontal + vertical) * 10);
		}

	return;


}

//retrieves f values for grid
function getFValues()
{
	var i, j;
	for(i=0; i < size; i++)
		for(j=0; j<size; j++)
			grid[i][j].f = (grid[i][j].g + grid[i][j].h);

}

// function getGValues(Node)
// {
// 	for(i=0; i < Node.neighbors.length; i++)
// 	{
// 		if(Node.col == Node.neighbors[i].col || Node.row == Node.neighbors[i].row)
// 		{
// 			Node.neighbors[i].g = 10;
// 		}
// 		else
// 		{
// 			Node.neighbors[i].g = 14;
// 		}
// 	}
// }

//initializing the graph
function init(size)
{

	isActive = false;
	slowAnimation = false;
	fastAnimation = false;
	medAnimation = false

	finishPresent = false;
	startPresent = false;


	grid.length = 0;
	finalPath.length = 0;
	openSet.length = 0;
	closedSet.length = 0;
	size = size;
	c.addEventListener("mousedown", doMouseDown, false);
	window.addEventListener("keydown", keyHandler, false);

	//initial canvas drawing
	ctx.fillStyle = black;
	ctx.fillRect(0, 0, c.width, c.height);

	//resetting variables
	startPresent = false;
	finishPresent = false;

	//drawing grid + making grid array
	ctx.fillStyle = white;	
	var column = 0;
	var row = 0;
	for(row = 0; row < size; row++)
	{
		grid[row] = new Array();
		for(column = 0; column < size; column++)
		{
			ctx.fillRect((margin + width) * column + margin, (margin + height) * row + margin, width, height); 
			var x = new Node(row, column);
			grid[row][column] = x;
			grid[row][column].xPos = Math.floor(((margin + width) * column + margin));
			grid[row][column].yPos = Math.floor(((margin + height) * row + margin));
			grid[row][column].row = row;
			grid[row][column].col = column;
			grid[row][column].color = white;	
		}
	}
}

//utility function to determine where mouse is on canvas
function windowToCanvas(canvas, x, y)
{
	var bbox = c.getBoundingClientRect();

	return {x: x - bbox.left * (canvas.width / bbox.width),
			y: y - bbox.top * (canvas.height / bbox.height)
			};
}

//mouse event handler
function doMouseDown(event)
{
	var location = windowToCanvas(c, event.clientX, event.clientY);
	var mouseY = location.y - c.offsetTop;
	var mouseX = location.x - c.offsetLeft;

	var row = Math.floor((mouseY)/ (width + margin));
	var col = Math.floor((mouseX)/ (height + margin));

	grid[row][col].changeFormat()

}

//keyboard handlers
function keyHandler(event)
{
	var i,j;

	//G key
	if(event.keyCode == 71)
	{
		ctx.font = "8px Helvetica";
		for(i=0; i < size; i++)
			for(j=0; j < size; j++)
			{
				ctx.fillStyle = grid[i][j].color;
				ctx.fillRect(grid[i][j].xPos, grid[i][j].yPos, height, width);
				ctx.fillStyle = black;
				ctx.fillText("G:" + grid[i][j].g, grid[i][j].xPos, grid[i][j].yPos + 12);
			}
	}
	//H key
	if(event.keyCode == 72)
	{
		ctx.font = "8px Helvetica";
		for(i=0; i < size; i++)
			for(j=0; j < size; j++)
			{
				ctx.fillStyle = grid[i][j].color;
				ctx.fillRect(grid[i][j].xPos, grid[i][j].yPos, height, width);
				ctx.fillStyle = black;
				ctx.fillText("H:" + grid[i][j].h, grid[i][j].xPos, grid[i][j].yPos + 12);
			}
	}
	//F key
	if(event.keyCode == 70)
	{
		ctx.font = "8px Helvetica";
		for(i=0; i < size; i++)
			for(j=0; j < size; j++)
			{
				ctx.fillStyle = grid[i][j].color;
				ctx.fillRect(grid[i][j].xPos, grid[i][j].yPos, height, width);
				ctx.fillStyle = black;
				ctx.fillText("F:" + grid[i][j].f, grid[i][j].xPos, grid[i][j].yPos + 12);
			}
	}

	//C key
	if(event.keyCode ==67)
	{
		for(i=0; i < size; i++)
			for(j=0; j < size; j++)
			{
				ctx.fillStyle = grid[i][j].color;
				ctx.fillRect(grid[i][j].xPos, grid[i][j].yPos, height, width);
			}	
	}

	//spacebar
	if(event.keyCode == 32)
	{	
		if(isActive == true)
		{
			if(slowAnimation == true)
			{
				var i = 1;
				while(i > 0)
				{
					Step();
					i--;
				}
			}
			else if(medAnimation == true)
			{
				var i = 8;
				while(i > 0)
				{
					Step();
					i--;
				} 
			}

			else if(fastAnimation == true)
			{
				var i = 10;
				while(i > 0)
				{
					Step();
					i--;
				}
			}
		}
		else if(dijkstraActive == true)
		{
			if(slowAnimation == true)
			{
				var i = 1;
				while(i > 0)
				{
					Step();
					i--;
				}
			}
			else if(medAnimation == true)
			{
				var i = 8;
				while(i > 0)
				{
					Step();
					i--;
				} 
			}

			else if(fastAnimation == true)
			{
				var i = 10;
				while(i > 0)
				{
					Step();
					i--;
				}
			}
		}
	}	
}

function makeFast()
{
	fastAnimation = true;
	medAnimation = false;
	slowAnimation = false;
}

function makeMed()
{
	fastAnimation = false;
	medAnimation = true;
	slowAnimation = false;
}

function makeSlow()
{
	fastAnimation = false;
	medAnimation = false;
	slowAnimation = true;
}

function Step()
{
		
	  
			//finding node with least F value
			currentNode = openSet[getIndexOfminimum(openSet)];

			//if current node is finish
			if(currentNode.isFinish == true)
			{
				startNode.color = green;
				return reconstructPath(finishNode);
			}


			//removing currentNode from the openSet and putting it into the closedSet
			openSet.splice(getIndexOfminimum(openSet),1);
			closedSet.push(currentNode);
			currentNode.getNeighbors();
			//getGValues(currentNode);

			//iterating through current's neighbors
			for(i = 0; i < currentNode.neighbors.length; i++)
			{
				if(currentNode.neighbors[i].row == currentNode.row || currentNode.neighbors[i].col == currentNode.col)
				{
					currentNode.neighbors[i].g = 10;
				}
				else
				{
					currentNode.neighbors[i].g = 14;
				}

				if(closedSet.includes(currentNode.neighbors[i]))
				{
					continue;
				}

				//creating temporary g value for use in reparenting
				tempG = currentNode.g + currentNode.neighbors[i].g;

				//reparenting and adding to the openSet
				if(!(openSet.includes(currentNode.neighbors[i])) || (tempG < currentNode.neighbors[i].g))
				{
					currentNode.neighbors[i].parent = currentNode;
					currentNode.neighbors[i].g = tempG;
					getFValues();
					startNode.f = 0;
					if(!openSet.includes(currentNode.neighbors[i]))
					{
						openSet.push(currentNode.neighbors[i]);

					}
				}
			}
		
		if(openSet.length == 0)
			alert("No path found.");
		return;
}

function dijkstraStep()
{
		if(dijkstraActive == false)
		{
			return;
		}
	  
			//finding node with least F value
			currentNode = openSet[getIndexOfminimum(openSet)];

			//if current node is finish
			if(currentNode.isFinish == true)
			{
				startNode.color = green;
				return reconstructPath(finishNode);
			}


			//removing currentNode from the openSet and putting it into the closedSet
			openSet.splice(getIndexOfminimum(openSet),1);
			//openSet.shift();
			closedSet.push(currentNode);

			currentNode.getNeighbors();
			//iterating through current's neighbors
			for(i = 0; i < currentNode.neighbors.length; i++)
			{
				getGValues(currentNode.neighbors[i]);
				if(closedSet.includes(currentNode.neighbors[i]))
				{
					continue;
				}

				//creating temporary g value for use in reparenting
				tempG = currentNode.g + currentNode.neighbors[i].g;

				//reparenting and adding to the openSet
				if((!openSet.includes(currentNode.neighbors[i])) || (tempG > currentNode.neighbors[i].g))
				{
					currentNode.neighbors[i].parent = currentNode;
					currentNode.neighbors[i].g = tempG;
					getFValues();
					startNode.f = 0;
					if(!openSet.includes(currentNode.neighbors[i]))
					{
						openSet.push(currentNode.neighbors[i]);

					}
				}
			}
		
		if(openSet.length == 0)
			alert("No path found.");
		return;
}


function doAStar()
{

		//make sure start and finish are present
		if(!finishPresent || !startPresent)
		{	
			alert("You need both a start and a finish node!");
			return;
		}

		//enable stepping through the function
		isActive = true;

		//nested loop variables.
		var i, j;

		//used for reparenting
		tempG = 0;

		
		//initializing + finding start, finish, and current nodes;
		//var startNode, finishNode, currentNode;
		for(i = 0; i < size; i++)
		{
			for(j=0; j < size; j++)
			{
				if(grid[i][j].isStart == true)
				{
					startNode = grid[i][j];
				}
				else if(grid[i][j].isFinish == true)
				{
					finishNode = grid[i][j];
				}
			}
		}

		//setting up heuristic distances
		getHValues(finishNode);

		//pushing start node onto the openSet
		openSet.push(startNode);
		startNode.g = 0;

		//computing F values for the map, setting start to 0
		getFValues();
		startNode.f = 0;
		// if(openSet.length == 0)
		// alert("No path found.");
		
		return;

}

function doDijkstra()
{

		//make sure start and finish are present
		if(!finishPresent || !startPresent)
		{	
			alert("You need both a start and a finish node!");
			return;
		}

		//enable stepping through the function
		dijkstraActive = true;

		//nested loop variables.
		var i, j;

		//used for reparenting
		tempG = 0;

		
		//initializing + finding start, finish, and current nodes;
		//var startNode, finishNode, currentNode;
		for(i = 0; i < size; i++)
		{
			for(j=0; j < size; j++)
			{
				grid[i][j].h = 0;
				if(grid[i][j].isStart == true)
				{
					startNode = grid[i][j];
				}
				else if(grid[i][j].isFinish == true)
				{
					finishNode = grid[i][j];
				}
			}
		}

		//getHValues(finishNode);

		//pushing start node onto the openSet
		openSet.push(startNode);
		startNode.g = 0;

		//computing F values for the map, setting start to 0
		getFValues();
		startNode.f = 0;
		startNode.h = 0;
		
		return;

}

function reconstructPath(finishNode)
{	
	var count = 0;
	console.log("reconstructing path");
	var tempNode = finishNode;
	finalPath.push(tempNode);
	while(tempNode.parent)
	{
		if(tempNode.isFinish == true)
		{
			tempNode.color = red;
			tempNode = tempNode.parent;
			finalPath.push(tempNode);
		}
		else
		{
			tempNode.color = orange;
			tempNode = tempNode.parent;
			finalPath.push(tempNode);
		}
		count++;
		
	}
	var i;
	for(i=0; i < finalPath.length; i++)
	{
		ctx.fillStyle = finalPath[i].color;
		ctx.fillRect(finalPath[i].xPos, finalPath[i].yPos, width, height);
	}
	document.getElementById("results").innerHTML = "Number of steps taken: " + count;
	return finalPath;
}


Array.prototype.includes = function (obj)
{
	var i = this.length;

	while(i--)
	{
		if(this[i] == obj)
			return true;
	}

	return false;
}

function getIndexOfminimum(inArray)
{
	var min, i;
	var indexOfMin;
	if(inArray)
	{
		min = inArray[0].f;
		indexOfMin = 0;
		for(i = 0; i < inArray.length; i++)
		{
			if(inArray[i].f < min)
			{
				min = inArray[i].f
				indexOfMin = i;
			}
		}
	}
	return indexOfMin;
}


function getIndexOfminimumDijkstra(inArray)
{
	var min, i;
	var indexOfMinDijkstra;
	if(inArray)
	{
		min = inArray[0].g;
		indexOfMinDijkstra = 0;
		for(i = 0; i < inArray.length; i++)
		{
			if(inArray[i].g < min)
			{
				min = inArray[i].g
				indexOfMinDijkstra = i;
			}
		}
	}
	return indexOfMinDijkstra;
}


function makeGridSmall()
{

}

//main loop
function draw()
{
	requestAnimationFrame(draw);

}
init(26);
draw();