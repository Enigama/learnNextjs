export type Post = {
    id: number;
    image: string;
    title: string;
    content: string;
    createdAt: string;
    userFirstName: string;
    userLastName: string;
    likes: number;
    isLiked: boolean;
};

export type NewPost = {
    imageUrl: string;
    title: string;
    content: string;
    userId: number;
};
