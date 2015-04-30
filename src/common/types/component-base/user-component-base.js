var UserComponentBase = {
    getInitialState: function () {
        return {
            IsViewingPosts: false,
            IsAddingPost: false
        };
    },

    ViewPosts: function () {
        this.setState({ IsViewingPosts: true });
    },

    HidePosts: function () {
        this.setState({ IsViewingPosts: false });
    },

    AddPost: function () {
        this.setState({ IsAddingPost: true });
    },

    AddPostClosed: function () {
        this.setState({ IsAddingPost: false });
    }
};

module.exports = UserComponentBase;