// Initialize an empty array to store the URLs
let urls = [];

// Function to fetch and load the JSON data
async function loadJSON() {
	try {
		const response = await fetch('resource/urls.json');
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		urls = data;
		displayURLs();
	} catch (error) {
		console.error('Error loading JSON data:', error);
	}
}

// Function to add a URL
function addURL() {
	const category = document.getElementById("category").value;
	const url = document.getElementById("url").value;

	if (category.trim() === "" || url.trim() === "") {
		alert("Please enter both category and URL.");
		return;
	}

	// Add the URL to the array
	urls.push({ category, url });

	// Clear the input fields
	document.getElementById("category").value = "";
	document.getElementById("url").value = "";

	// Display the updated list of URLs
	displayURLs();
}

// Function to display the list of URLs
function displayURLs() {
	const urlList = document.getElementById("urlList");
	urlList.innerHTML = "";

	urls.forEach((item, index) => {
		const li = document.createElement("li");
		li.innerHTML = `${item.category}: <a href="${item.url}" target="_blank">${item.url}</a> <button onclick="editURL(${index})">Edit</button> <button onclick="deleteURL(${index})">Delete</button>`;
		urlList.appendChild(li);
	});
}

// Function to edit a URL
function editURL(index) {
	const newCategory = prompt("Enter new category:", urls[index].category);
	const newURL = prompt("Enter new URL:", urls[index].url);

	if (newCategory !== null && newURL !== null) {
		urls[index].category = newCategory;
		urls[index].url = newURL;
		displayURLs();
	}
}

// Function to delete a URL
function deleteURL(index) {
	if (confirm("Are you sure you want to delete this URL?")) {
		urls.splice(index, 1);
		displayURLs();
	}
}

// Load JSON data when the page loads
window.addEventListener('load', loadJSON);