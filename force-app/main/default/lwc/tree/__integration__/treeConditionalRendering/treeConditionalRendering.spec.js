const CHANGE_BUTTON_ID = '.change-button';
const before = [
    '1',
    '1.1',
    '1.2',
    '1.2.1',
    '1.2.1.1',
    '1.2.1.1.1',
    '1.2.1.1.2',
    '1.2.1.1.2.1',
    '2',
    '2.1',
    '2.1.1',
    '3',
    '3.1',
];
const after = [
    '1',
    '1.1',
    '1.2',
    '1.2.1',
    '2',
    '2.1',
    '2.1.1',
    '2.2',
    '3',
    '3.1',
];

const LIGHTNINGTREE = 'lightning-tree';

function getTreeNodeAtLevel(key) {
    const tree = $(LIGHTNINGTREE).shadow$('lightning-tree-item[role="tree"]');
    const levels = key.split('.');

    let node = tree;
    let parent = tree;
    let i = 0;
    let level;
    while ((level = levels[i++])) {
        node = parent.shadow$('lightning-tree-item:nth-of-type(' + level + ')');
        parent = node;
    }
    return node;
}

describe('Tree conditional rendering', () => {
    beforeEach(() => {
        const URL = browser.getStaticUrl(__filename);
        browser.url(URL);
    });

    it('should be able to replace the tree content dynamically', () => {
        before.forEach(expectedDataKey => {
            const currentNode = getTreeNodeAtLevel(expectedDataKey);
            expect(currentNode.value).to.not.equal(null);
        });

        $(CHANGE_BUTTON_ID).click();
        after.forEach(expectedDataKey => {
            const currentNode = getTreeNodeAtLevel(expectedDataKey);
            expect(currentNode.value).to.not.equal(null);
        });
    });
});
