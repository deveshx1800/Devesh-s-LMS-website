import { useState, useEffect } from "react";
import "./App.css";
import animeLogo from "./assets/anime-logo.png";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

const [newBook, setNewBook] = useState({
  title: "",
  author: "",
  isbn: "",
  date: "",
});

  const [books, setBooks] = useState(() => {
  const savedBooks = localStorage.getItem("books");
  return savedBooks ? JSON.parse(savedBooks) : [
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      isbn: "978-0201616224",
      date: "2021-10-30",
      available: true,
    },
    {
      title: "Design Patterns",
      author: "Erich Gamma",
      isbn: "978-0201633610",
      date: "1994-10-31",
      available: false,
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      date: "2008-08-01",
      available: true,
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      isbn: "978-0735211292",
      date: "2018-10-16",
      available: true,
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262046305",
      date: "2022-04-05",
      available: true,
    },
  ];
});
useEffect(() => {
  localStorage.setItem("books", JSON.stringify(books));
}, [books]);

  const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");

  return savedStudents
    ? JSON.parse(savedStudents)
    : [
        { name: "Rahul Sharma", id: "ST001" },
        { name: "Ananya Singh", id: "ST002" },
        { name: "Arjun Mehta", id: "ST003" },
      ];
});
useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);


const [showAddStudent, setShowAddStudent] = useState(false);

const [newStudent, setNewStudent] = useState({
  name: "",
  id: "",
});

const [editingStudent, setEditingStudent] = useState(null);

const [librarians, setLibrarians] = useState(() => {
  const savedLibrarians = localStorage.getItem("librarians");

  return savedLibrarians
    ? JSON.parse(savedLibrarians)
    : [
        { name: "Priya Verma", role: "Head Librarian" },
        { name: "Amit Kumar", role: "Assistant Librarian" },
        { name: "Neha Singh", role: "Library Staff" },
      ];
});
useEffect(() => {
  localStorage.setItem("librarians", JSON.stringify(librarians));
}, [librarians]);

const [showAddLibrarian, setShowAddLibrarian] = useState(false);

const [newLibrarian, setNewLibrarian] = useState({
  name: "",
  role: "",
});

const [editingLibrarian, setEditingLibrarian] = useState(null);
const [newspapers, setNewspapers] = useState(() => {
  const savedNewspapers = localStorage.getItem("newspapers");

  return savedNewspapers
    ? JSON.parse(savedNewspapers)
    : [
        { name: "The Times of India", detail: "Daily Newspaper" },
        { name: "The Hindu", detail: "Daily Newspaper" },
        { name: "Hindustan Times", detail: "Daily Newspaper" },
      ];
});

useEffect(() => {
  localStorage.setItem("newspapers", JSON.stringify(newspapers));
}, [newspapers]);

const [showAddNewspaper, setShowAddNewspaper] = useState(false);

const [newNewspaper, setNewNewspaper] = useState({
  name: "",
  detail: "",
});

const [editingNewspaper, setEditingNewspaper] = useState(null);
const [magazines, setMagazines] = useState(() => {
  const savedMagazines = localStorage.getItem("magazines");

  return savedMagazines
    ? JSON.parse(savedMagazines)
    : [
        { name: "National Geographic", detail: "Monthly Magazine" },
        { name: "TIME", detail: "News Magazine" },
        { name: "Forbes", detail: "Business Magazine" },
      ];
});

useEffect(() => {
  localStorage.setItem("magazines", JSON.stringify(magazines));
}, [magazines]);

const [showAddMagazine, setShowAddMagazine] = useState(false);

const [newMagazine, setNewMagazine] = useState({
  name: "",
  detail: "",
});

