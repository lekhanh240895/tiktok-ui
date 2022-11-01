export const routes = {
    home: '/',
    following: '/following',
    profile: '/@:username',
    upload: '/upload',
    search: '/search',
    live: '/live',
    feedback: '/feedback',
    tag: '/tag/:tagname',
    music: '/music/:musicname',
    messages: '/messages',
    video: '@:username/video/:videoID',
    notFound: '*',
};
