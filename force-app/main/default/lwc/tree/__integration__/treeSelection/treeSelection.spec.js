const ARIA_SELECTED = 'aria-selected';
const ARIA_EXPANDED = 'aria-expanded';

const LIGHTNINGTREE = 'lightning-tree';

const CHANGE_BUTTON = '.change-selection';

function assertIsSelected(node) {
    const ariaSelected = node.getAttribute(ARIA_SELECTED);
    expect(ariaSelected).to.equal('true');
}
function assertIsExpanded(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('true');
}

function getTreeNodeAtLevel(key) {
    $(LIGHTNINGTREE).waitForExist();
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
describe('lightning-tree selection', () => {
    beforeEach(() => {
        const URL = browser.getStaticUrl(__filename);
        browser.url(URL);
    });
    it('should select the passed selected node on rendering and should be able to focus on that node', () => {
        assertIsSelected(getTreeNodeAtLevel('3.1.1'));
        assertIsExpanded(getTreeNodeAtLevel('3'));
        assertIsExpanded(getTreeNodeAtLevel('3.1'));
    });
    it('should be able to change the selected node dynamically', () => {
        $(CHANGE_BUTTON).click();
        assertIsSelected(getTreeNodeAtLevel('3'));
    });
    it('should be able to navigate with the selected node', () => {
        $(CHANGE_BUTTON).click();
        assertIsSelected(getTreeNodeAtLevel('3'));
        browser.keys('Tab');
        browser.keys('ArrowUp');
        assertIsSelected(getTreeNodeAtLevel('2.2'));
        browser.keys('ArrowUp');
        assertIsSelected(getTreeNodeAtLevel('2.1'));
        browser.keys('ArrowUp');
        assertIsSelected(getTreeNodeAtLevel('2'));
    });
    it('should retain the selection upon collapsing the parent and re-expanding it', () => {
        assertIsSelected(getTreeNodeAtLevel('3.1.1'));
        getTreeNodeAtLevel('3.1.1').click();
        browser.keys('ArrowUp');
        browser.keys('ArrowUp');
        browser.keys('ArrowLeft');
        browser.keys('ArrowRight');
        assertIsSelected(getTreeNodeAtLevel('3.1.1'));
    });
});
