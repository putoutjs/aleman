import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-cursor', plugin],
    ],
});

test('lunes: move-cursor: report: next', (t) => {
    t.reportWithOptions('next', `Move cursor`, {
        operation: 'next',
        cursor: 'edit',
    });
    t.end();
});

test('lunes: move-cursor: next', (t) => {
    t.transformWithOptions('next', {
        operation: 'next',
        cursor: 'edit',
    });
    t.end();
});

test('lunes: move-cursor: prev', (t) => {
    t.transformWithOptions('prev', {
        operation: 'prev',
        cursor: 'edit',
    });
    t.end();
});

test('lunes: move-cursor: count', (t) => {
    t.transformWithOptions('count', {
        operation: 'next',
        cursor: 'view',
        count: 2,
    });
    t.end();
});

test('lunes: move-cursor: next: last item: next-wrap', (t) => {
    t.transformWithOptions('next-wrap', {
        operation: 'next',
        cursor: 'new',
        infiniteScroll: true,
    });
    t.end();
});

test('lunes: move-cursor: next: last item: next-stay', (t) => {
    t.transformWithOptions('next-stay', {
        operation: 'next',
        cursor: 'new',
    });
    t.end();
});

test('lunes: move-cursor: no report with options: next', (t) => {
    t.noReportWithOptions('next', {
        operation: 'unknown',
        cursor: 'edit',
    });
    t.end();
});
