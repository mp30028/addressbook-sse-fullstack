const data = [
	{
		id : 2,
		firstname : "Alfred",
		lastname : "Deakin",
		dateOfBirth : "1856-08-03"
	},
	{
		id : 3,
		firstname : "Chris",
		lastname : "Watson",
		dateOfBirth : "1867-04-09"
	},
	{
		id : 4,
		firstname : "George",
		lastname : "Reid",
		dateOfBirth : "1845-02-25"
	},
	{
		id : 5,
		firstname : "Ben",
		lastname : "Black",
		dateOfBirth : "2020-12-01"
	},
	{
		id : 16,
		firstname : "Mike",
		lastname : "Tyson",
		dateOfBirth : "1965-03-23"
	},
	{
		id : 624,
		firstname : "Jon",
		lastname : "White",
		dateOfBirth : "2000-01-02"
	}
];

export function getAll(){
	return data;
};

export function getById(id) {
  return data.find(
    (person) => person.id === id
  );
}