import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const store: any = {};

function useStateyState<T>(key: string) {
	const [_, forceUpdate] = useState(0);

	useEffect(() => {
		const subscriptionId = nanoid();

		store[key].subscriptions = {
			...store[key].subscriptions,
			[subscriptionId]: () => forceUpdate(_ ? 0 : 1),
		};

		return () => {
			delete store[key].subscriptions[subscriptionId];
		};
	}, [_]);

	return [store[key].value, store[key].setValue, store[key].getValue] as [
		T,
		(newValue: T | ((currentValue: T) => T)) => void,
		() => T,
	];
}

export function createState<T>(
	defaultValue: T,
): () => [T, (newValue: T | ((currentValue: T) => T)) => void, () => T];

export function createState(): () => [
	any,
	(newValue: any | ((currentValue: any) => any)) => void,
	() => any,
];

export function createState(defaultValue?: any): any {
	const key = nanoid();

	store[key] = {
		value: defaultValue,
		subscriptions: {},
		setValue: (newValue: any) => {
			store[key].value =
				typeof newValue === 'function' ? newValue(store[key].value) : newValue;

			Object.values(
				store[key].subscriptions,
			).forEach((updateSubscribers: any) => updateSubscribers());
		},
		getValue: () => store[key].value,
	};

	return () => useStateyState(key);
}
