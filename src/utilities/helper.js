export const sortData = data => data.map(d => sortByName(d))

const sortByName = input => input.sort((a, b) => (a.name < b.name ? -1 : 1))
