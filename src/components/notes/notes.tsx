import React, { useState, useEffect } from 'react';
import './notes.scss';
import axios from 'axios';
import Modal from '../modal/Modal';
import pen from '../../assets/pen-1024.webp';

export default function Notes({isGridMode}: {isGridMode: boolean}) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
        axios.get('https://ee17b88a91728400.mokky.dev/notes')
            .then(response => {
                setNotes(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://ee17b88a91728400.mokky.dev/notes/${id}`)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            })
            .catch(error => {
                setError(error);
            });
    };

    const openModal = (mode, note = null) => {
        setModalMode(mode);
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <div className={`notes container ${isGridMode ? 'grid-mode' : 'list-mode'}`}>
            {notes.map((note) => (
                <div className='note' key={note.id}>
                    <span className='span'>
                        <h1 className='note__title'>{note.title}</h1>
                        <p className='note__date'>{note.date}</p>
                    </span>
                    <p className='note__descr'>{note.descr}</p>
                    <span className='btns'>
                        <button className='remove__btn' onClick={() => handleDelete(note.id)}>Delete</button>
                        <button className='add__btn' onClick={() => openModal('change', note)}>Change</button>
                    </span>
                </div>
            ))}
            <button className='pen' onClick={() => openModal('create')}>
                <img src={pen} alt='Create/Change' className='pencil' />
            </button>
            {isModalOpen && <Modal onClose={closeModal} modalMode={modalMode} note={currentNote} setNotes={setNotes} />}
        </div>
    );
}
