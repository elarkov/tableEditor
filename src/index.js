/*=== styles ===*/
import 'normalize.css';
import './scss/layout/base.scss';

/*=== include handlebars template ===*/
import render from './templates/content.hbs';

/*=== modules ===*/
import {data} from './js/data';
import {module} from "./js/module";

/*=== display of table one ===*/
let container = document.querySelector('.table');
container.innerHTML = render({users: data});


module();


