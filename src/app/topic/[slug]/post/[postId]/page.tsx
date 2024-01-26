import CommentCreateForm from "@/components/comments/comment-create-form";
import PostShow from "@/components/posts/post-show";
import paths from "@/paths";
import Link from "next/link";
import CommentList from "@/components/comments/comment-list";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

interface PostShowPageProps {
    params: { slug: string; postId: string };
}

export default function PostShowPage({ params }: PostShowPageProps) {
    const { slug, postId } = params;

    return (
        <div className="space-y-3">
            <Link
                className="underline decoration-solid"
                href={paths.topicShowPath(slug)}
            >
                {"< "} Back to {slug}
            </Link>
            <Suspense
                fallback={
                    <div className="m-2">
                        <Skeleton className="h-8 w-48" />
                    </div>
                }
            >
                <PostShow postId={postId} />
            </Suspense>
            <CommentCreateForm postId={postId} startOpen />
            <CommentList postId={postId} />
        </div>
    );
}
