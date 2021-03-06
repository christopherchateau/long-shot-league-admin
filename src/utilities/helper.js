export const validatePtsInput = input => !input.toString().length || +input < 0

export const formatApiData = (paths, data) =>
	data.reduce(
		(acc, d, i) => {
			d.error
				? acc.errors.push(d.error)
				: (acc[`${paths[i]}Data`] = sortByName(d))

			return acc
		},
		{ errors: [] }
	)

const sortByName = input => input.sort((a, b) => (a.name < b.name ? -1 : 1))
