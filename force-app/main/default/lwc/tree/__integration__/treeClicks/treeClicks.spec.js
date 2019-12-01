const ARIA_SELECTED = 'aria-selected';
const ARIA_EXPANDED = 'aria-expanded';

const NODE_1 = '1';
const NODE_2 = '2';
const NODE_3 = '3';
const NODE_11 = '1.1';
const NODE_12 = '1.2';
const NODE_121 = '1.2.1';
const NODE_1211 = '1.2.1.1';

const NODE_ICON = 'button';

const NODE_CLICK = 'a';

const LIGHTNINGTREE = 'lightning-tree';

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

function assertIsSelected(node) {
    const ariaSelected = node.getAttribute(ARIA_SELECTED);
    expect(ariaSelected).to.equal('true');
}
function assertIsExpanded(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('true');
}
function assertIsCollapsed(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('false');
}

describe('Tree clicks', () => {
    beforeEach(() => {
        const URL = browser.getStaticUrl(__filename);
        browser.url(URL);
    });
    it('should select the current node if the mouse clicks on the current node', () => {
        const node1 = getTreeNodeAtLevel(NODE_1);
        node1.shadow$(NODE_CLICK).click();
        assertIsSelected(node1);
    });
    it('should collapse the current node if the the current node is open and the arrow icon for the current node is clicked.', () => {
        const node1 = getTreeNodeAtLevel(NODE_1);
        node1.shadow$(NODE_ICON).click();
        assertIsCollapsed(node1);
    });
    it('should expand the current node if the the current node is closed and the arrow icon for the current node is clicked.', () => {
        const node3 = getTreeNodeAtLevel(NODE_3);
        node3.shadow$(NODE_ICON).click();
        assertIsExpanded(node3);
    });

    it('should stay in the same state as before when the current, expanded node is collapsed and then expanded again.', () => {
        const node1211 = getTreeNodeAtLevel(NODE_1211);
        node1211.shadow$(NODE_ICON).click();

        const node12 = getTreeNodeAtLevel(NODE_12);
        const node121 = getTreeNodeAtLevel(NODE_121);
        assertIsExpanded(node12);
        assertIsExpanded(node121);
        assertIsCollapsed(node1211);

        const node1 = getTreeNodeAtLevel(NODE_1);
        node1.shadow$(NODE_ICON).click();
        node1.shadow$(NODE_ICON).click();
        assertIsExpanded(getTreeNodeAtLevel(NODE_12));
        assertIsExpanded(getTreeNodeAtLevel(NODE_121));
        assertIsCollapsed(getTreeNodeAtLevel(NODE_1211));
    });
});
