import '../index.html';
import '../css/main.scss';

import React    			   from 'react';
import ReactDOM 			   from 'react-dom';
import dat 			           from 'dat-gui';
import {
		gliderGun,
		galaxy,
		osc,
		pentadecathlon
	   }        		       from 'core/shapes';
import {debounce} 			   from 'core/debounce';
import {getMousePosition} 	   from 'core/getMousePos';

import {init} 	               from 'core/init';
import {resize} 	           from 'core/resize';
import {update} 	           from 'core/update';
import {
		draw,
		drawBackground,
		drawBaseShape
	   } 	                   from 'core/draw';
import {
		mouseup,
		mousedown,
		drawCell
		} 	           	       from 'core/mouseEvent';

var Game = function() {

	this.bgFillColor = '#821919';
	this.activeFillColor = '#671515';
	this.ticRate = 100;
	this.drawMode = false;
	this.circleSize = 22;
	this.circleOffset = 30;
	this.gooPower = 19;

	this.circleStartAngle = 0;
	this.circleEndAngle = 2*Math.PI;

	this.canvas = document.getElementById('canvas');
	this.context = canvas.getContext('2d');

	this.bgCanvas = document.getElementById('bgCanvas');
	this.bgContext = bgCanvas.getContext('2d');

	this.bgCanvas.width = this.canvas.width = window.innerWidth;
	this.bgCanvas.height = this.canvas.height = window.innerHeight;

	this.cells = [];

	this.isMouseDown = -1;

	this.arrayOfShapes = [gliderGun(), galaxy(), pentadecathlon(), osc()];

	this.elemLeft = canvas.offsetLeft;
	this.elemTop = canvas.offsetTop;

	this.init = init;
	this.resize = resize;
	this.update = update;

	this.getMousePosition = getMousePosition;
	this.mouseup = mouseup;
	this.mousedown = mousedown;
	this.drawCell = drawCell;

	this.draw = draw;
	this.drawBackground = drawBackground;
	this.drawBaseShape = drawBaseShape;

	this.loopInterval;

	this.play = function() {
		if (game.loopInterval)
			clearInterval(game.loopInterval);
		if (!game.drawMode)
			game.loopInterval = window.setInterval(game.loop, game.ticRate);
	}

	this.pause = function() {
	  clearInterval(game.loopInterval);
	}

	this.updateVariables = function() {
	  game.init(game);
	}

	this.loop = function() {
	  game.update(game);
	  game.draw(game);
	}

	this.assignEvents = function() {
		var handleResize = debounce(function(){ game.resize(game);}, 500);
		var handleMouseMove = debounce(function(event){ game.drawCell(game, event);}, 5);
		document.addEventListener("mousedown", function(){game.mousedown(game)});
		document.addEventListener("mouseup", function(){game.mouseup(game)});
		document.onmousemove = handleMouseMove;
		window.addEventListener('resize', handleResize, false);
	}
	this.updateSvgFilter = function() {
		var svg = document.getElementById('svg');

		if (svg.hasChildNodes()) {
		   svg.removeChild(svg.firstChild);
		}

		var s = '<svg id="filter" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ' + game.gooPower + '-9" result="goo" /><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs></svg>';
		svg.innerHTML = s;
	}
};


var game = new Game();
var gui = new dat.GUI();


gui.add(game, 'bgFillColor');
gui.add(game, 'activeFillColor');
gui.add(game, 'ticRate', 100, 1000);
gui.add(game, 'drawMode');
gui.add(game, 'circleSize', 10, 30);
gui.add(game, 'circleOffset', 20, 40);
gui.add(game, 'gooPower', 10, 40);
gui.add(game, 'play');
gui.add(game, 'pause');
gui.add(game, 'updateVariables');


game.assignEvents();
game.init(game);
game.play();