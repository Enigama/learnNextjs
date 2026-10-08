import Link from 'next/link';
import Image from 'next/image';
import LogiImg from '@/assets/logo.png';
import classes from './header.module.css';
import HeaderBackground from './header-background';
import NavLink from './nav-link';

export const Header = () => {
    return (
        <>
            <HeaderBackground />
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <Image priority src={LogiImg} alt="A plat with food no it" />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};
