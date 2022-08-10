import crypto from 'crypto';


function generateUserId(length) {
    let userId = '';

    for(let i = 0; i < length; i++) {
        userId += crypto.randomInt(9);
    }

    return userId;
}

export default generateUserId;