const [editingMagazine, setEditingMagazine] = useState(null);
const [mangas, setMangas] = useState(() => {
  const savedMangas = localStorage.getItem("mangas");

  return savedMangas
    ? JSON.parse(savedMangas)
    : [
        { name: "One Piece Vol. 1", detail: "Eiichiro Oda" },
        { name: "Naruto Vol. 1", detail: "Masashi Kishimoto" },
        { name: "Death Note Vol. 1", detail: "Tsugumi Ohba" },
      ];
});

useEffect(() => {
  localStorage.setItem("mangas", JSON.stringify(mangas));
}, [mangas]);
useEffect(() => {
  const extraMangas = [
    { name: "Demon Slayer Vol. 1", detail: "Koyoharu Gotouge" },
    { name: "Bleach Vol. 1", detail: "Tite Kubo" },
    { name: "Jujutsu Kaisen Vol. 1", detail: "Gege Akutami" },
    { name: "My Hero Academia Vol. 1", detail: "Kohei Horikoshi" },
    { name: "Chainsaw Man Vol. 1", detail: "Tatsuki Fujimoto" },
    { name: "Attack on Titan Vol. 1", detail: "Hajime Isayama" },
    { name: "Dragon Ball Vol. 1", detail: "Akira Toriyama" },
  ];

  setMangas((current) => {
    const missing = extraMangas.filter(
      (extra) => !current.some((manga) => manga.name === extra.name)
    );

    return missing.length ? [...current, ...missing] : current;
  });
}, []);

const [showAddManga, setShowAddManga] = useState(false);

const [newManga, setNewManga] = useState({
  name: "",
  detail: "",
});

