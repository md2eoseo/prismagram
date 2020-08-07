export const USER_FRAGMENT = `
    id
    username
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const LIKE_FRAGMENT = `
    id
    user {
        ${USER_FRAGMENT}
    }
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        user {
            ${USER_FRAGMENT}
        }
        files {
            ${FILE_FRAGMENT}
        }
        likes {
            ${LIKE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
    }
`;
