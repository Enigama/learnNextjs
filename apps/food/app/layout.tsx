import { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header/header';

export const metadata: Metadata = {
    title: 'NextLevel Food',
    description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