const [editingManga, setEditingManga] = useState(null);
const toggleBorrow = (title) => {
  setBooks(
    books.map((book) =>
      book.title === title
        ? { ...book, available: !book.available }
        : book
    )
  );
};
const deleteBook = (title) => {
  setBooks(books.filter((book) => book.title !== title));
};

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.isbn}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">LMS</div>

          <h1>Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to manage your library
          </p>

          <label>Email Address</label>
          <input
  type="email"
  placeholder="admin@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <label>Password</label>
          <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <span>Forgot password?</span>
          </div>

          <button
            className="signin-btn"
            onClick={() => {
  if (email === "admin@example.com" && password === "admin123") {
    setLoggedIn(true);
  } else {
    alert("Invalid email or password");
  }
}}
          >
            Sign In
          </button>

          <p className="login-footer">
            Library Management System
          </p>
        </div>
      </div>
    );
  }

  const NavButton = ({ name, icon, target }) => (
    <button
      className={page === target ? "nav-active" : ""}
      onClick={() => setPage(target)}
    >
      <span>{icon}</span>
      {name}
    </button>
  );

  const Dashboard = () => (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="welcome-small">Library Management System</p>
          <h1>Dashboard</h1>
        </div>

        <div className="profile">
          <div className="avatar">A</div>
          <div>
            <strong>Admin</strong>
            <p>Administrator</p>
          </div>
        </div>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span>📚</span>
          <div>
            <h2>{books.length}</h2>
            <p>Total Books</p>
          </div>
        </div>

        <div className="stat-card">
          <span>🎓</span>
          <div>
            <h2>{students.length}</h2>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <span>👤</span>
          <div>
            <h2>{librarians.length}</h2>
            <p>Librarians</p>
          </div>
        </div>

        <div className="stat-card">
          <span>📖</span>
          <div>
            <h2>{books.filter((book) => !book.available).length}</h2>
            <p>Active Borrows</p>
          </div>
        </div>
      </section>

      <section className="publication-stats">
        <div className="publication-card">
          <span>📰</span>
          <div>
            <p>NEWSPAPERS</p>
            <h2>{newspapers.length}</h2>
          </div>
        </div>

        <div className="publication-card">
          <span>🗞️</span>
          <div>
            <p>MAGAZINES</p>
            <h2>{magazines.length}</h2>
          </div>
        </div>

        <div className="publication-card">
          <span>📕</span>
          <div>
            <p>MANGA</p>
            <h2>{mangas.length}</h2>
          </div>
        </div>
      </section>

      <h2 className="section-title">Library Overview</h2>

      <section className="overview">
        <div className="overview-card">
          <div className="overview-heading">
            <span>Book Availability</span>
            <strong>
  {books.filter((book) => book.available).length} / {books.length}
</strong>
          </div>

          <div className="progress">
            <div
  style={{
    width: `${
      books.length
        ? (books.filter((book) => book.available).length / books.length) * 100
        : 0
    }%`,
  }}
></div>
          </div>

          <p>
  {books.length
    ? Math.round(
        (books.filter((book) => book.available).length / books.length) * 100
      )
    : 0}
  % of books are currently available to borrow.
</p>
        </div>

        <div className="overview-card">
          <div className="overview-heading">
            <span>Books Returned</span>
            <strong>14 / 20</strong>
          </div>

          <div className="progress">
            <div style={{ width: "70%" }}></div>
          </div>

          <p>70% of borrowed books have been returned.</p>
        </div>
      </section>

      <section className="activity-section">
        <h2>Recent Activity</h2>

        <div className="activity">
          <span>📚</span>
          <div>
            <strong>Clean Code</strong>
            <p>Borrowed by Rahul Sharma</p>
          </div>
          <span>Today</span>
        </div>

        <div className="activity">
          <span>↩️</span>
          <div>
            <strong>The Pragmatic Programmer</strong>
            <p>Returned by Ananya Singh</p>
          </div>
          <span>Yesterday</span>
        </div>

        <div className="activity">
          <span>📕</span>
          <div>
            <strong>One Piece Vol. 1</strong>
            <p>Added to Manga collection</p>
          </div>
          <span>2 days ago</span>
        </div>
      </section>
    </div>
  );

  const Home = () => (
    <div className="home-page">
      <div className="hero">
        <p>Library Management System</p>
        <h1>Welcome back, Admin</h1>
        <p>
          Manage books, students, newspapers, magazines and manga
          from one simple library system.
        </p>

        <button onClick={() => setPage("books")}>
          Browse Books
        </button>
      </div>

      <h2 className="section-title">Featured Collections</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-cover">📚</div>
          <h3>Books</h3>
          <p>Browse and manage the library book collection.</p>
          <button onClick={() => setPage("books")}>
            View Books
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-cover">📰</div>
          <h3>Newspapers</h3>
          <p>Manage daily newspapers and publications.</p>
          <button onClick={() => setPage("newspapers")}>
            View Newspapers
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-cover">📕</div>
          <h3>Manga</h3>
          <p>Explore and manage the manga collection.</p>
          <button onClick={() => setPage("manga")}>
            View Manga
          </button>
        </div>
      </div>
    </div>
  );

  const Books = () => (
    <div className="books-page">
      <div className="page-heading">
        <div>
          <p className="welcome-small">Library Collection</p>
          <h1>Books</h1>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowAddBook(true)}
        >
          + Add New Book
        </button>

        {showAddBook && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Book Title"
      value={newBook.title}
      onChange={(e) =>
        setNewBook({ ...newBook, title: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Author"
      value={newBook.author}
      onChange={(e) =>
        setNewBook({ ...newBook, author: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="ISBN"
      value={newBook.isbn}
      onChange={(e) =>
        setNewBook({ ...newBook, isbn: e.target.value })
      }
    />

    <input
      type="date"
      value={newBook.date}
      onChange={(e) =>
        setNewBook({ ...newBook, date: e.target.value })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        if (!newBook.title || !newBook.author || !newBook.isbn || !newBook.date) {
          alert("Please fill in all fields.");
          return;
        }

        setBooks([
          ...books,
          {
            ...newBook,
            available: true,
          },
        ]);

        setNewBook({
          title: "",
          author: "",
          isbn: "",
          date: "",
        });

        setShowAddBook(false);
      }}
    >
      Add Book
    </button>

    <button
      className="cancel-btn"
      onClick={() => setShowAddBook(false)}
    >
      Cancel
    </button>
  </div>
)}

{editingBook && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Book Title"
      value={editingBook.title}
      onChange={(e) =>
        setEditingBook({
          ...editingBook,
          title: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Author"
      value={editingBook.author}
      onChange={(e) =>
        setEditingBook({
          ...editingBook,
          author: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="ISBN"
      value={editingBook.isbn}
      onChange={(e) =>
        setEditingBook({
          ...editingBook,
          isbn: e.target.value,
        })
      }
    />

    <input
      type="date"
      value={editingBook.date}
      onChange={(e) =>
        setEditingBook({
          ...editingBook,
          date: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        setBooks(
          books.map((book) =>
            book.isbn === editingBook.originalIsbn
              ? {
                  ...editingBook,
                  originalIsbn: undefined,
                }
              : book
          )
        );

        setEditingBook(null);
      }}
    >
      Save Changes
    </button>

    <button
      className="cancel-btn"
      onClick={() => setEditingBook(null)}
    >
      Cancel
    </button>
  </div>
)}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title, author or ISBN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Published Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={index}>
                <td>
                  <strong>{book.title}</strong>
                </td>

                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.date}</td>

                <td>
                  <span
                    className={
                      book.available
                        ? "available"
                        : "borrowed"
                    }
                  >
                    {book.available
                      ? "Available"
                      : "Borrowed"}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    <button
  className="borrow-btn"
  onClick={() => toggleBorrow(book.title)}
>
  {book.available ? "Borrow" : "Return"}
</button>
                    <button
  className="edit-btn"
  onClick={() => {
    const originalIndex = books.findIndex(
      (b) => b.isbn === book.isbn
    );

    setEditingBook({
  ...book,
  originalIsbn: book.isbn,
});
  }}
>
  Edit
</button>

                    <button
  className="delete-btn"
  onClick={() => deleteBook(book.title)}
>
  Delete
</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBooks.length === 0 && (
          <p className="empty-message">No books found.</p>
        )}
      </div>
    </div>
  );

  const CollectionPage = ({ title, icon, description, items }) => (
    <>
      <div className="page-heading">
        <div>
          <p className="welcome-small">Library Collection</p>
          <h1>{title}</h1>
        </div>

        <button
          className="add-btn"
          onClick={() => alert(`Add ${title} coming next!`)}
        >
          + Add New
        </button>
      </div>

      <div className="collection-intro">
        <div className="collection-icon">{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="collection-grid">
        {items.map((item, index) => (
          <div className="collection-card" key={index}>
            <div className="collection-card-icon">{icon}</div>
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
            <span className="available">Available</span>
          </div>
        ))}
      </div>
    </>
  );

const Students = () => (
  <div className="students-page">
    <div className="page-heading">
      <div>
        <p className="welcome-small">Library Members</p>
        <h1>Students</h1>
      </div>

      <button
        className="add-btn"
        onClick={() => setShowAddStudent(true)}
      >
        + Add New Student
      </button>
    </div>

    {showAddStudent && (
      <div className="add-book-form">
        <input
          type="text"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Student ID"
          value={newStudent.id}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              id: e.target.value,
            })
          }
        />

        <button
          className="add-btn"
          onClick={() => {
            if (!newStudent.name || !newStudent.id) {
              alert("Please fill in all fields.");
              return;
            }

            setStudents([...students, newStudent]);
            setNewStudent({ name: "", id: "" });
            setShowAddStudent(false);
          }}
        >
          Add Student
        </button>

        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddStudent(false);
            setNewStudent({ name: "", id: "" });
          }}
        >
          Cancel
        </button>
      </div>
    )}
    {editingStudent && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Student Name"
      value={editingStudent.name}
      onChange={(e) =>
        setEditingStudent({
          ...editingStudent,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Student ID"
      value={editingStudent.id}
      onChange={(e) =>
        setEditingStudent({
          ...editingStudent,
          id: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        setStudents(
          students.map((student, index) =>
            index === editingStudent.index
              ? {
                  name: editingStudent.name,
                  id: editingStudent.id,
                }
              : student
          )
        );

        setEditingStudent(null);
      }}
    >
      Save Changes
    </button>

    <button
      className="cancel-btn"
      onClick={() => setEditingStudent(null)}
    >
      Cancel
    </button>
  </div>
)}

    <h2>🎓 Students</h2>
    <p>Manage students registered with the library.</p>

    <div className="collection-grid">
      {students.map((student, index) => (
        <div className="collection-card" key={student.id}>
          <div className="collection-card-icon">🎓</div>

          <h3>{student.name}</h3>
          <p>Student ID: {student.id}</p>

          <span className="available">Active</span>
          <button
  className="edit-btn"
  onClick={() =>
    setEditingStudent({
      ...student,
      index: index,
    })
  }
>
  Edit
</button>
<button
  className="delete-btn"
  onClick={() => {
    setStudents(
      students.filter((_, studentIndex) => studentIndex !== index)
    );
  }}
>
  Delete
</button>
        </div>
      ))}
    </div>
  </div>
);  

  const Librarians = () => (
  <>
    <div className="page-heading">
      <div>
        <p className="welcome-small">Library Staff</p>
        <h1>Librarians</h1>
      </div>

      <button
        className="add-btn"
        onClick={() => setShowAddLibrarian(true)}
      >
        + Add New Librarian
      </button>
    </div>
    {showAddLibrarian && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Librarian Name"
      value={newLibrarian.name}
      onChange={(e) =>
        setNewLibrarian({
          ...newLibrarian,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Role"
      value={newLibrarian.role}
      onChange={(e) =>
        setNewLibrarian({
          ...newLibrarian,
          role: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        if (!newLibrarian.name || !newLibrarian.role) {
          alert("Please fill in all fields.");
          return;
        }

        setLibrarians([...librarians, newLibrarian]);

        setNewLibrarian({
          name: "",
          role: "",
        });

        setShowAddLibrarian(false);
      }}
    >
      Add Librarian
    </button>

    <button
      className="cancel-btn"
      onClick={() => setShowAddLibrarian(false)}
    >
      Cancel
    </button>
  </div>
)}
{editingLibrarian && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Librarian Name"
      value={editingLibrarian.name}
      onChange={(e) =>
        setEditingLibrarian({
          ...editingLibrarian,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Role"
      value={editingLibrarian.role}
      onChange={(e) =>
        setEditingLibrarian({
          ...editingLibrarian,
          role: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        const updatedLibrarians = [...librarians];

        updatedLibrarians[editingLibrarian.index] = {
          name: editingLibrarian.name,
          role: editingLibrarian.role,
        };

        setLibrarians(updatedLibrarians);
        setEditingLibrarian(null);
      }}
    >
      Save Changes
    </button>

    <button
      className="cancel-btn"
      onClick={() => setEditingLibrarian(null)}
    >
      Cancel
    </button>
  </div>
)}

    <h2>📚 Librarians</h2>
    <p>Manage library staff and administrators.</p>

    <div className="collection-grid">
      {librarians.map((librarian, index) => (
        <div className="collection-card" key={index}>
          <div className="collection-card-content">
            <span>👤</span>
            <button
  className="edit-btn"
  onClick={() =>
    setEditingLibrarian({
      ...librarian,
      index: index,
    })
  }
>
  Edit
</button>
<button
  className="delete-btn"
  onClick={() => {
    setLibrarians(
      librarians.filter(
        (_, librarianIndex) => librarianIndex !== index
      )
    );
  }}
>
  Delete
</button>

            <h3>{librarian.name}</h3>

            <p>{librarian.role}</p>

            <span className="available">Active</span>
          </div>
        </div>
      ))}
    </div>
  </>
);

  const Newspapers = () => (
  <>
    <div className="page-heading">
      <div>
        <p className="welcome-small">Library Collection</p>
        <h1>Newspapers</h1>
      </div>

      <button
        className="add-btn"
        onClick={() => setShowAddNewspaper(true)}
      >
        + Add New Newspaper
      </button>
    </div>
    {showAddNewspaper && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Newspaper Name"
      value={newNewspaper.name}
      onChange={(e) =>
        setNewNewspaper({
          ...newNewspaper,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Type (e.g. Daily Newspaper)"
      value={newNewspaper.detail}
      onChange={(e) =>
        setNewNewspaper({
          ...newNewspaper,
          detail: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        if (!newNewspaper.name || !newNewspaper.detail) {
          alert("Please fill in all fields.");
          return;
        }

        setNewspapers([...newspapers, newNewspaper]);

        setNewNewspaper({
          name: "",
          detail: "",
        });

        setShowAddNewspaper(false);
      }}
    >
      Add Newspaper
    </button>

    <button
      className="cancel-btn"
      onClick={() => setShowAddNewspaper(false)}
    >
      Cancel
    </button>
  </div>
)}
{editingNewspaper && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Newspaper Name"
      value={editingNewspaper.name}
      onChange={(e) =>
        setEditingNewspaper({
          ...editingNewspaper,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Type"
      value={editingNewspaper.detail}
      onChange={(e) =>
        setEditingNewspaper({
          ...editingNewspaper,
          detail: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        const updatedNewspapers = [...newspapers];

        updatedNewspapers[editingNewspaper.index] = {
          name: editingNewspaper.name,
          detail: editingNewspaper.detail,
        };

        setNewspapers(updatedNewspapers);
        setEditingNewspaper(null);
      }}
    >
      Save Changes
    </button>

    <button
      className="cancel-btn"
      onClick={() => setEditingNewspaper(null)}
    >
      Cancel
    </button>
  </div>
)}
    <h2>📰 Newspapers</h2>
    <p>Browse and manage daily newspaper publications.</p>

    <div className="collection-grid">
      {newspapers.map((newspaper, index) => (
        <div className="collection-card" key={index}>
          <div className="collection-card-content">
            <span>📰</span>

            <h3>{newspaper.name}</h3>

            <p>{newspaper.detail}</p>

            <span className="available">Available</span>
            <button
  className="edit-btn"
  onClick={() =>
    setEditingNewspaper({
      ...newspaper,
      index: index,
    })
  }
>
  Edit
</button>
<button
  className="delete-btn"
  onClick={() => {
    setNewspapers(
      newspapers.filter((_, newspaperIndex) => newspaperIndex !== index)
    );
  }}
>
  Delete
</button>
          </div>
        </div>
      ))}
    </div>
  </>
);

  const Magazines = () => (
  <>
    <div className="page-heading">
      <div>
        <p className="welcome-small">Library Collection</p>
        <h1>Magazines</h1>
      </div>

      <button
        className="add-btn"
        onClick={() => setShowAddMagazine(true)}
      >
        + Add New Magazine
      </button>
    </div>
    {showAddMagazine && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Magazine Name"
      value={newMagazine.name}
      onChange={(e) =>
        setNewMagazine({
          ...newMagazine,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Type (e.g. Monthly Magazine)"
      value={newMagazine.detail}
      onChange={(e) =>
        setNewMagazine({
          ...newMagazine,
          detail: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        if (!newMagazine.name || !newMagazine.detail) {
          alert("Please fill in all fields.");
          return;
        }

        setMagazines([...magazines, newMagazine]);

        setNewMagazine({
          name: "",
          detail: "",
        });

        setShowAddMagazine(false);
      }}
    >
      Add Magazine
    </button>

    <button
      className="cancel-btn"
      onClick={() => setShowAddMagazine(false)}
    >
      Cancel
    </button>
  </div>
)}
{editingMagazine && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Magazine Name"
      value={editingMagazine.name}
      onChange={(e) =>
        setEditingMagazine({
          ...editingMagazine,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Type"
      value={editingMagazine.detail}
      onChange={(e) =>
        setEditingMagazine({
          ...editingMagazine,
          detail: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        const updatedMagazines = [...magazines];

        updatedMagazines[editingMagazine.index] = {
          name: editingMagazine.name,
          detail: editingMagazine.detail,
        };

        setMagazines(updatedMagazines);
        setEditingMagazine(null);
      }}
    >
      Save Changes
    </button>

    <button
      className="cancel-btn"
      onClick={() => setEditingMagazine(null)}
    >
      Cancel
    </button>
  </div>
)}
    <h2>📖 Magazines</h2>
    <p>Manage magazines available in the library.</p>

    <div className="collection-grid">
      {magazines.map((magazine, index) => (
        <div className="collection-card" key={index}>
          <div className="collection-card-content">
            <span>📖</span>

            <h3>{magazine.name}</h3>
            <p>{magazine.detail}</p>

            <span className="available">Available</span>
            <button
  className="edit-btn"
  onClick={() =>
    setEditingMagazine({
      ...magazine,
      index: index,
    })
  }
>
  Edit
</button>
<button
  className="delete-btn"
  onClick={() => {
    setMagazines(
      magazines.filter((_, magazineIndex) => magazineIndex !== index)
    );
  }}
>
  Delete
</button>
          </div>
        </div>
      ))}
    </div>
  </>
);

  const Manga = () => (
  <div className="manga-page">
    <div className="page-heading">
      <div>
        <p className="welcome-small">Library Collection</p>
        <h1>Manga</h1>
      </div>

      <button
        className="add-btn"
        onClick={() => setShowAddManga(true)}
      >
        + Add New Manga
      </button>
    </div>
    {showAddManga && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Manga Name"
      value={newManga.name}
      onChange={(e) =>
        setNewManga({
          ...newManga,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Author"
      value={newManga.detail}
      onChange={(e) =>
        setNewManga({
          ...newManga,
          detail: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        if (!newManga.name || !newManga.detail) {
          alert("Please fill in all fields.");
          return;
        }

        setMangas([...mangas, newManga]);

        setNewManga({
          name: "",
          detail: "",
        });

        setShowAddManga(false);
      }}
    >
      Add Manga
    </button>

    <button
      className="cancel-btn"
      onClick={() => setShowAddManga(false)}
    >
      Cancel
    </button>
  </div>
)}
{editingManga && (
  <div className="add-book-form">
    <input
      type="text"
      placeholder="Manga Name"
      value={editingManga.name}
      onChange={(e) =>
        setEditingManga({
          ...editingManga,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Author"
      value={editingManga.detail}
      onChange={(e) =>
        setEditingManga({
          ...editingManga,
          detail: e.target.value,
        })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        const updatedMangas = [...mangas];

        updatedMangas[editingManga.index] = {
          name: editingManga.name,
          detail: editingManga.detail,
        };

        setMangas(updatedMangas);
        setEditingManga(null);
      }}
    >
      Save Changes
    </button>

    <button
      className="cancel-btn"
      onClick={() => setEditingManga(null)}
    >
      Cancel
    </button>
  </div>
)}
    <h2>📕 Manga Collection</h2>
    <p>Browse and manage the library manga collection.</p>

    <div className="collection-grid">
      {mangas.map((manga, index) => (
        <div className="collection-card" key={index}>
          <div className="collection-card-content">
            <span>📕</span>

            <h3>{manga.name}</h3>
            <p>{manga.detail}</p>

            <span className="available">Available</span>
            <button
  className="edit-btn"
  onClick={() =>
    setEditingManga({
      ...manga,
      index: index,
    })
  }
>
  Edit
</button>
<button
  className="delete-btn"
  onClick={() => {
    setMangas(
      mangas.filter((_, mangaIndex) => mangaIndex !== index)
    );
  }}
>
  Delete
</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  const About = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="welcome-small">Information</p>
          <h1>About Us</h1>
        </div>
      </div>

      <div className="about-card">
        <h2>Library Management System</h2>

        <p>
          <p>
  The Library Management System is designed to simplify the management
  of books, students, librarians and publications through a single,
  easy-to-use platform.
</p>
        </p>

        <p>
         <p>
  It provides features for managing library records, searching collections,
  tracking book availability and maintaining library data efficiently.
</p>
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-cover">📚</div>
          <h3>Catalog Management</h3>
          <p>Manage books and publications from one dashboard.</p>
        </div>

        <div className="feature-card">
          <div className="feature-cover">👥</div>
          <h3>People</h3>
          <p>Manage students and librarians.</p>
        </div>

        <div className="feature-card">
          <div className="feature-cover">📰</div>
          <h3>Publications</h3>
          <p>Track newspapers, magazines and manga.</p>
        </div>
      </div>
    </>
  );

  const Contact = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="welcome-small">Get in touch</p>
          <h1>Contact Us</h1>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h2>Library Information</h2>

          <div className="contact-item">
            <span>📍</span>
            <div>
              <strong>Front Desk</strong>
              <p>Main Library Building, Room 101</p>
            </div>
          </div>

          <div className="contact-item">
            <span>☎️</span>
            <div>
              <strong>Phone</strong>
              <p>+91 82102 60802</p>
            </div>
          </div>

          <div className="contact-item">
            <span>✉️</span>
            <div>
              <strong>Email</strong>
              <p>idevesh18@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-card">
          <h2>Send a Message</h2>

          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Your Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Message</label>
          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button
            className="add-btn"
            onClick={() => alert("Message sent!")}
          >
            Send Message
          </button>
        </div>
      </div>
    </>
  );

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;

      case "books":
        return Books();

      case "students":
        return Students();

      case "librarians":
        return Librarians();

      case "newspapers":
        return Newspapers();

      case "magazines":
         return Magazines();

      case "manga":
        return Manga();

      case "about":
         return About();

      case "contact":
        return Contact();

      default:
        return Dashboard()
    }
  };

  return (
    <div className={`dashboard ${page}-active`}>
      <aside className={`sidebar ${page === "students" ? "students" : page === "librarians" ? "librarians" : ""}`}>
        <div className="sidebar-logo">
  <img src={animeLogo} alt="Library Logo" />
</div>
        <div className="library-name">Library System</div>

        <nav>
          <NavButton
            name="Home"
            icon="🏠"
            target="home"
          />

          <NavButton
            name="Dashboard"
            icon="📊"
            target="dashboard"
          />

          <NavButton
            name="Books"
            icon="📚"
            target="books"
          />

          <NavButton
            name="Students"
            icon="🎓"
            target="students"
          />

          <NavButton
            name="Librarians"
            icon="👤"
            target="librarians"
          />

          <NavButton
            name="Newspapers"
            icon="📰"
            target="newspapers"
          />

          <NavButton
            name="Magazines"
            icon="📰"
            target="magazines"
          />

          <NavButton
            name="Manga"
            icon="📕"
            target="manga"
          />

          <NavButton
            name="About Us"
            icon="ⓘ"
            target="about"
          />

          <NavButton
            name="Contact Us"
            icon="✉️"
            target="contact"
          />
        </nav>

        <button
          className="logout-btn"
          onClick={() => {
            setLoggedIn(false);
            setPage("dashboard");
          }}
        >
          Log Out
        </button>
      </aside>

      <main className="dashboard-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;