<script>
	import { mode } from 'mode-watcher';
	import { onMount, beforeUpdate, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const mousePositionStore = writable({ x: 0, y: 0 });

	let x = 0;
	let y = 0;

	const handleMouseMove = (/** @type {{ clientX: number; clientY: number; }} */ event) => {
		x = event.clientX;
		y = event.clientY;
		mousePositionStore.set({ x, y });
	};

	export let className = 'h-full';
	export let quantity = 30;
	export let staticity = 50;
	export let ease = 50;
	export let vx = 0;
	export let vy = 0;

	export let color = $mode === 'dark' ? '#ffffff' : '#000000';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvasRef;
	/**
	 * @type {HTMLDivElement}
	 */
	let canvasContainerRef;
	/**
	 * @type {CanvasRenderingContext2D | null}
	 */
	let context;
	/**
	 * @type {any[]}
	 */
	let circles = [];
	let mousePosition = mousePositionStore;
	let mouse = { x: 0, y: 0 };
	let canvasSize = { w: 0, h: 0 };
	let dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

	/**
	 * @param {string} hex
	 */
	function hexToRgb(hex) {
		hex = hex.replace('#', '');
		const hexInt = parseInt(hex, 16);
		const red = (hexInt >> 16) & 255;
		const green = (hexInt >> 8) & 255;
		const blue = hexInt & 255;
		return [red, green, blue];
	}

	function initCanvas() {
		resizeCanvas();
		drawParticles();
	}

	function onMouseMove() {
		if (canvasRef) {
			const rect = canvasRef.getBoundingClientRect();
			const { w, h } = canvasSize;
			const x = $mousePosition.x - rect.left - w / 2;
			const y = $mousePosition.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.x = x;
				mouse.y = y;
			}
		}
	}

	function resizeCanvas() {
		if (canvasContainerRef && canvasRef && context) {
			circles = [];
			canvasSize.w = canvasContainerRef.offsetWidth;
			canvasSize.h = canvasContainerRef.offsetHeight;
			canvasRef.width = canvasSize.w * dpr;
			canvasRef.height = canvasSize.h * dpr;
			canvasRef.style.width = `${canvasSize.w}px`;
			canvasRef.style.height = `${canvasSize.h}px`;
			context.scale(dpr, dpr);
		}
	}

	function circleParams() {
		const x = Math.floor(Math.random() * canvasSize.w);
		const y = Math.floor(Math.random() * canvasSize.h);
		const translateX = 0;
		const translateY = 0;
		const size = Math.floor(Math.random() * 2) + 1;
		const alpha = 0;
		const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
		const dx = (Math.random() - 0.5) * 0.2;
		const dy = (Math.random() - 0.5) * 0.2;
		const magnetism = 0.1 + Math.random() * 4;
		return {
			x,
			y,
			translateX,
			translateY,
			size,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism
		};
	}

	const rgb = hexToRgb(color);

	/**
	 * @param {{ x: any; y: any; translateX: any; translateY: any; size: any; alpha: any; targetAlpha?: number; dx?: number; dy?: number; magnetism?: number; }} circle
	 */
	function drawCircle(circle, update = false) {
		if (context) {
			const { x, y, translateX, translateY, size, alpha } = circle;
			context.translate(translateX, translateY);
			context.beginPath();
			context.arc(x, y, size, 0, 2 * Math.PI);
			context.fillStyle = `rgba(${rgb.join(', ')}, ${alpha})`;
			context.fill();
			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (!update) {
				circles.push(circle);
			}
		}
	}

	function clearContext() {
		if (context) {
			context.clearRect(0, 0, canvasSize.w, canvasSize.h);
		}
	}

	function drawParticles() {
		clearContext();
		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
			const circle = circleParams();
			drawCircle(circle);
		}
	}

	/**
	 * @param {number} value
	 * @param {number} start1
	 * @param {number} end1
	 * @param {number} start2
	 * @param {number} end2
	 */
	function remapValue(value, start1, end1, start2, end2) {
		const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
		return remapped > 0 ? remapped : 0;
	}

	function animate() {
		clearContext();
		circles.forEach((circle, i) => {
			const edge = [
				circle.x + circle.translateX - circle.size,
				canvasSize.w - circle.x - circle.translateX - circle.size,
				circle.y + circle.translateY - circle.size,
				canvasSize.h - circle.y - circle.translateY - circle.size
			];
			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
			if (remapClosestEdge > 1) {
				circle.alpha += 0.02;
				if (circle.alpha > circle.targetAlpha) {
					circle.alpha = circle.targetAlpha;
				}
			} else {
				circle.alpha = circle.targetAlpha * remapClosestEdge;
			}
			circle.x += circle.dx + vx;
			circle.y += circle.dy + vy;
			circle.translateX += (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
			circle.translateY += (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;
			if (
				circle.x < -circle.size ||
				circle.x > canvasSize.w + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvasSize.h + circle.size
			) {
				circles.splice(i, 1);
				const newCircle = circleParams();
				drawCircle(newCircle);
			} else {
				drawCircle(
					{
						...circle,
						x: circle.x,
						y: circle.y,
						translateX: circle.translateX,
						translateY: circle.translateY,
						alpha: circle.alpha
					},
					true
				);
			}
		});
		setTimeout(() => {
			requestAnimationFrame(animate);
		}, 1000 / 60); // Limit the frame rate to 60 FPS
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);

		if (canvasRef) {
			context = canvasRef?.getContext('2d');
		}
		initCanvas();
		animate();
		window.addEventListener('resize', initCanvas);

		return () => {
			window.removeEventListener('resize', initCanvas);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	beforeUpdate(() => {
		onMouseMove();
	});

	onDestroy(() => {
		if (canvasRef) {
			window.removeEventListener('resize', initCanvas);
		}
	});
</script>

<div class={className} bind:this={canvasContainerRef} aria-hidden="true">
	<canvas bind:this={canvasRef}></canvas>
</div>
