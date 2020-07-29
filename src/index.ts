import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const store: any = {};

export function createState<T>(
	defaultValue: T,
): {
	key: string;
	value: T;
};
export function createState(): {
	key: string;
	value: undefined;
};
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
	};

	return { key, value: store[key].value };
}

export function useStateyState<T>({ key }: { key: string; value: T }) {
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

	return [store[key].value, store[key].setValue] as [
		T,
		(newValue: T | ((currentValue: T) => T)) => void,
	];
}
