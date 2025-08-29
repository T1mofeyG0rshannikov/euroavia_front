export function classNames(cls, additional=[], mods={}) {
	return [cls,
		...additional,
		...Object.entries(mods)
			.filter(([_, value]) => Boolean(value))
			.map(([cls]) => cls),

	].join(' ')
}