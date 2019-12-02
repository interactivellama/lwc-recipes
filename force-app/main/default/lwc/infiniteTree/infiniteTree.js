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
    @track _hasTransitioned = true;
    @track _drillIn = true;
    @track _drillOut = false;
    
    constructor() {
        super();
        this.template.addEventListener(
            'private_select',
            this.handleItemSelect.bind(this)
        );
        this.template.addEventListener(
            'private_request_path_change_in',
            this.handlePathChangeIn.bind(this)
        );
        this.template.addEventListener(
          'private_request_path_change_out',
          this.handlePathChangeOut.bind(this)
      );
    }

    @api
    get hasTransitioned() {
      return this._hasTransitioned;
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

    get computedPanelClass() {
      return classSet('panel-transition-out')
          .add({
              'hide': !this._hasTransitioned,
              'show-in': this._hasTransitioned && this._drillIn,
              'show-out': this._hasTransitioned && this._drillOut
          })
          .toString();
  }

    handleItemSelect(event) {
        const treeIndex = event.detail.data.treeIndex;
        this.dispatchSelectEvent(treeIndex);
    }

    handlePathChangeIn(event) {
        const customEvent = new CustomEvent('request_path_change', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: { ...event.detail }
        });

        this._hasTransitioned = false;
        this._drillOut = false;
        this._drillIn = true;

        setTimeout(() => {
          this.dispatchEvent(customEvent);
          this._hasTransitioned = true;
        }, 0)
    }

    handlePathChangeOut(event) {
      const customEvent = new CustomEvent('request_path_change', {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: { ...event.detail }
      });

      this._hasTransitioned = false;
      this._drillOut = true;
      this._drillIn = false;

      setTimeout(() => {
        this.dispatchEvent(customEvent);
        this._hasTransitioned = true;
      }, 0)
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
