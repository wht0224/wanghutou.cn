'use strict';

const DIALOGUES = {
    dialogue_father_confront: [
        {
            id: 'node1',
            speaker: 'father',
            text: '文森特，你又把颜料弄得到处都是，牧师住宅不是你的画室。',
            choices: [
                {
                    text: '抱歉父亲，我马上收拾。',
                    nextNode: 'node2a',
                    effect: { type: 'emotion', value: -5 },
                    extraEffect: { type: 'item', itemName: '炭笔' }
                },
                {
                    text: '我的画室在田野，这里只是我的驿站。',
                    nextNode: 'node2b',
                    effect: { type: 'emotion', value: 10 }
                },
                {
                    text: '你从不理解我所见的真实。',
                    nextNode: 'node2c',
                    effect: { type: 'emotion', value: 15 },
                    extraEffect: { type: 'flag', key: 'familyTension', value: true }
                }
            ]
        },
        {
            id: 'node2a',
            speaker: 'father',
            text: '收拾干净，然后去祷告。',
            next: 'end'
        },
        {
            id: 'node2b',
            speaker: 'father',
            text: '驿站？你连路费都是提奥给的。摇头离去',
            next: 'end'
        },
        {
            id: 'node2c',
            speaker: 'father',
            text: '真实？你连自己都养不活。愤而出门',
            next: 'end'
        }
    ],

    dialogue_mother_comfort: [
        {
            id: 'node1',
            speaker: 'mother',
            text: '文森特，你看起来又没睡好。',
            choices: [
                {
                    text: '我梦见了矿工们的手，像树根一样。',
                    nextNode: 'node2',
                    effect: { type: 'emotion', value: 5 }
                },
                {
                    text: '没事，母亲。',
                    nextNode: 'end'
                }
            ]
        },
        {
            id: 'node2',
            speaker: 'mother',
            text: '你总是想着那些穷人，可谁来照顾你呢？',
            next: 'end'
        }
    ],

    dialogue_mother_art: [
        {
            id: 'node1',
            speaker: 'mother',
            text: '今天提奥来信了吗？他总寄来颜料。',
            choices: [
                {
                    text: '他寄来了铬黄，像一小块太阳。',
                    nextNode: 'end',
                    effect: { type: 'emotion', value: 5 }
                }
            ]
        }
    ]
};

const INTERACTABLES = {
    candle: {
        id: 'candle',
        type: 'interactive',
        name: '烛台',
        position: { x: 260, y: 90, w: 24, h: 44 }
    },
    scarlet_tube: {
        id: 'scarlet_tube',
        type: 'pickup',
        name: '猩红颜料管',
        position: { x: 40, y: 410, w: 20, h: 16 },
        hidden: true,
        visibleCondition: 'candleClicked3',
        pickupItem: '猩红',
        pickupText: '猩红取自泥土深处的铁矿，带着生涩的腥味。'
    },
    cobalt_tube: {
        id: 'cobalt_tube',
        type: 'pickup',
        name: '钴蓝颜料管',
        position: { x: 400, y: 350, w: 20, h: 16 },
        hidden: false,
        pickupItem: '钴蓝',
        pickupText: '冷峻的钴蓝，像矿工指节上的青筋。'
    },
    trash_basket: {
        id: 'trash_basket',
        type: 'interactive',
        name: '废纸篓',
        position: { x: 570, y: 400, w: 42, h: 42 }
    },
    chrome_tube: {
        id: 'chrome_tube',
        type: 'pickup',
        name: '铬黄颜料管',
        position: { x: 570, y: 380, w: 20, h: 16 },
        hidden: true,
        visibleCondition: 'chromeFound',
        pickupItem: '铬黄',
        pickupText: '弟弟寄来的铬黄，像一盏微弱的希望之灯。'
    },
    letter: {
        id: 'letter',
        type: 'interactive',
        name: '提奥的来信',
        position: { x: 510, y: 280, w: 32, h: 22 }
    },
    easel: {
        id: 'easel',
        type: 'puzzle',
        name: '画架',
        position: { x: 380, y: 200, w: 70, h: 84 },
        requiredItems: ['猩红', '钴蓝', '铬黄']
    },
    bible: {
        id: 'bible',
        type: 'interactive',
        name: '圣经',
        position: { x: 110, y: 40, w: 28, h: 22 }
    }
};

const CHARACTERS = {
    vincent: {
        id: 'vincent',
        name: '梵高',
        role: '主角',
        position: { x: 350, y: 210, w: 48, h: 64 },
        canMove: false,
        dialogues: [],
        visible: true
    },
    mother: {
        id: 'mother',
        name: '母亲',
        role: '配角',
        position: { x: 540, y: 210, w: 48, h: 64 },
        initiallyHidden: false,
        dialogues: ['dialogue_mother_comfort', 'dialogue_mother_art'],
        visible: true
    },
    father: {
        id: 'father',
        name: '父亲',
        role: '配角',
        position: { x: 80, y: 150, w: 48, h: 64 },
        initiallyHidden: true,
        dialogues: ['dialogue_father_confront'],
        visible: false
    }
};

window.DIALOGUES = DIALOGUES;
window.INTERACTABLES = INTERACTABLES;
window.CHARACTERS = CHARACTERS;
