export const sortData = data => data.map(d => Array.isArray(d) ? sortByName(d) : d)

const sortByName = input => input.sort((a, b) => (a.name < b.name ? -1 : 1))
