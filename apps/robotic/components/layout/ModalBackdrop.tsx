"use client";
import { useRouter } from "next/navigation";

export default function ModalBackdrop({
    children,
}: {
    children: React.ReactNode;
}) {
    const route = useRouter();

    return (
        <div
            onClick={() => route.back()}
            style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
            }}
        >
            {children}
        </div>
    );
}
