/*= == styles === */
import 'normalize.css';
import './scss/layout/base.scss';

/*= == modules === */
import {
  newTables, addRows, addColumn, delRows, delColumns, getRandomColor,
} from './js/editTable';

newTables();
addRows();
addColumn();
delRows();
delColumns();
getRandomColor();
