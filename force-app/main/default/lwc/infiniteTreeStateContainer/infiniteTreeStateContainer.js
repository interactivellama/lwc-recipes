import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { classListMutation, normalizeString } from 'c/utilsPrivate';
import { computeSldsClass } from 'c/iconUtils';

const items = [
    {
        label: 'Western Sales Director',
        name: '1',
        items: [
            {
                label: 'Western Sales Manager',
                name: '2',
                items: [
                    {
                        label: 'CA Sales Rep',
                        name: '3',
                        variableType: 'text',
                        items: []
                    },
                    {
                        label: 'OR Sales Rep',
                        name: '4',
                        variableType: 'text',
                        items: []
                    }
                ]
            }
        ]
    },
    {
        label: 'Eastern Sales Director',
        name: '5',
        items: [
            {
                label: 'Eastern Sales Manager',
                name: '6',
                items: [
                    {
                        label: 'NY Sales Rep',
                        name: '7',
                        variableType: 'text',
                        items: []
                    },
                    {
                        label: 'MA Sales Rep',
                        name: '8',
                        variableType: 'text',
                        items: []
                    }
                ]
            }
        ]
    },
    {
      label: 'Northern Sales Director',
      name: '9',
      items: [
          {
              label: 'Northern Sales Manager',
              name: '10',
              items: [
                  {
                      label: 'MT Sales Rep',
                      name: '11',
                      variableType: 'text',
                      items: []
                  },
                  {
                      label: 'MN Sales Rep',
                      name: '12',
                      variableType: 'text',
                      items: []
                  }
              ]
          }
      ]
  },
  {
    label: 'Southern Sales Director',
    name: '13',
    items: [
        {
            label: 'Southern Sales Manager',
            name: '14',
            items: [
                {
                    label: 'TX Sales Rep',
                    name: '15',
                    variableType: 'text',
                    items: []
                },
                {
                    label: 'NM Sales Rep',
                    name: '16',
                    variableType: 'text',
                    items: []
                }
            ]
        }
    ]
  },
];

const initialState = { path: [] };

export default class cInfiniteTreeStateContainer extends LightningElement {
    @track treeList = items;
    @track pathList;

    constructor() {
        super();
        this.pathList = initialState.path;
        this.template.addEventListener(
            'request_path_change',
            this.handlePathChange.bind(this)
        );
        this.template.addEventListener(
          'select',
          this.handleSelect.bind(this)
      );
    }

    handlePathChange(e) {
        this.pathList = e.detail.data.path;
    }

    handleSelect(e) {
        console.log('Item Selected:', e.detail);
    }
}
