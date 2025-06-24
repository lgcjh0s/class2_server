const Keys = () => {

    const accessSecret: string = '0lGcCHuuzxqQ9EzXnQKJdU2CxeLvtBjFJ8v';
    const getSecret = (): string => {
        return accessSecret
    }

    return {
        getSecret
    }
};

const keyStore = Keys();

export {
    keyStore
}