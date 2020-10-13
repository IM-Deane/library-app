// Source code for Project: Library project


// Book Factory
const bookFactory = (title, author, pages, read) => {
    // Public method
    const info =  () => {
        return (`${title} by ${author}; ${pages} pages; Completed: ${read}`);
    }
    // Change read status of book when called
    const toggleStatus = () => {
        if (read == true) {
            read = false;
        }
        else {
            read = true;
        }
    }

    return {title, author, pages, read, info, toggleStatus}
};


// Library Module
const library = (() => {

    const myShelf = document.getElementById('bookShelf');
    const memory = [];


    // Create new card
    const newCard = (book) => {
        
        const bookIndex = memory.indexOf(book);

        // Card information
        const card = document.createElement('div');
        card.classList.add("cards");
        // Card ID number corresponds to index number of book in memory
        card.id = `Book-${bookIndex}`;
        card.setAttribute("data-index", bookIndex)
        //card.setAttribute("data-read", book.read);
        
        // Book: Title
        const cardTitle = document.createElement('p');
        cardTitle.innerText = book.title;
        cardTitle.id = "card-title";
        cardTitle.classList.add("card-title");

        // Book: Author
        const cardAuthor = document.createElement('p');
        cardAuthor.innerText = `By ${book.author}`;
        cardAuthor.id = "card-author";
        cardAuthor.classList.add("card-author");

        // Book: Pages
        const pageNum = document.createElement('p');
        pageNum.innerText = `Pages: ${book.pages}`;
        pageNum.id = "card-pages";
        
        // Add basic info to card
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(pageNum);

        // Card checkbox and label
        const readLabel = document.createElement('label');
        readLabel.innerText = "Finished Reading";
        readLabel.id = "read-label";
        const readBox = document.createElement('input');
        readBox.id = "read-box";
        readBox.type = "checkbox";


        // Set initial value of checkbox
        if (book.read == true) {
            readBox.checked = true;
            card.classList.add('read');
        } else {
            readBox.checked = false;
        }

        // Update read status on checkbox click
        readBox.addEventListener('click', (e) => {

            if (e.target.checked == true) {
                book.read = false;
                card.classList.add("read");
            } else {
                book.read = true;
                card.classList.remove("read");
            }

        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "DELETE";
        deleteBtn.classList.add('buttons');
        // Remove book from page and memory on click
        deleteBtn.addEventListener('click', () => {
            let book = document.querySelector(`[data-index="${bookIndex}"]`);
            removeBook(book);
        });

        // Line break element
        const lineBreak = document.createElement('br');

        // Action box will hold elements that user can interact with
        const actionBox = document.createElement('div');
        actionBox.id = "action-box";
        // Add checkbox items and delete button to action box
        actionBox.appendChild(readBox);
        actionBox.appendChild(readLabel);
       // actionBox.appendChild(lineBreak);
        actionBox.appendChild(deleteBtn);


        // Add action box to main book card
        card.appendChild(actionBox);
        

        return card;
    }

    // Store book in memory
    const store = (book) => {
        memory.push(book);
    }


    // Add book to page
    const addBook = (book) => {
        store(book);
        myShelf.appendChild(newCard(book));
    }


    // Removes book from library (note parameter = parent node of current element)
    const removeBook = (book) => {
        memory.splice(book, 1);
        document.getElementById(`${book.id}`).remove();
    }

    return {addBook};

}) ();


// Demo Books; increase loop condition to artifically increase library
for (let count = 0; count < 1 ; count++) {
    library.addBook(bookFactory("Superman Is Overrated", "L.Luther", 1000, false));
    library.addBook(bookFactory("Outliers", "Malcolm Gladwell", 309, true));
    library.addBook(bookFactory("STAR WARS: DARTH PLAGUEIS", "James Luceno", 462, true));
}


const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
    // Reveal book entry form
    document.getElementById('book-form').classList.toggle('hidden');
    // Change button text depending on its state
    if (document.getElementById('book-form').className === 'hidden') {
        addBtn.innerText = '+ Add Book';
    } else {
        addBtn.innerText = '- Add Book';
    }
});


const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', () => {

    // Get value from each input and create new book
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read-status');

    // Validate entries
    if (title.value === "" ||
        author.value === "" ||
        pages.value === "") {
            alert("Invalid entry detected!\n" +
            "Please make sure Title, Author, and Pages fields are not blank.");
            return;
        }

    library.addBook(bookFactory(title.value, author.value, pages.value, read.checked));

    // Reset input fields
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
});

/************ LOCAL STORAGE *************/

// Check if container data is present already
function containerMemory() {
    if(!localStorage.getItem('containerData')) {
      // Data not present, save current people
      setPeople();
    } else {
      // Data is present, update current settings
      getPeople();
    }
  }
  
  
  // Save all current people in container
  function setPeople() {
    
    localStorage.setItem('containerData', document.getElementById('container').innerHTML);
  
    getPeople(); // Update container
  }
  
  
  // Update container to include all people found in storage
  function getPeople() {
    // Retrieve saved people from container
    let savedPeople = localStorage.getItem("containerData");
    // Update container
    document.getElementById('container').innerHTML = savedPeople;
  }
  
  