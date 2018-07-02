/*= == styles === */
import 'normalize.css';
import './scss/layout/base.scss';

/*= == include handlebars template === */

/*= == modules === */
import {
  newTables, addRows, addColumn, delRows, delColumns,
} from './js/addRow';

/*= == display of table one === */

newTables();
addRows();
addColumn();
delRows();
delColumns();
