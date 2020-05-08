const resultEl = document.querySelector(".result");
const searchEl = document.querySelector("input");
const houseURL = "https://anapioficeandfire.com/api/houses/378";

let members = [];

const createAMemberEl = (member) => {
	const li = document.createElement("li");
	const { name, gender, born, died, culture } = member;

	li.innerHTML = `
        <p class="name">${name}</p>
        <p class="life">${born} – ${died}</p>
        <p class="gender"><strong>Gender: </strong>${gender}</p>
        <p class="culture"><strong>Culture: </strong>${culture}</p>
    `;

	return li;
};

const fetchData = async (url) => await fetch(url).then((response) => response.json());

const swornMembers = async () => {
	const urls = await fetchData(houseURL);

	return urls.swornMembers;
};

const getSwornMembersData = async () => {
	const swornURLs = await swornMembers();

	const memberPromises = swornURLs.map((url) => fetchData(url));

	members = await Promise.all(memberPromises);
};

const filterMembers = (members, query) =>
	members.filter((member) => member.name.toLowerCase().match(query));

const renderMembers = (members) => {
	resultEl.innerHTML = "";
	members.forEach((member) => {
		resultEl.appendChild(createAMemberEl(member));
	});
};

const init = async () => {
	await getSwornMembersData();
	renderMembers(members);

	searchEl.addEventListener("keyup", (event) => {
		const query = event.target.value.toLowerCase();
        const filteredMembers = filterMembers(members, query);
        
		renderMembers(filteredMembers);
	});
};

init();
