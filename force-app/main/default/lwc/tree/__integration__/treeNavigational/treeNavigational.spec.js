const NODE_1 = '1';

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

describe('lightning-tree integration, testing navigational links', () => {
    it('should be able to navigate to other sections of the website when containing navigational links.', () => {
        const URL = browser.getStaticUrl(__filename);
        browser.url(URL);
        getTreeNodeAtLevel(NODE_1).click();
        const currURL = browser.getUrl();
        expect(currURL.indexOf(`${URL}/#sectionOne`) >= 0).to.equal(true);
    });
});
