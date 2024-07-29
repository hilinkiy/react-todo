import './navbar.scss'

export default function NavBar() {
    return (
        <nav className='nav'>
            <div className='container nav__content'>
                <a href='#' className='nav__logo'>
                    LOGO
                </a>
                <h1 className='nav__title'>
                    Ваши заметки
                </h1>
                <select className='nav__select'>
                    <option>RU</option>
                    <option>UZ</option>
                    <option>EN</option>
                </select>
            </div>
        </nav>
    )
}