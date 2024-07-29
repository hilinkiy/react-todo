import React, { useState, useEffect } from 'react';
import './modal.scss';
import axios from 'axios';

export default function Modal({ onClose, modalMode, note, setNotes }) {
    const [title, setTitle] = useState('');
    const [descr, setDescription] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.descr);
        }
    }, [note]);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleAdd = () => {
        const currentDate = formatDate(new Date());
        axios.post('https://ee17b88a91728400.mokky.dev/notes', { title, descr, date: currentDate })
            .then(response => {
                setNotes(prevNotes => [...prevNotes, response.data]);
                onClose();
            })
            .catch(error => {
                setError(error);
            });
    };

    const handleUpdate = () => {
        axios.patch(`https://ee17b88a91728400.mokky.dev/notes/${note.id}`, { title, descr, date: note.date })
            .then(response => {
                setNotes(prevNotes => prevNotes.map(n => (n.id === note.id ? response.data : n)));
                onClose();
            })
            .catch(error => {
                setError(error);
            });
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <div className='background'>
            <div className='modal'>
                <h3 className='modal__title'>{modalMode === 'create' ? 'Create Note' : 'Change Note'}</h3>
                <label className='modal__label'>
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        value={descr}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <div className='modal__buttons'>
                    <button className='modal__btn close__btn' onClick={onClose}>Close</button>
                    <button className='modal__btn add__btn' onClick={modalMode === 'create' ? handleAdd : handleUpdate}>
                        {modalMode === 'create' ? 'Add' : 'Update'}
                    </button>
                </div>
            </div>
            <div className='close__modal' onClick={onClose} />
        </div>
    );
}
