// Event listeners 
document.getElementById('book-form').addEventListener('submit', function (e) {
	const ui = new UI();

	if (ui.title.value === '' || ui.author.value === '' || (ui.isbn.value === '' || isNaN(Number(ui.isbn.value)))) {
		ui.showAlert('Please fill out all inputs with valid info', 'error');
		e.preventDefault();
		return;
	}

	ui.addBookToList();
	ui.clearInputValues();
	ui.showAlert('Your book has been successfully added.', 'success');
	e.preventDefault();
})



// Book Constructor 
const Book = function (title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI Constructor 
const UI = function () {
	this.title = document.getElementById('title');
	this.author = document.getElementById('author');
	this.isbn = document.getElementById('isbn');
	this.bookList = document.getElementById('book-list');
	this.container = document.querySelector('.container');
	this.bookForm = document.getElementById('book-form');
}

UI.prototype.addBookToList = function (savedBook = null) {
	const book = Boolean(savedBook) ? savedBook : new Book(this.title.value, this.author.value, this.isbn.value);
	const newBookEntry = document.createElement('tr');
	newBookEntry.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
	`;

	this.bookList.appendChild(newBookEntry);
}

UI.prototype.clearInputValues = function () {
	this.title.value = '';
	this.author.value = '';
	this.isbn.value = '';
}

UI.prototype.showAlert = function (message, className) {
	const alert = document.createElement('div');
	alert.className = `alert ${className}`;
	alert.textContent = message;

	this.container.insertBefore(alert, this.bookForm);

	setTimeout(() => {
		const ui = new UI();
		ui.container.removeChild(alert);
	}, 2500);
}