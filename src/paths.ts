const paths = {
    homePath() {
        return "/";
    },
    topicShowPath(slug: string) {
        return `/topic/${slug}`;
    },
    postCreatePath(slug: string) {
        return `/topic/${slug}/post/new`;
    },
    postShowPath(slug: string, postId: string) {
        return `/topic/${slug}/post/${postId}`;
    },
};

export default paths;
