import React from "react";
import Header from "../layout/Home/Header";
import BookGrid from "../layout/Home/BookGrid";
import useBooks from "../hooks/useBooks"

function Home() {
  const {filteredBooks, searchBook, error} = useBooks();
  return (
    <div>
      <Header onSearch={searchBook} />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <BookGrid books={filteredBooks}/>
      </main>
    </div>
  );
}

export default Home;
