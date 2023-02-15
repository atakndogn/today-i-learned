import { useState } from "react";
import "./style.css";

// supbase pwd: juFP1pAeNjOYrlSF

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [isShowForm, setIsShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);

  return (
    <>
      <Header isShowForm={isShowForm} setIsShowForm={setIsShowForm} />
      {isShowForm && (
        <NewFactForm setIsShowForm={setIsShowForm} setFacts={setFacts} />
      )}
      <main className="main">
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

function Header({ isShowForm, setIsShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned logo" />
        <h1>Today I Learned</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setIsShowForm((s) => (s = !s))}
      >
        {isShowForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setIsShowForm, setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new fact
    if (text && text.length <= 200 && isValidHttpUrl(source) && category) {
      // 3. Create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 10000000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };

      // 4. Add the new fact to the UI: add the fact to state
      setFacts((facts) => [newFact, ...facts]);

      // 5. Reset input fields
      setText("");
      setSource();
      setCategory();

      // 6. Close the form
      setIsShowForm(false);
    }
  }

  const categoryList = CATEGORIES.map((cat) => (
    <option key={cat.name} value={cat.name}>
      {cat.name.toUpperCase()}
    </option>
  ));

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose a category:</option>
        {categoryList}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((c) => (
          <li key={c.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  const factsList = facts.map((fact) => <Fact key={fact.id} factObj={fact} />);

  return (
    <section>
      <ul className="facts-list">{factsList}</ul>
      <p>There are {factsList.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ factObj }) {
  return (
    <li className="fact">
      <p>
        {factObj.text}
        <a
          className="source"
          href={factObj.source}
          rel="noreferrer"
          target="_blank"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (cat) => cat.name === factObj.category
          ).color,
        }}
      >
        {factObj.category}
      </span>
      <div className="vote-buttons">
        <button>
          👍 <strong>{factObj.votesInteresting}</strong>
        </button>
        <button>
          🤯 <strong>{factObj.votesMindblowing}</strong>
        </button>
        <button>
          ⛔️ <strong>{factObj.votesFalse}</strong>
        </button>
      </div>
    </li>
  );
}

export default App;
