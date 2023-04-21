const getLastDirElement = (currentElement) => {
    const parentUL = currentElement.parentElement.parentElement.parentElement
    if (parentUL.nodeName.toLowerCase() != 'li') {
        return null
    }
    return parentUL.children[0]
}
const getFileDirPath = (currentElement) => {
    const path = []
    function findPath(currentElement) {
        const lastDirElement = getLastDirElement(currentElement);
        if (lastDirElement) {
            path.push(lastDirElement.innerText)
            findPath(lastDirElement)
        }
    }
    findPath(currentElement)
    return path.reverse().join('/')
}
export {
    getFileDirPath
}