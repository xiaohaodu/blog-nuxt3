const getLastDirElement = (currentElement: HTMLElement) => {
    const parentUL = currentElement.parentElement?.parentElement?.parentElement;
    if (parentUL?.nodeName.toLowerCase() != 'li') {
        return null;
    }
    return parentUL.children[0] as HTMLElement;
};
const getFileDirPath = (currentElement: HTMLElement) => {
    const path: string[] = [];
    function findPath(currentElement: HTMLElement) {
        const lastDirElement = getLastDirElement(currentElement);
        if (lastDirElement) {
            path.push(lastDirElement.innerText);
            findPath(lastDirElement);
        }
    }
    findPath(currentElement);
    return path.reverse().join('/');
};
export {
    getFileDirPath
};