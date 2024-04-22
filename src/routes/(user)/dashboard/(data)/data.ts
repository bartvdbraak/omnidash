import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	CircleCheck,
	Circle,
	CircleX,
	CircleHelp,
	Timer
} from 'lucide-svelte';

export const labels = [
	{
		value: 'bug',
		label: 'Incident'
	},
	{
		value: 'feature',
		label: 'Change'
	},
	{
		value: 'documentation',
		label: 'Information'
	}
];

export const statuses = [
	{
		value: 'backlog',
		label: 'Backlog',
		icon: CircleHelp
	},
	{
		value: 'todo',
		label: 'Todo',
		icon: Circle
	},
	{
		value: 'in progress',
		label: 'In Progress',
		icon: Timer
	},
	{
		value: 'done',
		label: 'Done',
		icon: CircleCheck
	},
	{
		value: 'canceled',
		label: 'Canceled',
		icon: CircleX
	}
];

export const priorities = [
	{
		label: 'Low',
		value: 'low',
		icon: ArrowDown
	},
	{
		label: 'Medium',
		value: 'medium',
		icon: ArrowRight
	},
	{
		label: 'High',
		value: 'high',
		icon: ArrowUp
	}
];
