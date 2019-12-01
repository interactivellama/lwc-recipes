const ARIA_SELECTED = 'aria-selected';
const ARIA_EXPANDED = 'aria-expanded';

const NODE_1 = '1';
const NODE_2 = '2';
const NODE_3 = '3';
const NODE_11 = '1.1';
const NODE_12 = '1.2';
const NODE_121 = '1.2.1';
const NODE_1211 = '1.2.1.1';
const NODE_12111 = '1.2.1.1.1';
const NODE_121121 = '1.2.1.1.2.1';
const NODE_21 = '2.1';

const NODE_ICON = 'button';

const NODE_CLICK = 'a';

const LIGHTNINGTREE = 'lightning-tree';

function getTreeNodeAtLevel(key) {
    const tree = $(LIGHTNINGTREE).shadow$('lightning-tree-item[role="tree');
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

function assertIsSelected(node) {
    const ariaSelected = node.getAttribute(ARIA_SELECTED);
    expect(ariaSelected).to.equal('true');
}
function assertNotSelected(node) {
    const ariaSelected = node.getAttribute(ARIA_SELECTED);
    expect(ariaSelected).to.equal('false');
}
function assertIsExpanded(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('true');
}
function assertIsCollapsed(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('false');
}

describe('Tree a11y', () => {
    beforeEach(() => {
        const URL = browser.getStaticUrl(__filename);
        browser.url(URL);
    });
    it('should not do anything when the up key is pressed on the first component.', () => {
        const node1 = getTreeNodeAtLevel(NODE_1);
        node1.shadow$(NODE_CLICK).click();
        browser.keys('Arrow Up');
        assertIsSelected(node1);
    });
    it('should not do anything when the down key is pressed on the last component.', () => {
        const node3 = getTreeNodeAtLevel(NODE_3);
        node3.shadow$(NODE_CLICK).click();
        browser.keys('Arrow Down');
        assertIsSelected(node3);
    });
    it('should select the next open node when the down key is pressed and the current node is not last', () => {
        const node1 = getTreeNodeAtLevel(NODE_1);
        node1.shadow$(NODE_CLICK).click();
        browser.keys('ArrowDown');
        const node11 = getTreeNodeAtLevel(NODE_11);
        assertIsSelected(node11);
    });
    it('should select the previous open node when the up key is pressed and the current node is not first', () => {
        const node2 = getTreeNodeAtLevel(NODE_2);
        node2.shadow$(NODE_CLICK).click();
        browser.keys('ArrowUp');
        const node121121 = getTreeNodeAtLevel(NODE_121121);
        assertIsSelected(node121121);
    });
    it('should collapse the parent node when the left key is pressed on a leaf node.', () => {
        const node12111 = getTreeNodeAtLevel(NODE_12111);
        node12111.shadow$(NODE_CLICK).click();
        browser.keys('ArrowLeft');
        const node1211 = getTreeNodeAtLevel(NODE_1211);
        assertIsCollapsed(node1211);
    });
    it('should collapse the current node when the left key is pressed on an open node (that is not a leaf)', () => {
        const node1211 = getTreeNodeAtLevel(NODE_1211);
        node1211.shadow$(NODE_CLICK).click();
        browser.keys('ArrowLeft');
        assertIsCollapsed(getTreeNodeAtLevel(NODE_1211));
    });
    it('should expand the current node node when the right key is pressed on a closed node', () => {
        const node3 = getTreeNodeAtLevel(NODE_3);
        node3.shadow$(NODE_CLICK).click();
        browser.keys('ArrowRight');
        assertIsExpanded(node3);
    });
    it('should not expand the child node when the right key is pressed on an open node ', () => {
        const node2 = getTreeNodeAtLevel(NODE_2);
        node2.shadow$(NODE_CLICK).click();
        browser.keys('ArrowRight');
        const node21 = getTreeNodeAtLevel(NODE_21);
        assertIsCollapsed(node21);
    });
    it('should select the current node if the space key is pressed on the current node', () => {
        const node3 = getTreeNodeAtLevel(NODE_3);
        node3.shadow$(NODE_ICON).click();
        assertNotSelected(node3);

        browser.keys(' ');
        assertIsSelected(node3);
    });
    it('should select the current node if the enter key is pressed on the current node', () => {
        const node3 = getTreeNodeAtLevel(NODE_3);
        node3.shadow$(NODE_ICON).click();
        assertNotSelected(node3);

        browser.keys('Enter');
        assertIsSelected(node3);
    });
    it('should close the parent node when the left key is pressed on a closed node (when it is not a root node)', () => {
        const node21 = getTreeNodeAtLevel(NODE_21);
        node21.shadow$(NODE_CLICK).click();

        browser.keys('ArrowLeft');
        const node2 = getTreeNodeAtLevel(NODE_2);
        assertIsCollapsed(node2);
    });
});
