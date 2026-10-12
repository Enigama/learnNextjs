import type { Metadata } from "next";
import "../globals.css";
import MainHeader from "@/components/layout/main-header";

export const metadata: Metadata = {
    title: "Next.js Page Routing & Rendering",
    description: "Learn how to route to different pages.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body>
                <div id="page">
                    <MainHeader />
                    {children}
                </div>
            </body>
        </html>
    );
}
