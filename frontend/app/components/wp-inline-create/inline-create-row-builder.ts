import {WorkPackageTableRow} from '../wp-fast-table/wp-table.interfaces';
import {TableRowEditContext} from '../wp-edit-form/table-row-edit-context';
import {WorkPackageEditForm} from '../wp-edit-form/work-package-edit-form';
import {injectorBridge} from '../angular/angular-injector-bridge.functions';
import {WorkPackageResource} from '../api/api-v3/hal-resources/work-package-resource.service';
import {checkedClassName} from '../wp-fast-table/builders/ui-state-link-builder';
import {rowId} from '../wp-fast-table/helpers/wp-table-row-helpers';
import {States} from '../states.service';
import {WorkPackageTableSelection} from '../wp-fast-table/state/wp-table-selection.service';
import {CellBuilder} from '../wp-fast-table/builders/cell-builder';
import {
  internalDetailsColumn,
  rowClassName,
  SingleRowBuilder
} from '../wp-fast-table/builders/rows/single-row-builder';
import {QueryColumn} from '../api/api-v3/hal-resources/query-resource.service';

export const inlineCreateRowClassName = 'wp-inline-create-row';
export const inlineCreateCancelClassName = 'wp-table--cancel-create-link';

export class InlineCreateRowBuilder extends SingleRowBuilder {
  // Injections
  public states:States;
  public wpTableSelection:WorkPackageTableSelection;
  public I18n:op.I18n;

  protected text:{ cancelButton:string };

  constructor() {
    super();
    injectorBridge(this);

    this.text = {
      cancelButton: this.I18n.t('js.button_cancel')
    };
  }

  public buildCell(workPackage:WorkPackageResource, column:QueryColumn):HTMLElement {
    switch (column.id) {
      case internalDetailsColumn.id:
        return this.buildCancelButton();
      default:
        return super.buildCell(workPackage, column);
    }
  }

  public buildNew(workPackage:WorkPackageResource, form:WorkPackageEditForm):HTMLElement {
    // Get any existing edit state for this work package
    const row = this.buildEmpty(workPackage);

    // Set editing context to table
    form.editContext = new TableRowEditContext(workPackage.id);
    this.states.editing.get(workPackage.id).put(form);

    return row;
  }

  /**
   * Create an empty unattached row element for the given work package
   * @param workPackage
   * @returns {any}
   */
  public createEmptyRow(workPackage:WorkPackageResource) {
    const tr = document.createElement('tr');
    tr.id = rowId(workPackage.id);
    tr.dataset['workPackageId'] = workPackage.id;
    tr.classList.add(inlineCreateRowClassName, rowClassName, 'wp--row', 'issue');

    return tr;
  }

  protected buildCancelButton() {
    const td = document.createElement('td');
    td.classList.add('wp-table--cancel-create-td', '-short');

   td.innerHTML = `
    <a
       href="javascript:"
       class="${inlineCreateCancelClassName} icon icon-cancel"
       aria-label="${this.text.cancelButton}">
    </a>
   `;

    return td;
  }

}


SingleRowBuilder.$inject = ['states', 'wpTableSelection', 'I18n'];
