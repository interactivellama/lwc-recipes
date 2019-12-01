const ARIA_EXPANDED = 'aria-expanded';

const COLLAPSE_BUTTON_ID = '.collapse-button';
const EXPAND_BUTTON_ID = '.expand-button';

const NODE_1 = '1';
const NODE_3 = '3';

const LIGHTNINGTREE = 'lightning-tree';

function assertIsExpanded(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('true');
}
function assertIsCollapsed(node) {
    const ariaExpanded = node.getAttribute(ARIA_EXPANDED);
    expect(ariaExpanded).to.equal('false');
}

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

describe('lightning-tree integration, testing conditional nodes', () => {
    beforeEach(() => {
        const URL = browser.getStaticUrl(__filename);
        browser.url(URL);
    });
    it('should be able to expand nodes programmatically.', () => {
        const node1 = getTreeNodeAtLevel(NODE_1);
        $(COLLAPSE_BUTTON_ID).click();
        assertIsCollapsed(node1);
    });
    it('should be able to collapse nodes programmatically', () => {
        const node3 = getTreeNodeAtLevel(NODE_3);
        $(EXPAND_BUTTON_ID).click();
        assertIsExpanded(getTreeNodeAtLevel(NODE_3));
    });
});
