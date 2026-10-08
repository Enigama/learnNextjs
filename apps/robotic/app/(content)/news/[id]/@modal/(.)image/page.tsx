import ModalBackdrop from "@/components/layout/ModalBackdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const newsItem = await getNewsItem(id);

    if (!newsItem) {
        notFound();
    }

    return (
        <ModalBackdrop>
            <dialog open>
                <img src={`/images/news/${newsItem?.image}`} alt={newsItem?.title} />
            </dialog>
        </ModalBackdrop>
    );
}
