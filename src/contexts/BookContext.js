import React, { createContext, useState } from 'react'

export const BookContext = createContext()

const BookContextProvider = (props) => {
    const [books, setBooks] = useState([
        { title: 'aaaa', id: 1 },
        { title: 'bbbb', id: 2 },
        { title: 'cccc', id: 3 },
        { title: 'dddd', id: 4 }
    ])
    return (
        <BookContext.Provider value={{ books }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider