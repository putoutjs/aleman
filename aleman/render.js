import {
    parse,
    transform,
    print,
    findPlaces,
} from 'putout';
import {branch, merge} from '@putout/processor-html';

const {entries} = Object;

export const SKIP = false;
export const TRANSFORM = true;

export const createRender = (html, {options, rules, type}) => {
    const {ast, source} = parseAccordingToType(html, type);
    
    return function render(state) {
        const currentRules = {};
        const plugins = entries(rules);
        
        for (const [name] of plugins) {
            currentRules[name] = ['on', {
                ...state,
                ...options,
            }];
        }
        
        const places = findPlaces(ast, source, {
            rules: currentRules,
            plugins,
        });
        
        if (!places.length)
            return [
                SKIP,
                source,
                places,
            ];
        
        transform(ast, source, {
            rules: currentRules,
            plugins,
        });
        
        const code = print(ast, {
            printer: ['putout', {
                format: {
                    newline: '\n',
                    endOfFile: '',
                },
            }],
        });
        
        if (type === 'jsx')
            return [
                TRANSFORM,
                code,
                places,
            ];
        
        const prefix = '<template>';
        const suffix = '<\\template>\n';
        
        const result = merge('', [code])
            .slice(prefix.length, -suffix.length)
            .trim();
        
        return [
            TRANSFORM,
            result,
            places,
        ];
    };
};

function parseAccordingToType(html, type) {
    if (type === 'jsx')
        return {
            ast: parse(html),
            source: html,
        };
    
    const {source} = branch(html)[0];
    const withDiv = `<template>${source}</template>`;
    
    const ast = parse(withDiv);
    
    return {
        ast,
        source,
    };
}
