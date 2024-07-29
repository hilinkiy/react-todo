import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NavBar from "./components/navbar/NavBar.tsx";
import Notes from "./components/notes/notes.tsx";

const App = () => {
    const [isGridMode, setIsGridMode] = useState(true);

    return (
        <React.StrictMode>
            <NavBar />
            <main className='main'>
                <section className='header container'>
                    <h2 className='header__title'>Все заметки</h2>
                    <button
                        className='header__btn'
                        onClick={() => setIsGridMode(prevMode => !prevMode)}>
                        {isGridMode ? 'Список' : 'Сетка'}
                    </button>
                </section>
                <Notes isGridMode={isGridMode} />
            </main>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
);
