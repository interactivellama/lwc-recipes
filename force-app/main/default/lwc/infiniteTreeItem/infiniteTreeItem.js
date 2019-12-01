import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
// import { classListMutation, normalizeString } from 'c/classListMutation';

const DEFAULT_SIZE = 'medium';
const DEFAULT_VARIANT = 'square';

export default class cInfiniteTreeItem extends LightningElement {
    @track _label = '';
    @track _isRoot = false;
    @track _childNodes = [];
    @track _path = [];
    @track _items;
    @track _isLeaf = false;
    @track _currentNode;
    _index = 0;

    @api get label() {
        return this._label || '';
    }

    set label(value) {
        this._label = value;
    }

    get item() {
        return _item;
    }

    @api
    set item(value) {
        this._item = value;
    }

    @api get nodeName() {
        return this._key;
    }

    set nodeName(value) {
        this._key = value;
    }

    @api get treeIndex() {
        return this._index;
    }

    set treeIndex(value) {
        this._index = value;
    }

    @api
    get items() {
        return this._items || [];
    }

    set items(value) {
        //this.normalizeData(value);
        this._items = value;
        this._childNodes = value;
    }

    @api
    get path() {
        return this._path || [];
    }

    set path(value) {
        this._path = value;
    }

    @api
    get currentNode() {
        return this._currentNode;
    }

    set currentNode(value) {
        this._currentNode = value;
    }

    @api
    get lastItem() {
        return this._lastItem;
    }

    set lastItem(value) {
        this._lastItem = value;
    }

    get computedItemClass() {
        return classSet('slds-infinite-tree-list__item')
            .add({
                'last-item': this._lastItem
            })
            .toString();
    }

    @api
    get itemType() {
        return this._type;
    }

    set itemType(value) {
        this._type = value;
    }

    get computedItemIconName() {
        return `utility:${this._type}`;
    }

    get children() {
        if (this._currentNode !== undefined) {
            return this.find(this._childNodes, this._path).children;
            console.log(this.find(this._childNodes, this._path).children);
        } else {
            // top level
            return this._childNodes;
        }
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

    handleClick(event) {
        const customEvent = new CustomEvent('private_click_item', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                treeIndex: String(this._index),
                target: 'item'
            }
        });
        this.dispatchEvent(customEvent);
    }

    @api
    get isLeaf() {
        return this._isLeaf;
    }

    set isLeaf(value) {
        this._isLeaf = value;
    }

    @api
    get isRoot() {
        return this._isRoot;
    }

    set isRoot(value) {
        this._isRoot = value;
    }

    get hasChildren() {
        return this._childNodes && this._childNodes.length > 0;
    }

    get showIcon() {
        return true;
    }
}
