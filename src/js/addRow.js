/* eslint-disable one-var,no-undef */

import render from '../templates/content.hbs';
import { data } from './data';

const headerBlock = document.querySelector('header');
const addRowBtn = document.querySelectorAll('.menu__item')[1];
const addColumnBtn = document.querySelectorAll('.menu__item')[0];
const delRow = document.querySelectorAll('.menu__item')[2];
const delCell = document.querySelectorAll('.menu__item')[3];
const newTableBtn = document.querySelectorAll('.menu__item')[5];




function newTables() {
  const newTabel = document.createElement('table');

  newTabel.className = 'table';

  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');

  const td = document.createElement('td');
  td.innerHTML = render({ items: data });

  tr.appendChild(td);
  tbody.appendChild(tr);
  newTabel.appendChild(tbody);
  headerBlock.insertAdjacentElement('afterEnd', newTabel);
}

newTableBtn.addEventListener('click', () => {
  newTables();
  if (document.body.children[1].lastElementChild) {
    document.body.children[1].removeChild(document.body.children[1].lastElementChild);
  }
});

/* === добавляем ряд в таблицу === */
function addRows() {
  let table = document.querySelector('.table'),
    row = table.insertRow(table.rows.length);

  for (let i = 0; i < table.rows[0].cells.length; i++) {
    createCell(row.insertCell(i), render({ items: data }));
  }
}

/* === наполняем ячейки содержимым === */
function createCell(cell, text) {
  const txt = document.createTextNode(text);
  cell.appendChild(txt);
}

/* === добавляем колонки таблицы === */
function addColumn() {
  const table = document.querySelector('.table');
  for (let i = 0; i < table.rows.length; i++) {
    createCell(table.rows[i].insertCell(table.rows[i].cells.length), render({ items: data }));
  }
}

/* === удаляем ряды у таблицы === */
function delRows() {
  const table = document.querySelector('.table');
  table.children[0].removeChild(table.children[0].lastElementChild);
}

/* === удаляем колонки таблицы === */
function delColumns() {
  const tr = document.querySelectorAll('tr');
  for (let i = 0; i < tr.length; i++) {
    tr[i].removeChild(tr[i].lastElementChild);
  }
}

function editCell() {
  const table = document.querySelector('.table');
  let editingTd;

  table.onclick = function (event) {
    let target = event.target;

    while (target != table) {
      if (target.className == 'edit-cancel') {
        finishTdEdit(editingTd.elem, false);
        return;
      }

      if (target.className == 'edit-ok') {
        finishTdEdit(editingTd.elem, true);
        return;
      }

      if (target.nodeName == 'TD') {
        if (editingTd) return; // already editing

        makeTdEditable(target);
        return;
      }

      target = target.parentNode;
    }
  };


  function makeTdEditable(td) {
    editingTd = {
      elem: td,
      data: td.innerHTML,
    };

    td.classList.add('edit-td');

    const textArea = document.createElement('textarea');
    textArea.className = 'edit-area';

    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    textArea.focus();

    td.insertAdjacentHTML('beforeEnd',
      `<div class="edit-controls">
          <button class="edit-ok">Применить</button>
          <button class="edit-cancel">Отменить</button>
        </div>`);
  }

  function finishTdEdit(td, isOk) {
    if (isOk) {
      td.innerHTML = td.firstChild.value;
    } else {
      td.innerHTML = editingTd.data;
    }
    td.classList.remove('edit-td'); // remove edit class
    editingTd = null;
  }
}


addRowBtn.addEventListener('click', addRows);
addColumnBtn.addEventListener('click', addColumn);
delRow.addEventListener('click', delRows);
delCell.addEventListener('click', delColumns);

export {
  newTables,
  addRows,
  addColumn,
  delRows,
  delColumns,
  editCell,
};
