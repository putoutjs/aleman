import {test, stub} from 'supertape';
import {addGlobalListeners} from './add-listeners.js';

test('aleman: add-listeners: addGlobalListeners: name', (t) => {
    const addEventListener = stub();
    const readState = stub();
    const writeState = stub();
    const addon = {
        keys: ['Esc'],
        listener: () => ({
            index: 1,
        }),
    };
    const globalAddons = [
        addon,
    ];
    
    const document = {
        addEventListener,
    };
    
    addGlobalListeners({
        globalAddons,
        readState,
        writeState,
        document,
    });
    
    const [name] = addEventListener.args[0];
    
    t.equal(name, 'keydown');
    t.end();
});

test('aleman: add-listeners: addGlobalListeners: no addons', (t) => {
    const addEventListener = stub();
    const readState = stub();
    const writeState = stub();
    const globalAddons = [];
    
    const document = {
        addEventListener,
    };
    
    addGlobalListeners({
        globalAddons,
        readState,
        writeState,
        document,
    });
    
    t.notCalled(addEventListener);
    t.end();
});

