import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { classListMutation, normalizeString } from 'c/utilsPrivate';
import { computeSldsClass } from 'c/iconUtils';

const DEFAULT_SIZE = 'medium';
const DEFAULT_VARIANT = 'square';

const createAndDispatchPrivateEvent = ({
    this: that,
    name,
    originalEvent,
    data
}) => {
    const customEvent = new CustomEvent(name, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
            originalEvent,
            data: { ...data }
        }
    });
    that.dispatchEvent(customEvent);
};

export default class cInfiniteTreeHeader extends LightningElement {
    @track _label;

    handleClickBack(event) {
        createAndDispatchPrivateEvent({
            this: this,
            name: 'private_request_path_change_out',
            originalEvent: event,
            data: {
                // remove last item in array
                path: [...this._path].slice(0, -1)
            }
        });
    }

    handleClickHome(event) {
        createAndDispatchPrivateEvent({
            this: this,
            name: 'private_request_path_change_out',
            originalEvent: event,
            data: {
                // clear path
                path: []
            }
        });
    }

    @api
    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    @api
    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    get showIcon() {
        return true;
    }
}
