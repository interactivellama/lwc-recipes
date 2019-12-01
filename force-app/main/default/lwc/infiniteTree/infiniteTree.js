import { LightningElement, api, track } from 'lwc';
import { TreeData } from '../tree/treeData';
import { classSet } from 'c/utils';
import { classListMutation, normalizeString } from 'c/utilsPrivate';
import { computeSldsClass } from 'c/iconUtils';

export default class cInfiniteTree extends LightningElement {
    @track _items = [];
    @track _childNodes;
    @track _currentNode;
    @track _path;

    constructor() {
        super();
        this.template.addEventListener(
            'private_click_item',
            this.handleItemClick.bind(this)
        );
        this.template.addEventListener(
            'request_path_change',
            this.handlePathChange.bind(this)
        );
    }

    @api
    get items() {
        return this._items || [];
    }

    set items(value) {
        this.normalizeData(value);
        this._items = value;
    }

    @api
    get isRoot() {
        return this.path.length === 0;
    }

    get headerLabel() {
        return this.find(this._childNodes, this._path).label;
    }

    find(node, nestedIndexes, level = 0) {
        const currentLevelIndex = Number(nestedIndexes[level]);
        let child;
        if (level === 0) {
            child = node[currentLevelIndex];
        } else {
            child = node.children[currentLevelIndex];
        }
        ++level;
        return level < nestedIndexes.length
            ? this.find(child, nestedIndexes, level)
            : child;
    }

    /**
     * Check the input data for circular references or cycles,
     * Build a list of items in depth-first manner for traversing the tree by keyboard
     * This list - treeItems is an array of data-keys of the nodes using which nodes can be accessed by querySelector
     * Build a list of visible items to be checked while traversing the tree, at any point any branch is expanded
     * or collapsed, this list has to be kept updated
     * @param {Object} items -  The list of items
     */
    normalizeData(items) {
        this.treedata = new TreeData();
        // we need to make a shallow clone, otherwise we would be modifying
        // the data passed by the user.
        this._items = items.map(item => {
            return this.treedata.cloneItems(item);
        });

        const treeRoot = this.treedata.parse(this.items, this.selectedItem);
        this._childNodes = treeRoot ? treeRoot.children : [];
        console.log(this._childNodes);
        this._selectedItem = treeRoot.selectedItem;
        this._key = this._childNodes.length > 0 ? treeRoot.key : null;
        if (this._key) {
            // this.syncCurrentFocused();
        }
    }

    get children() {
        return this._childNodes;
    }

    @api
    get path() {
        return this._path || [];
    }

    set path(value) {
        this._path = value;
    }

    get currentNode() {
        return this._path.length
            ? this._path[this._path.length - 1]
            : undefined;
    }

    handleItemClick(event) {
        const treeIndex = event.detail.treeIndex;
        this.dispatchSelectEvent(treeIndex);
    }

    handlePathChange(event) {
        const customEvent = new CustomEvent('request_path_change', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: { ...event.detail }
        });
        this.dispatchEvent(customEvent);
    }

    dispatchSelectEvent(treeIndex) {
        if (treeIndex) {
            const customEvent = new CustomEvent('select', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { treeIndex: treeIndex }
            });
            this.dispatchEvent(customEvent);
        }
    }
}
