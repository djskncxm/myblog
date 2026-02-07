'use strict';

var obsidian = require('obsidian');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var commands$3 = {
	"Format Document": "Dokument formatieren"
};
var editorMenu$3 = {
	"Format Document": "Dokument formatieren"
};
var ribbonIcons$3 = {
	"Format Document": "Dokument formatieren"
};
var noticeMessages$3 = {
	"Document Formatted!": "",
	"Document is already formatted!": "",
	"No open document is found.": "",
	"You can only format in editing mode.": "",
	"Please enter a valid number.\nIt must be at least 0.": "",
	"Please enter a valid number.\nIt must be a whole number.": ""
};
var optionWarnings$3 = {
	"Gap value must be a whole number and it needs to be at least 0.": ""
};
var placeholders$3 = {
	"(Default)": ""
};
var optionSections$3 = {
	"Heading gaps": "",
	"Other gaps": "",
	"Format options": "",
	"Other options": ""
};
var headingGaps$3 = {
	"Before top-level headings": "",
	"Decides the gap before a top-level heading.": "",
	"Before the first sub-level heading": "",
	"Decides the child heading gap right after a parent heading.": "",
	"Before sub-level headings": "",
	"Decides gaps before headings that are not top-level.": ""
};
var otherGaps$3 = {
	"After properties": "",
	"Decides the gap after a property section.": "",
	"Before contents": "",
	"Decides gaps before content sections. (ex: Text before headings)": "",
	"Before contents after code blocks": "",
	"Decides gaps before \"contents that are after code blocks.\"": "",
	"Before code blocks": "",
	"Decides gaps before code blocks.": "",
	"Before code blocks after headings": "",
	"Decides gaps before \"code blocks that are after headings.\"": ""
};
var formatOptions$3 = {
	"Newline at the end of a document": "",
	"Inserts a newline at the end of a document.": ""
};
var otherOptions$3 = {
	"Notify when no change is needed": "",
	"Displays a different message when no change is needed.": "",
	"More detailed error message": "",
	"Displays additional information when parsing fails.": "",
	"Format documents on modification": "",
	"Automatically format documents after each modification. Triggers on save and autosave.": ""
};
var wasm$4 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "",
		"Failed to parse the document.": ""
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": ""
	}
};
var de = {
	commands: commands$3,
	editorMenu: editorMenu$3,
	ribbonIcons: ribbonIcons$3,
	noticeMessages: noticeMessages$3,
	optionWarnings: optionWarnings$3,
	placeholders: placeholders$3,
	optionSections: optionSections$3,
	headingGaps: headingGaps$3,
	otherGaps: otherGaps$3,
	formatOptions: formatOptions$3,
	otherOptions: otherOptions$3,
	wasm: wasm$4
};

var commands$2 = {
	"Format Document": "Format Document"
};
var editorMenu$2 = {
	"Format Document": "Format Document"
};
var ribbonIcons$2 = {
	"Format Document": "Format Document"
};
var noticeMessages$2 = {
	"Document Formatted!": "Document Formatted!",
	"Document is already formatted!": "Document is already formatted!",
	"No open document is found.": "No open document is found.",
	"You can only format in editing mode.": "You can only format in editing mode.",
	"Please enter a valid number.\nIt must be at least 0.": "Please enter a valid number.\nIt must be at least 0.",
	"Please enter a valid number.\nIt must be a whole number.": "Please enter a valid number.\nIt must be a whole number."
};
var optionWarnings$2 = {
	"Gap value must be a whole number and it needs to be at least 0.": "Gap value must be a whole number and it needs to be at least 0."
};
var placeholders$2 = {
	"(Default)": "(Default)"
};
var optionSections$2 = {
	"Heading gaps": "Heading gaps",
	"Other gaps": "Other gaps",
	"Format options": "Format options",
	"Other options": "Other options"
};
var headingGaps$2 = {
	"Before top-level headings": "Before top-level headings",
	"Decides the gap before a top-level heading.": "Decides the gap before a top-level heading.",
	"Before the first sub-level heading": "Before the first sub-level heading",
	"Decides the child heading gap right after a parent heading.": "Decides the child heading gap right after a parent heading.",
	"Before sub-level headings": "Before sub-level headings",
	"Decides gaps before headings that are not top-level.": "Decides gaps before headings that are not top-level."
};
var otherGaps$2 = {
	"After properties": "After properties",
	"Decides the gap after a property section.": "Decides the gap after a property section.",
	"Before contents": "Before contents",
	"Decides gaps before content sections. (ex: Text before headings)": "Decides gaps before content sections. (ex: Text before headings)",
	"Before contents after code blocks": "Before contents after code blocks",
	"Decides gaps before \"contents that are after code blocks.\"": "Decides gaps before \"contents that are after code blocks.\"",
	"Before code blocks": "Before code blocks",
	"Decides gaps before code blocks.": "Decides gaps before code blocks.",
	"Before code blocks after headings": "Before code blocks after headings",
	"Decides gaps before \"code blocks that are after headings.\"": "Decides gaps before \"code blocks that are after headings.\""
};
var formatOptions$2 = {
	"Newline at the end of a document": "Newline at the end of a document",
	"Inserts a newline at the end of a document.": "Inserts a newline at the end of a document."
};
var otherOptions$2 = {
	"Notify when no change is needed": "Notify when no change is needed",
	"Displays a different message when no change is needed.": "Displays a different message when no change is needed.",
	"More detailed error message": "More detailed error message",
	"Displays additional information when parsing fails.": "Displays additional information when parsing fails.",
	"Format documents on modification": "Format documents on modification",
	"Automatically format documents after each modification. Triggers on save and autosave.": "Automatically format documents after each modification. Triggers on save and autosave."
};
var wasm$3 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "Failed to parse the document. [Line: {LINE_NUMBER}]",
		"Failed to parse the document.": "Failed to parse the document."
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": "Failed to read options. Some of them are possibly not positive number values."
	}
};
var en = {
	commands: commands$2,
	editorMenu: editorMenu$2,
	ribbonIcons: ribbonIcons$2,
	noticeMessages: noticeMessages$2,
	optionWarnings: optionWarnings$2,
	placeholders: placeholders$2,
	optionSections: optionSections$2,
	headingGaps: headingGaps$2,
	otherGaps: otherGaps$2,
	formatOptions: formatOptions$2,
	otherOptions: otherOptions$2,
	wasm: wasm$3
};

var commands$1 = {
	"Format Document": "Dokumentum formázása"
};
var editorMenu$1 = {
	"Format Document": "Dokumentum formázása"
};
var ribbonIcons$1 = {
	"Format Document": "Dokumentum formázása"
};
var noticeMessages$1 = {
	"Document Formatted!": "A dokumentum meg lett formázva!",
	"Document is already formatted!": "A dokumentum már meg van formázva!",
	"No open document is found.": "Nem található megnyitott dokumentum.",
	"You can only format in editing mode.": "A formázás csakis a szerkesztői módban lehetséges. ",
	"Please enter a valid number.\nIt must be at least 0.": "Kérlek egy megfelelő számot írjál be.\nLegalább 0 legyen.",
	"Please enter a valid number.\nIt must be a whole number.": "Kérlek egy megfelelő számot írjál be.\nEgész szám legyen."
};
var optionWarnings$1 = {
	"Gap value must be a whole number and it needs to be at least 0.": ""
};
var placeholders$1 = {
	"(Default)": "(Alapértelmezett)"
};
var optionSections$1 = {
	"Heading gaps": "Fejléc hézagok",
	"Other gaps": "Egyéb hézagok",
	"Format options": "Formázási opciók",
	"Other options": "Egyéb opciók"
};
var headingGaps$1 = {
	"Before top-level headings": "",
	"Decides the gap before a top-level heading.": "",
	"Before the first sub-level heading": "",
	"Decides the child heading gap right after a parent heading.": "",
	"Before sub-level headings": "",
	"Decides gaps before headings that are not top-level.": ""
};
var otherGaps$1 = {
	"After properties": "Tulajdonságok után",
	"Decides the gap after a property section.": "Meghatározza a hézagot a tulajdonságok szekció után.",
	"Before contents": "Tartalmak előtt",
	"Decides gaps before content sections. (ex: Text before headings)": "",
	"Before contents after code blocks": "Tartalmak előtti kód részek",
	"Decides gaps before \"contents that are after code blocks.\"": "Meghatározza azon tartalmi hézagokat, melyek kód részek előtt vannak.",
	"Before code blocks": "Kód részek előtt",
	"Decides gaps before code blocks.": "Meghatározza a hézagot kód részek előtt.",
	"Before code blocks after headings": "Kód részek előtt, a címsorok előtt",
	"Decides gaps before \"code blocks that are after headings.\"": "Meghatározza azon kód részi hézagokat, melyek címsorok után vannak."
};
var formatOptions$1 = {
	"Newline at the end of a document": "Új sor a dokumentum végére.",
	"Inserts a newline at the end of a document.": "Beszúr egy új sort a dokumentum végére."
};
var otherOptions$1 = {
	"Notify when no change is needed": "Értesítsen, hogyha nem szükséges változás",
	"Displays a different message when no change is needed.": "Eltérő üzenetet mutat, hogyha nem történt változás",
	"More detailed error message": "Mutasson részletesebb hiba üzeneteket",
	"Displays additional information when parsing fails.": "Plusz információt mutat, amikor az átírás közben hiba történik.",
	"Format documents on modification": "",
	"Automatically format documents after each modification. Triggers on save and autosave.": ""
};
var wasm$2 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "",
		"Failed to parse the document.": ""
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": ""
	}
};
var hu = {
	commands: commands$1,
	editorMenu: editorMenu$1,
	ribbonIcons: ribbonIcons$1,
	noticeMessages: noticeMessages$1,
	optionWarnings: optionWarnings$1,
	placeholders: placeholders$1,
	optionSections: optionSections$1,
	headingGaps: headingGaps$1,
	otherGaps: otherGaps$1,
	formatOptions: formatOptions$1,
	otherOptions: otherOptions$1,
	wasm: wasm$2
};

var commands = {
	"Format Document": "문서 포맷하기"
};
var editorMenu = {
	"Format Document": "문서 포맷하기"
};
var ribbonIcons = {
	"Format Document": "문서 포맷하기"
};
var noticeMessages = {
	"Document Formatted!": "포맷 완료!",
	"Document is already formatted!": "문서가 이미 포맷돼 있습니다.",
	"No open document is found.": "열려 있는 문서를 찾지 못했습니다.",
	"You can only format in editing mode.": "편집 모드에서만 포맷할 수 있습니다.",
	"Please enter a valid number.\nIt must be at least 0.": "유효한 숫자를 입력해주세요.\n0 이상만 입력할 수 있습니다.",
	"Please enter a valid number.\nIt must be a whole number.": "유효한 숫자를 입력해주세요.\n자연수만 입력할 수 있습니다."
};
var optionWarnings = {
	"Gap value must be a whole number and it needs to be at least 0.": "여백 옵션의 값은 반드시 자연수이고 0 이상이어야 합니다."
};
var placeholders = {
	"(Default)": "(기본값)"
};
var optionSections = {
	"Heading gaps": "제목 여백",
	"Other gaps": "기타 여백",
	"Format options": "포맷 옵션",
	"Other options": "기타 옵션"
};
var headingGaps = {
	"Before top-level headings": "최상위 제목 앞",
	"Decides the gap before a top-level heading.": "최상위 제목들의 앞 여백을 결정합니다.",
	"Before the first sub-level heading": "첫 번째 하위 제목 앞",
	"Decides the child heading gap right after a parent heading.": "부모 제목 바로 뒤 자식 제목의 여백을 결정합니다.",
	"Before sub-level headings": "하위 제목 앞",
	"Decides gaps before headings that are not top-level.": "최상위 제목이 아닌 제목들의 앞 여백을 결정합니다."
};
var otherGaps = {
	"After properties": "속성 영역 뒤",
	"Decides the gap after a property section.": "속성 영역 뒤 여백을 결정합니다.",
	"Before contents": "내용 영역 앞",
	"Decides gaps before content sections. (ex: Text before headings)": "내용 영역의 앞 여백을 결정합니다. (예: 제목 앞 텍스트)",
	"Before contents after code blocks": "코드 블럭 뒤 내용 영역 앞",
	"Decides gaps before \"contents that are after code blocks.\"": "\"코드 블럭 뒤 내용 영역\"의 앞 여백을 결정합니다.",
	"Before code blocks": "코드 블럭 앞",
	"Decides gaps before code blocks.": "코드 블럭의 앞 여백을 결정합니다.",
	"Before code blocks after headings": "제목 뒤 코드 블럭 앞",
	"Decides gaps before \"code blocks that are after headings.\"": "\"제목 뒤 코드 블럭\"의 앞 여백을 결정합니다."
};
var formatOptions = {
	"Newline at the end of a document": "문서 끝 새 줄",
	"Inserts a newline at the end of a document.": "문서 끝에 새 줄을 추가합니다."
};
var otherOptions = {
	"Notify when no change is needed": "변경사항이 없을 때 알려주기",
	"Displays a different message when no change is needed.": "변경할 사항이 없으면 다른 메세지를 표시합니다.",
	"More detailed error message": "더 자세한 에러 메세지",
	"Displays additional information when parsing fails.": "문서를 읽지 못했을 때 추가 정보를 표시합니다.",
	"Format documents on modification": "수정 시 문서 포맷하기",
	"Automatically format documents after each modification. Triggers on save and autosave.": "매 수정 마다 문서를 자동으로 포맷합니다. 저장 및 자동 저장 시 활성화됩니다."
};
var wasm$1 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "문서를 읽지 못했습니다. [줄: {LINE_NUMBER}]",
		"Failed to parse the document.": "문서를 읽지 못했습니다."
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": "설정을 읽지 못했습니다. 양수가 아닌 값이 있을수도 있습니다."
	}
};
var ko = {
	commands: commands,
	editorMenu: editorMenu,
	ribbonIcons: ribbonIcons,
	noticeMessages: noticeMessages,
	optionWarnings: optionWarnings,
	placeholders: placeholders,
	optionSections: optionSections,
	headingGaps: headingGaps,
	otherGaps: otherGaps,
	formatOptions: formatOptions,
	otherOptions: otherOptions,
	wasm: wasm$1
};

const detectedLanguage = window.localStorage.getItem("language");
const LOCALE_CATEGORY = {
    COMMANDS: "commands",
    EDITOR_MENU: "editorMenu",
    RIBBON_ICONS: "ribbonIcons",
    NOTICE_MESSAGES: "noticeMessages",
    OPTION_WARNINGS: "optionWarnings",
    PLACEHOLDERS: "placeholders",
    OPTION_SECTIONS: "optionSections",
    HEADING_GAPS: "headingGaps",
    OTHER_GAPS: "otherGaps",
    FORMAT_OPTIONS: "formatOptions",
    OTHER_OPTIONS: "otherOptions",
};
const locales = {
    en: en,
    de: de,
    hu: hu,
    ko: ko,
};
/** @example getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document") */
const getLocale = (category, key) => {
    var _a;
    const usingLocale = (_a = locales[detectedLanguage]) !== null && _a !== void 0 ? _a : locales.en;
    const message = usingLocale[category][key];
    if (message === "") {
        const usingLocale = locales.en;
        return usingLocale[category][key];
    }
    return usingLocale[category][key];
};
/** Returns the "wasm" object in the locale file. */
const getWasmLocale = () => {
    var _a;
    const usingLocale = (_a = locales[detectedLanguage]) !== null && _a !== void 0 ? _a : locales.en;
    return usingLocale.wasm;
};

class FormattoCommands {
    constructor(plugin) {
        this.plugin = plugin;
    }
    registerCommands() {
        this.getCommandsArr().forEach((item) => {
            this.plugin.addCommand(item);
        });
    }
    getCommandsArr() {
        return [
            {
                id: "formatto-logo",
                name: getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document"),
                icon: "formatto-logo",
                editorCallback: (editor) => {
                    this.plugin.utils.formatDocument(editor);
                },
            },
        ];
    }
}

var formattoLogo = "<svg class=\"formatto__custom-icons\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect x=\"2\" y=\"2\" width=\"6.65444\" height=\"3.02\" rx=\"0.5\" />\n<rect x=\"2\" y=\"6.31047\" width=\"12.0693\" height=\"3.44838\" rx=\"0.5\" />\n<rect x=\"10.621\" y=\"2\" width=\"3.44838\" height=\"6.03466\" rx=\"0.5\" />\n<rect x=\"2.03467\" y=\"11\" width=\"6.98996\" height=\"3.01966\" rx=\"0.5\" />\n</svg>";

class FormattoIcons {
    constructor() {
        this.icons = [{ iconId: "formatto-logo", svg: formattoLogo }];
        this.registerIcons = () => {
            this.icons.forEach(({ iconId, svg }) => {
                obsidian.addIcon(iconId, svg);
            });
        };
    }
}

class FormattoRibbonIcons {
    constructor(plugin) {
        this.registerRibbonIcons = () => {
            this.plugin.addRibbonIcon("formatto-logo", getLocale(LOCALE_CATEGORY.RIBBON_ICONS, "Format Document"), () => {
                var _a;
                const editor = (_a = this.plugin.app.workspace.activeEditor) === null || _a === void 0 ? void 0 : _a.editor;
                const activeView = this.plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                if (!editor) {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "No open document is found."));
                    return;
                }
                if (activeView.getMode() !== "source") {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "You can only format in editing mode."));
                    return;
                }
                this.plugin.utils.formatDocument(editor);
            });
        };
        this.plugin = plugin;
    }
}

let wasm;

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
 * This function will be called from the TypeScript side.
 * @param {string} input
 * @param {any} js_options
 * @param {any} js_locales
 * @returns {string}
 */
function format_document(input, js_options, js_locales) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.format_document(ptr0, len0, js_options, js_locales);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
        const ret = String(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_error_0d0672b11a7fc34f = function(arg0, arg1) {
        console.error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = arg0 in arg1;
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = arg0 == arg1;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path);
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead');
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('formatto_wasm_bg.wasm', (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('main.js', document.baseURI).href)));
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

/*
  Type Declarations
*/
/*
  Fallback Option Values
*/
const FALLBACK_HEADING_GAPS = {
    beforeTopLevelHeadings: "3",
    beforeFirstSubHeading: "1",
    beforeSubHeadings: "2",
};
const FALLBACK_OTHER_GAPS = {
    afterProperties: "2",
    beforeContents: "0",
    beforeContentsAfterCodeBlocks: "1",
    beforeCodeBlocks: "1",
    beforeCodeBlocksAfterHeadings: "0",
};
const FALLBACK_FORMAT_OPTIONS = {
    insertNewline: true,
};
const FALLBACK_OTHER_OPTIONS = {
    notifyWhenUnchanged: true,
    showMoreDetailedErrorMessages: false,
    formatOnSave: false,
};
const FALLBACK_OPTIONS = {
    headingGaps: FALLBACK_HEADING_GAPS,
    otherGaps: FALLBACK_OTHER_GAPS,
    formatOptions: FALLBACK_FORMAT_OPTIONS,
    otherOptions: FALLBACK_OTHER_OPTIONS,
};
/*
  Default Option Values
*/
const EMPTY_HEADING_GAPS = {
    beforeTopLevelHeadings: "",
    beforeFirstSubHeading: "",
    beforeSubHeadings: "",
};
const EMPTY_OTHER_GAPS = {
    afterProperties: "",
    beforeContents: "",
    beforeContentsAfterCodeBlocks: "",
    beforeCodeBlocks: "",
    beforeCodeBlocksAfterHeadings: "",
};
const DEFAULT_OPTIONS = {
    headingGaps: EMPTY_HEADING_GAPS,
    otherGaps: EMPTY_OTHER_GAPS,
    formatOptions: FALLBACK_FORMAT_OPTIONS,
    otherOptions: FALLBACK_OTHER_OPTIONS,
};

class FormattoUtils {
    constructor(plugin) {
        this.plugin = plugin;
    }
    formatDocument(editor) {
        const copiedOptions = JSON.parse(JSON.stringify(this.plugin.settings));
        this.handleEmptyOptions(copiedOptions);
        this.cursorPosition = editor.getCursor();
        this.originalDocument = editor.getValue();
        try {
            this.formattedDocument = format_document(this.originalDocument, copiedOptions, JSON.stringify(getWasmLocale()));
            this.displayMessage();
        }
        catch (error) {
            new obsidian.Notice(error);
        }
        if (!this.formattedDocument)
            return;
        if (this.formattedDocument !== this.originalDocument) {
            editor.setValue(this.formattedDocument);
            editor.setSelection(this.cursorPosition, this.cursorPosition);
        }
        this.clearVariables();
    }
    formatText(data) {
        const copiedOptions = JSON.parse(JSON.stringify(this.plugin.settings));
        this.handleEmptyOptions(copiedOptions);
        this.originalDocument = data;
        try {
            this.formattedDocument = format_document(this.originalDocument, copiedOptions, JSON.stringify(getWasmLocale()));
            return this.formattedDocument;
        }
        catch (error) {
            new obsidian.Notice(error);
        }
        finally {
            this.clearVariables();
        }
    }
    displayMessage() {
        if (this.plugin.settings.otherOptions.notifyWhenUnchanged &&
            this.formattedDocument === this.originalDocument) {
            new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Document is already formatted!"));
        }
        else {
            new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Document Formatted!"));
        }
    }
    handleEmptyOptions(copiedOptions) {
        for (const sectionKey of Object.keys(copiedOptions)) {
            for (const optionKey of Object.keys(copiedOptions[sectionKey])) {
                if (copiedOptions[sectionKey][optionKey] === "") {
                    copiedOptions[sectionKey][optionKey] =
                        FALLBACK_OPTIONS[sectionKey][optionKey];
                }
            }
        }
    }
    clearVariables() {
        this.cursorPosition = undefined;
        this.originalDocument = undefined;
        this.formattedDocument = undefined;
    }
}

class FormattoEditorMenuEvent {
    constructor(plugin) {
        this.plugin = plugin;
    }
    registerEvents() {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }
    getEventsArr() {
        return [
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) => item
                    .setTitle(getLocale(LOCALE_CATEGORY.EDITOR_MENU, "Format Document"))
                    .setIcon("formatto-logo")
                    .onClick(() => {
                    this.plugin.utils.formatDocument(editor);
                }));
            }),
        ];
    }
}

class FormattoModifyEvent {
    constructor(plugin) {
        this.timer = null;
        this.timerDelay = 1000;
        this.plugin = plugin;
    }
    registerEvents() {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }
    getEventsArr() {
        return [
            this.plugin.app.vault.on("modify", (file) => {
                this.timer = setTimeout(() => {
                    if (this.plugin.settings.otherOptions.formatOnSave &&
                        file instanceof obsidian.TFile &&
                        file.extension === "md") {
                        this.plugin.app.vault.process(file, (data) => {
                            return this.plugin.utils.formatText(data);
                        });
                    }
                }, this.timerDelay);
            }),
            this.plugin.app.workspace.on("editor-change", () => {
                clearTimeout(this.timer);
            }),
        ];
    }
}

class FormattoOptionTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.noticeMessages = {
            invalidNumberMessage: getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Please enter a valid number.\nIt must be at least 0."),
            notWholeNumberMessage: getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Please enter a valid number.\nIt must be a whole number."),
        };
        this.plugin = plugin;
    }
    checkDecimal(value) {
        return value !== "0" && value !== "1" && parseFloat(value) % 1 !== 0;
    }
    putDefaultIndicator(value) {
        return `${value} ${getLocale(LOCALE_CATEGORY.PLACEHOLDERS, "(Default)")}`;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        const debounceMsg = obsidian.debounce((value) => {
            if (value !== "") {
                // Check if the value is a valid number
                if (isNaN(parseInt(value)) || parseInt(value) < 0) {
                    new obsidian.Notice(this.noticeMessages.invalidNumberMessage);
                    return;
                }
                // Check if the value is a whole number
                if (this.checkDecimal(value)) {
                    new obsidian.Notice(this.noticeMessages.notWholeNumberMessage);
                    return;
                }
            }
        }, 1000, true);
        containerEl.createDiv({}, (div) => {
            div.innerHTML = `<div style="color: var(--text-accent)">
                ${getLocale(LOCALE_CATEGORY.OPTION_WARNINGS, "Gap value must be a whole number and it needs to be at least 0.")}
            </div>`;
            div.className = "setting-item setting-item-description";
        });
        // Heading Gaps
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Heading gaps"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Before top-level headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Decides the gap before a top-level heading."))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.headingGaps.beforeTopLevelHeadings))
            .setValue(this.plugin.settings.headingGaps.beforeTopLevelHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.headingGaps.beforeTopLevelHeadings =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Before the first sub-level heading"))
            .setDesc(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Decides the child heading gap right after a parent heading."))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.headingGaps.beforeFirstSubHeading))
            .setValue(this.plugin.settings.headingGaps.beforeFirstSubHeading)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.headingGaps.beforeFirstSubHeading =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Before sub-level headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Decides gaps before headings that are not top-level."))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.headingGaps.beforeSubHeadings))
            .setValue(this.plugin.settings.headingGaps.beforeSubHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.headingGaps.beforeSubHeadings =
                value;
            yield this.plugin.saveOptions();
        })));
        // Other Gaps
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Other gaps"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "After properties"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Decides the gap after a property section."))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps.afterProperties))
            .setValue(this.plugin.settings.otherGaps.afterProperties)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.afterProperties = value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Decides gaps before content sections. (ex: Text before headings)"))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps.beforeContents))
            .setValue(this.plugin.settings.otherGaps.beforeContents)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeContents = value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents after code blocks"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "contents that are after code blocks."' // eslint-disable-line
        ))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps
            .beforeContentsAfterCodeBlocks))
            .setValue(this.plugin.settings.otherGaps
            .beforeContentsAfterCodeBlocks)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeContentsAfterCodeBlocks =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before code blocks"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Decides gaps before code blocks."))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps.beforeCodeBlocks))
            .setValue(this.plugin.settings.otherGaps.beforeCodeBlocks)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeCodeBlocks = value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before code blocks after headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "code blocks that are after headings."'))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps
            .beforeCodeBlocksAfterHeadings))
            .setValue(this.plugin.settings.otherGaps
            .beforeCodeBlocksAfterHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeCodeBlocksAfterHeadings =
                value;
            yield this.plugin.saveOptions();
        })));
        // Format Options
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Format options"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.FORMAT_OPTIONS, "Newline at the end of a document"))
            .setDesc(getLocale(LOCALE_CATEGORY.FORMAT_OPTIONS, "Inserts a newline at the end of a document."))
            .addToggle((text) => text
            .setValue(this.plugin.settings.formatOptions.insertNewline)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.formatOptions.insertNewline =
                value;
            yield this.plugin.saveOptions();
        })));
        // Other Options
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Other options"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Notify when no change is needed"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Displays a different message when no change is needed."))
            .addToggle((text) => text
            .setValue(this.plugin.settings.otherOptions.notifyWhenUnchanged)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.otherOptions.notifyWhenUnchanged =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "More detailed error message"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Displays additional information when parsing fails."))
            .addToggle((text) => text
            .setValue(this.plugin.settings.otherOptions
            .showMoreDetailedErrorMessages)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.otherOptions.showMoreDetailedErrorMessages =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Format documents on modification"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Automatically format documents after each modification. Triggers on save and autosave."))
            .addToggle((text) => text
            .setValue(this.plugin.settings.otherOptions
            .formatOnSave)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.otherOptions.formatOnSave =
                value;
            yield this.plugin.saveOptions();
        })));
    }
}

function _loadWasmModule (sync, filepath, src, imports) {
  function _instantiateOrCompile(source, imports, stream) {
    var instantiateFunc = stream ? WebAssembly.instantiateStreaming : WebAssembly.instantiate;
    var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

    if (imports) {
      return instantiateFunc(source, imports)
    } else {
      return compileFunc(source)
    }
  }

  
var buf = null;
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (isNode) {
  
buf = Buffer.from(src, 'base64');

} else {
  
var raw = globalThis.atob(src);
var rawLength = raw.length;
buf = new Uint8Array(new ArrayBuffer(rawLength));
for(var i = 0; i < rawLength; i++) {
   buf[i] = raw.charCodeAt(i);
}

}


  {
    return _instantiateOrCompile(buf, imports, false)
  }
}

function formatto_wasm(imports){return _loadWasmModule(0, null, 'AGFzbQEAAAAB+QEkYAJ/fwF/YAJ/fwBgA39/fwF/YAN/f38AYAF/AGABfwF/YAR/f39/AGAFf39/f38AYAFvAX9gBH9/f38Bf2ACf28AYAABf2AFf39/fn8AYAZ/f39/f38AYAV/f39/fwF/YAJvbwF/YAJ/fwFvYAFvAW9gAABgBn9/f39/fwF/YAd/f39/f39/AGACb28Bb2ADb29/AGAAAW9gCX9/f39/f35+fgBgB39/f39/f38Bf2ADfn9/AX9gBH9/f34AYAR/f29vAn9/YAACf39gBX9/fn9/AGAEf35/fwBgBX9/fH9/AGAEf3x/fwBgBX9/fX9/AGAEf31/fwAC0AUWA3diZxVfX3diaW5kZ2VuX3N0cmluZ19nZXQACgN3YmcXX193YmluZGdlbl9pc191bmRlZmluZWQACAN3YmcNX193YmluZGdlbl9pbgAPA3diZxZfX3diaW5kZ2VuX2Jvb2xlYW5fZ2V0AAgDd2JnFF9fd2JpbmRnZW5faXNfb2JqZWN0AAgDd2JnHF9fd2JnX2Vycm9yXzBkMDY3MmIxMWE3ZmMzNGYAAQN3YmcZX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcQAPA3diZxVfX3diaW5kZ2VuX251bWJlcl9nZXQACgN3YmcdX193YmdfU3RyaW5nXzhmMGViMzlhNGE0YzJmNjYACgN3YmcUX193YmluZGdlbl9lcnJvcl9uZXcAEAN3YmcVX193YmluZGdlbl9zdHJpbmdfbmV3ABADd2JnJF9fd2JnX2dldHdpdGhyZWZrZXlfMWRjMzYxYmQxMDA1M2JmZQAVA3diZy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyX2UxNDU4NTQzMmUzNzM3ZmMACAN3YmcdX193YmdfYnVmZmVyXzYwOWNjM2VlZTUxZWQxNTgAEQN3YmcaX193YmdfbmV3X2ExMjAwMmE3ZjkxYzc1YmUAEQN3YmcaX193Ymdfc2V0XzY1NTk1YmRkODY4YjMwMDkAFgN3YmcdX193YmdfbGVuZ3RoX2E0NDYxOTNkYzIyYzEyZjgACAN3YmcsX193YmdfaW5zdGFuY2VvZl9VaW50OEFycmF5XzE3MTU2YmNmMTE4MDg2YTkACAN3YmcXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcACgN3YmcQX193YmluZGdlbl90aHJvdwABA3diZxFfX3diaW5kZ2VuX21lbW9yeQAXA3diZx9fX3diaW5kZ2VuX2luaXRfZXh0ZXJucmVmX3RhYmxlABIDhAKCAgUBBwEAAgMCEwcDAgQBAAICAAIAAgIAAwEBAAMUFAMMAQMCDAMYAAEGGQABBg0ABwAaAAADAAIBAAAAAwEBAQEABgwNAQEAAQADAAEGABsLAgUBAwMDAAEGAQcGBgsBAQYDAQACAAABBAcEBAQBAAcBAQ0DAwEBAwIAAAMBAAMCAxICAgABAgEHAQECBAMDAAEEAAQOAAQEBAAACQACARwEAQYCAQELCxMABw4eICIBCQkEAAYEAAIABQQEAwQDBAUJAwACAAcBAQAAAwUAAQAAAAEBAQABAAADAwADBAAABQQAAAAAAAAAAAAAAAABAAEAAAEBAAIDAQAAAQAFBQUFAwQJAnABcnJvAIABBQMBABEGCQF/AUGAgMAACweEAQcGbWVtb3J5AgAPZm9ybWF0X2RvY3VtZW50ALUBEV9fd2JpbmRnZW5fbWFsbG9jAKUBEl9fd2JpbmRnZW5fcmVhbGxvYwCxARNfX3diaW5kZ2VuX2V4cG9ydF8yAQEPX193YmluZGdlbl9mcmVlANgBEF9fd2JpbmRnZW5fc3RhcnQAFQnXAQIAQQELcecB9wGzAVCCAvgBkAKPAvsB/QH8AfoB/gF+gQJekgHkAd0BkgGXAtMBhAGvAZEC3gH5AfcBswFO/wHJAd8B2wEkebIBzwHNAcoBwAHAAcQBwQHAAcIBiAHDAcEBvgHxAU/lAdABmAFGgALQAZgBScwB9AFAbFbmAagBes4BgwLfAdUBRN8B5wGLAdABmQFLhQLoAekB6wGfAeoBhgLIAXxbb5EC0AGhAUiHAtAB3wHlAZEC7AGKApcCiALZAdsB7QHuASd7XCqaAYsCAEHyAAsACvmhBoIChCQCCX8BfiMAQRBrIggkAAJ/AkACQAJAAkACQAJAIABB9QFPBEBBACAAQc3/e08NBxogAEELaiIBQXhxIQVBuKfBACgCACIJRQ0EQR8hB0EAIAVrIQQgAEH0//8HTQRAIAVBBiABQQh2ZyIAa3ZBAXEgAEEBdGtBPmohBwsgB0ECdEGcpMEAaigCACIBRQRAQQAhAAwCC0EAIQAgBUEZIAdBAXZrQQAgB0EfRxt0IQMDQAJAIAEoAgRBeHEiBiAFSQ0AIAYgBWsiBiAETw0AIAEhAiAGIgQNAEEAIQQgASEADAQLIAEoAhQiBiAAIAYgASADQR12QQRxakEQaigCACIBRxsgACAGGyEAIANBAXQhAyABDQALDAELQbSnwQAoAgAiAkEQIABBC2pB+ANxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIGQQN0IgBBrKXBAGoiAyAAQbSlwQBqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQbSnwQAgAkF+IAZ3cTYCAAsgASAAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEIAFBCGoMBwsgBUG8p8EAKAIATQ0DAkACQCABRQRAQbinwQAoAgAiAEUNBiAAaEECdEGcpMEAaigCACICKAIEQXhxIAVrIQQgAiEBA0ACQCACKAIQIgANACACKAIUIgANACABKAIYIQcCQAJAIAEgASgCDCIARgRAIAFBFEEQIAEoAhQiABtqKAIAIgINAUEAIQAMAgsgASgCCCICIAA2AgwgACACNgIIDAELIAFBFGogAUEQaiAAGyEDA0AgAyEGIAIiAEEUaiAAQRBqIAAoAhQiAhshAyAAQRRBECACG2ooAgAiAg0ACyAGQQA2AgALIAdFDQQgASABKAIcQQJ0QZykwQBqIgIoAgBHBEAgB0EQQRQgBygCECABRhtqIAA2AgAgAEUNBQwECyACIAA2AgAgAA0DQbinwQBBuKfBACgCAEF+IAEoAhx3cTYCAAwECyAAKAIEQXhxIAVrIgIgBCACIARJIgIbIQQgACABIAIbIQEgACECDAALAAsCQEECIAB0IgNBACADa3IgASAAdHFoIgZBA3QiAUGspcEAaiIDIAFBtKXBAGooAgAiACgCCCIERwRAIAQgAzYCDCADIAQ2AggMAQtBtKfBACACQX4gBndxNgIACyAAIAVBA3I2AgQgACAFaiIGIAEgBWsiA0EBcjYCBCAAIAFqIAM2AgBBvKfBACgCACIEBEAgBEF4cUGspcEAaiEBQcSnwQAoAgAhAgJ/QbSnwQAoAgAiBUEBIARBA3Z0IgRxRQRAQbSnwQAgBCAFcjYCACABDAELIAEoAggLIQQgASACNgIIIAQgAjYCDCACIAE2AgwgAiAENgIIC0HEp8EAIAY2AgBBvKfBACADNgIAIABBCGoMCAsgACAHNgIYIAEoAhAiAgRAIAAgAjYCECACIAA2AhgLIAEoAhQiAkUNACAAIAI2AhQgAiAANgIYCwJAAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgMgBEEBcjYCBCADIARqIAQ2AgBBvKfBACgCACIGRQ0BIAZBeHFBrKXBAGohAEHEp8EAKAIAIQICf0G0p8EAKAIAIgVBASAGQQN2dCIGcUUEQEG0p8EAIAUgBnI2AgAgAAwBCyAAKAIICyEGIAAgAjYCCCAGIAI2AgwgAiAANgIMIAIgBjYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAwBC0HEp8EAIAM2AgBBvKfBACAENgIACyABQQhqDAYLIAAgAnJFBEBBACECQQIgB3QiAEEAIABrciAJcSIARQ0DIABoQQJ0QZykwQBqKAIAIQALIABFDQELA0AgACACIAAoAgRBeHEiAyAFayIGIARJIgcbIQkgACgCECIBRQRAIAAoAhQhAQsgAiAJIAMgBUkiABshAiAEIAYgBCAHGyAAGyEEIAEiAA0ACwsgAkUNACAFQbynwQAoAgAiAE0gBCAAIAVrT3ENACACKAIYIQcCQAJAIAIgAigCDCIARgRAIAJBFEEQIAIoAhQiABtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAJBFGogAkEQaiAAGyEDA0AgAyEGIAEiAEEUaiAAQRBqIAAoAhQiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQIgAiACKAIcQQJ0QZykwQBqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNAwwCCyABIAA2AgAgAA0BQbinwQBBuKfBACgCAEF+IAIoAhx3cTYCAAwCCwJAAkACQAJAAkAgBUG8p8EAKAIAIgFLBEAgBUHAp8EAKAIAIgBPBEAgBUGvgARqQYCAfHEiAkEQdkAAIQAgCEEEaiIBQQA2AgggAUEAIAJBgIB8cSAAQX9GIgIbNgIEIAFBACAAQRB0IAIbNgIAQQAgCCgCBCIBRQ0JGiAIKAIMIQZBzKfBACAIKAIIIgRBzKfBACgCAGoiADYCAEHQp8EAQdCnwQAoAgAiAiAAIAAgAkkbNgIAAkACQEHIp8EAKAIAIgIEQEGcpcEAIQADQCABIAAoAgAiAyAAKAIEIgdqRg0CIAAoAggiAA0ACwwCC0HYp8EAKAIAIgBBACAAIAFNG0UEQEHYp8EAIAE2AgALQdynwQBB/x82AgBBqKXBACAGNgIAQaClwQAgBDYCAEGcpcEAIAE2AgBBuKXBAEGspcEANgIAQcClwQBBtKXBADYCAEG0pcEAQaylwQA2AgBByKXBAEG8pcEANgIAQbylwQBBtKXBADYCAEHQpcEAQcSlwQA2AgBBxKXBAEG8pcEANgIAQdilwQBBzKXBADYCAEHMpcEAQcSlwQA2AgBB4KXBAEHUpcEANgIAQdSlwQBBzKXBADYCAEHopcEAQdylwQA2AgBB3KXBAEHUpcEANgIAQfClwQBB5KXBADYCAEHkpcEAQdylwQA2AgBB+KXBAEHspcEANgIAQeylwQBB5KXBADYCAEH0pcEAQeylwQA2AgBBgKbBAEH0pcEANgIAQfylwQBB9KXBADYCAEGIpsEAQfylwQA2AgBBhKbBAEH8pcEANgIAQZCmwQBBhKbBADYCAEGMpsEAQYSmwQA2AgBBmKbBAEGMpsEANgIAQZSmwQBBjKbBADYCAEGgpsEAQZSmwQA2AgBBnKbBAEGUpsEANgIAQaimwQBBnKbBADYCAEGkpsEAQZymwQA2AgBBsKbBAEGkpsEANgIAQaymwQBBpKbBADYCAEG4psEAQaymwQA2AgBBwKbBAEG0psEANgIAQbSmwQBBrKbBADYCAEHIpsEAQbymwQA2AgBBvKbBAEG0psEANgIAQdCmwQBBxKbBADYCAEHEpsEAQbymwQA2AgBB2KbBAEHMpsEANgIAQcymwQBBxKbBADYCAEHgpsEAQdSmwQA2AgBB1KbBAEHMpsEANgIAQeimwQBB3KbBADYCAEHcpsEAQdSmwQA2AgBB8KbBAEHkpsEANgIAQeSmwQBB3KbBADYCAEH4psEAQeymwQA2AgBB7KbBAEHkpsEANgIAQYCnwQBB9KbBADYCAEH0psEAQeymwQA2AgBBiKfBAEH8psEANgIAQfymwQBB9KbBADYCAEGQp8EAQYSnwQA2AgBBhKfBAEH8psEANgIAQZinwQBBjKfBADYCAEGMp8EAQYSnwQA2AgBBoKfBAEGUp8EANgIAQZSnwQBBjKfBADYCAEGop8EAQZynwQA2AgBBnKfBAEGUp8EANgIAQbCnwQBBpKfBADYCAEGkp8EAQZynwQA2AgBByKfBACABQQ9qQXhxIgBBCGsiAjYCAEGsp8EAQaSnwQA2AgBBwKfBACAEQShrIgMgASAAa2pBCGoiADYCACACIABBAXI2AgQgASADakEoNgIEQdSnwQBBgICAATYCAAwICyACIANJIAEgAk1yDQAgACgCDCIDQQFxDQAgA0EBdiAGRg0DC0HYp8EAQdinwQAoAgAiACABIAAgAUkbNgIAIAEgBGohA0GcpcEAIQACQAJAA0AgAyAAKAIAIgdHBEAgACgCCCIADQEMAgsLIAAoAgwiA0EBcQ0AIANBAXYgBkYNAQtBnKXBACEAA0ACQCACIAAoAgAiA08EQCACIAMgACgCBGoiB0kNAQsgACgCCCEADAELC0HIp8EAIAFBD2pBeHEiAEEIayIDNgIAQcCnwQAgBEEoayIJIAEgAGtqQQhqIgA2AgAgAyAAQQFyNgIEIAEgCWpBKDYCBEHUp8EAQYCAgAE2AgAgAiAHQSBrQXhxQQhrIgAgACACQRBqSRsiA0EbNgIEQZylwQApAgAhCiADQRBqQaSlwQApAgA3AgAgAyAKNwIIQailwQAgBjYCAEGgpcEAIAQ2AgBBnKXBACABNgIAQaSlwQAgA0EIajYCACADQRxqIQADQCAAQQc2AgAgAEEEaiIAIAdJDQALIAIgA0YNByADIAMoAgRBfnE2AgQgAiADIAJrIgBBAXI2AgQgAyAANgIAIABBgAJPBEAgAiAAEE0MCAsgAEH4AXFBrKXBAGohAQJ/QbSnwQAoAgAiA0EBIABBA3Z0IgBxRQRAQbSnwQAgACADcjYCACABDAELIAEoAggLIQAgASACNgIIIAAgAjYCDCACIAE2AgwgAiAANgIIDAcLIAAgATYCACAAIAAoAgQgBGo2AgQgAUEPakF4cUEIayICIAVBA3I2AgQgB0EPakF4cUEIayIEIAIgBWoiAGshBSAEQcinwQAoAgBGDQMgBEHEp8EAKAIARg0EIAQoAgQiAUEDcUEBRgRAIAQgAUF4cSIBEEEgASAFaiEFIAEgBGoiBCgCBCEBCyAEIAFBfnE2AgQgACAFQQFyNgIEIAAgBWogBTYCACAFQYACTwRAIAAgBRBNDAYLIAVB+AFxQaylwQBqIQECf0G0p8EAKAIAIgNBASAFQQN2dCIEcUUEQEG0p8EAIAMgBHI2AgAgAQwBCyABKAIICyEDIAEgADYCCCADIAA2AgwgACABNgIMIAAgAzYCCAwFC0HAp8EAIAAgBWsiATYCAEHIp8EAQcinwQAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIagwIC0HEp8EAKAIAIQACQCABIAVrIgJBD00EQEHEp8EAQQA2AgBBvKfBAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0G8p8EAIAI2AgBBxKfBACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLIABBCGoMBwsgACAEIAdqNgIEQcinwQBByKfBACgCACIAQQ9qQXhxIgFBCGsiAjYCAEHAp8EAQcCnwQAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRB1KfBAEGAgIABNgIADAMLQcinwQAgADYCAEHAp8EAQcCnwQAoAgAgBWoiATYCACAAIAFBAXI2AgQMAQtBxKfBACAANgIAQbynwQBBvKfBACgCACAFaiIBNgIAIAAgAUEBcjYCBCAAIAFqIAE2AgALIAJBCGoMAwtBAEHAp8EAKAIAIgAgBU0NAhpBwKfBACAAIAVrIgE2AgBByKfBAEHIp8EAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGoMAgsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIARBEE8EQCACIAVBA3I2AgQgAiAFaiIAIARBAXI2AgQgACAEaiAENgIAIARBgAJPBEAgACAEEE0MAgsgBEH4AXFBrKXBAGohAQJ/QbSnwQAoAgAiA0EBIARBA3Z0IgRxRQRAQbSnwQAgAyAEcjYCACABDAELIAEoAggLIQMgASAANgIIIAMgADYCDCAAIAE2AgwgACADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqCyAIQRBqJAALxiMCD38BfiMAQZABayIDJAACQAJAIAEoAhQiBCABKAIQIgVJBEAgAUEMaiEGIAEoAgwhBwNAIAQgB2otAAAiAkEJayIIQRdLQQEgCHRBk4CABHFFcg0CIAEgBEEBaiIENgIUIAQgBUcNAAsgBSEECyADQQU2AlggA0EYaiABQQxqIAUgBEEBaiIBIAEgBUsbEDQgA0HYAGogAygCGCADKAIcEJwBIQEgAEEGOgAAIAAgATYCBAwBCwJAAkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAkHlAE0EQCACQSJGDQYgAkEtRg0FIAJB2wBHDQEgASABLQAYQQFrIgI6ABggAkH/AXENByADQRg2AlggA0EIaiAGIAUgBEEBaiIBIAEgBUsbEDQgA0HYAGogAygCCCADKAIMEJwBIQEgAEEGOgAAIAAgATYCBAwVCyACQfMATQRAIAJB5gBGDQQgAkHuAEcNASABIARBAWo2AhQgAUHoxMAAQQMQZiIBRQ0CIABBBjoAACAAIAE2AgQMFQsgAkH0AEYNAiACQfsARg0HCyACQTBrQf8BcUEKSQ0HIANBCjYCWCADIAYgBSAEQQFqIgQgBCAFSxsQNCADIANB2ABqIAMoAgAgAygCBBCcATYCJAwQCyADQQA6ACAgACADKQMgNwMAIABBCGogA0EoaikDADcDACAAQRBqIANBMGopAwA3AwAMEgsgASAEQQFqNgIUIAFB68TAAEEDEGYiAQRAIABBBjoAACAAIAE2AgQMEgsgA0GBAjsBICAAIAMpAyA3AwAgAEEIaiADQShqKQMANwMAIABBEGogA0EwaikDADcDAAwRCyABIARBAWo2AhQgAUHuxMAAQQQQZiIBBEAgAEEGOgAAIAAgATYCBAwRCyADQQE7ASAgACADKQMgNwMAIABBCGogA0EoaikDADcDACAAQRBqIANBMGopAwA3AwAMEAsgASAEQQFqNgIUIANBOGogAUEAEC0gAykDOEIDUQ0EIANBIGogA0E4ahB1IAMtACBBBkcEQCAAIAMpAyA3AwAgAEEQaiADQTBqKQMANwMAIABBCGogA0EoaikDADcDAAwQCyADKAIkIAEQkwEhASAAQQY6AAAgACABNgIEDA8LIAFBADYCCCABIARBAWo2AhQgA0HYAGogBiABEDogAygCXCECIAMoAlgiBUECRg0EIAMoAmAhBCAFRQRAIANBIGohBUEAIQYCQCAEQQBOBEAgBEUEQEEBIQcMAgtB4aPBAC0AABpBASEGIARBARDgASIHDQELIAYgBEGsscAAENIBAAsgByACIAQQISECIAUgBDYCDCAFIAI2AgggBSAENgIEIAVBAzoAACADLQAgQQZGDQwgACADKQMgNwMAIABBEGogA0EwaikDADcDACAAQQhqIANBKGopAwA3AwAMDwtBACEGIARBAE4EQCAERQRAQQEhAQwPC0Hho8EALQAAGkEBIQYgBEEBEOABIgENDgsgBiAEQayxwAAQ0gEACyABIARBAWo2AhQgA0EBOgCAASADIAE2AnwgA0EANgKMASADQoCAgICAATcChAEgA0HYAGogA0H8AGoQdCADLQBYIgVBB0YNBCADQdgAakEBciICQQhqIQcgAkEPaiEIAkADQCAFQf8BcUEGRg0BIAMoAowBIgYgAygChAFGBEAjAEEQayIEJAAgBEEIaiADQYQBaiIJIAkoAgBBAUEIQRgQWSAEKAIIIglBgYCAgHhHBEAgCSAEKAIMQdjFwAAQ0gEACyAEQRBqJAALIAMoAogBIAZBGGxqIgQgAikAADcAASAEIAU6AAAgBEEJaiAHKQAANwAAIARBEGogCCkAADcAACADIAZBAWo2AowBIANB2ABqIANB/ABqEHQgAy0AWCIFQQdHDQALIAMoAlwhBiADKAKMASIFRQ0IIAMoAogBIQQDQCAEEIABIARBGGohBCAFQQFrIgUNAAsMCAsgAygChAEhBiADKQKIASERQQAhCUEEDAgLIAEgAS0AGEEBayICOgAYIAJB/wFxRQ0FIAEgBEEBajYCFCADQdgAaiEHIwBBwAFrIgIkACACQQE6AAQgAiABNgIAIAJBCGohCCMAQRBrIgYkACAGQQRqIAIQIwJAAkAgBi0ABEUEQCAGLQAFDQEgCEGAgICAeDYCAAwCCyAIIAYoAgg2AgQgCEGBgICAeDYCAAwBCyAGQQRqIQQgAigCACEFIwBBEGsiCiQAIAVBADYCCCAFIAUoAhRBAWo2AhQgCkEEaiAFQQxqIAUQOiAKKAIIIQUCQCAKKAIEQQJHBEACQCAKKAIMIglBAE4EQCAJRQRAQQEhDAwCC0Hho8EALQAAGkEBIQsgCUEBEOABIgwNAQsgCyAJQdDTwAAQ0gEACyAMIAUgCRAhIQUgBCAJNgIIIAQgBTYCBCAEIAk2AgAMAQsgBEGAgICAeDYCACAEIAU2AgQLIApBEGokACAGKAIEQYCAgIB4RwRAIAggBikCBDcCACAIQQhqIAZBDGooAgA2AgAMAQsgCCAGKAIINgIEIAhBgYCAgHg2AgALIAZBEGokAAJAAkACQAJAIAIoAggiBEGAgICAeGsOAgEAAgsgByACKAIMNgIEIAdBBjoAAAwCCyAHQQA2AgwgB0EANgIEIAdBBToAAAwBCyACKQIMIREgAkEANgIcIAJBADYCFCACIBE3AoABIAIgBDYCfCACQaABaiACELcBAkAgAi0AoAFBBkcEQCACQTBqIAJBsAFqIg8pAwA3AwAgAkEoaiACQagBaiIQKQMANwMAIAIgAikDoAE3AyAgAkGIAWogAkEUaiACQfwAaiACQSBqEGIgAi0AiAFBBkcEQCACQYgBahCAAQsgAkE8aiELIAJBpAFqIQwDQAJAIAJB/ABqIQgjAEEQayIGJAAgBkEEaiACECMCQAJAIAYtAARFBEAgBi0ABQ0BIAhBgICAgHg2AgAMAgsgCCAGKAIINgIEIAhBgYCAgHg2AgAMAQsgBkEEaiEEIAIoAgAhBSMAQRBrIgokACAFQQA2AgggBSAFKAIUQQFqNgIUIApBBGogBUEMaiAFEDogCigCCCEFAkAgCigCBEECRwRAQQAhDQJAIAooAgwiCUEATgRAIAlFBEBBASEODAILQeGjwQAtAAAaQQEhDSAJQQEQ4AEiDg0BCyANIAlBpNHAABDSAQALIA4gBSAJECEhBSAEIAk2AgggBCAFNgIEIAQgCTYCAAwBCyAEQYCAgIB4NgIAIAQgBTYCBAsgCkEQaiQAIAYoAgRBgICAgHhHBEAgCCAGKQIENwIAIAhBCGogBkEMaigCADYCAAwBCyAIIAYoAgg2AgQgCEGBgICAeDYCAAsgBkEQaiQAAkACQAJAAkAgAigCfCIEQYCAgIB4aw4CBAABCyACKAKAASEGDAELIAIpAoABIREgAigCgAEgAkGIAWogAhC3ASACLQCIAUEGRw0BIAIoAowBIQYgBEUNACAEQQEQ7wELIAdBBjoAACAHIAY2AgQMBAsgDCACKQOIATcCACAMQRBqIAJBmAFqKQMANwIAIAxBCGogAkGQAWopAwA3AgAgAkFAayAQKQIANwMAIAJByABqIA8pAgA3AwAgAkHQAGogAkG4AWooAgA2AgAgAiACKQKgATcDOCACIAQ2AlQgAiARPgJYIAIgEUIgiD4CXCACQfAAaiALQRBqKQIANwMAIAJB6ABqIAtBCGopAgA3AwAgAiALKQIANwNgIAJBoAFqIAJBFGogAkHUAGogAkHgAGoQYiACLQCgAUEGRg0BIAJBoAFqEIABDAELCyACQasBaiACQRxqKAIANgAAIAdBBToAACACIAIpAhQ3AKMBIAcgAikAoAE3AAEgB0EIaiACQacBaikAADcAAAwCCyAHIAIoAqQBNgIEIAdBBjoAACAERQ0AIBGnIARBARDvAQsgAkEUahCBAQsgAkHAAWokACABIAEtABhBAWo6ABgjAEEwayICJAACfyABKAIUIgQgASgCECIFSQRAIAFBDGohByABKAIMIQgDQAJAAkACQAJAIAQgCGotAAAiBkEMTQRAIAZBCWtBAkkNBAwBCyAGQR9NBEAgBkENRw0BDAQLIAZBIEYNAyAGQf0ARg0BIAZBLEYNAgsgAkEWNgIkIAJBCGogByAFIARBAWoiBCAEIAVLGxA0IAJBJGogAigCCCACKAIMEJwBDAULIAEgBEEBajYCFEEADAQLIAJBFTYCJCACQRhqIAcgBSAEQQFqIgQgBCAFSxsQNCACQSRqIAIoAhggAigCHBCcAQwDCyABIARBAWoiBDYCFCAEIAVHDQALIAUhBAsgAkEDNgIkIAJBEGogAUEMaiAFIARBAWoiBCAEIAVLGxA0IAJBJGogAigCECACKAIUEJwBCyEEIAJBMGokACADIAQ2AnAgAy0AWEEGRwRAIARFBEAgA0EwaiADQegAaikDADcDACADQShqIANB4ABqKQMANwMAIAMgAykDWDcDIAwKCyADQQY6ACAgAyAENgIkIANB2ABqEIABDAkLIAMgAygCXDYCJCADQQY6ACAgBEUNCCADQfAAahB+DAgLIANByABqIAFBARAtIAMpA0hCA1ENAyADQSBqIANByABqEHUgAy0AIEEGRwRAIAAgAykDIDcDACAAQRBqIANBMGopAwA3AwAgAEEIaiADQShqKQMANwMADAwLIAMoAiQgARCTASEBIABBBjoAACAAIAE2AgQMCwsgACADKAJANgIEIABBBjoAAAwKCyAAQQY6AAAgACACNgIEDAkLIAMoAlwhBgwCCyAAIAMoAlA2AgQgAEEGOgAADAcL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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAALQAAQQFrDhEBAgMEBQYHCAkKCwwNDg8QEQALIAIgAC0AAToACCACQQI2AhQgAkGg1MAANgIQIAJCATcCHCACQT02AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIUIAEoAhggAkEQahAlDBELIAIgACkDCDcDCCACQQI2AhQgAkG81MAANgIQIAJCATcCHCACQT42AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIUIAEoAhggAkEQahAlDBALIAIgACkDCDcDCCACQQI2AhQgAkG81MAANgIQIAJCATcCHCACQT82AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIUIAEoAhggAkEQahAlDA8LIAArAwghAyACQQI2AhQgAkHc1MAANgIQIAJCATcCHCACQcAANgIMIAIgAzkDKCACIAJBCGo2AhggAiACQShqNgIIIAEoAhQgASgCGCACQRBqECUMDgsgAiAAKAIENgIIIAJBAjYCFCACQfjUwAA2AhAgAkIBNwIcIAJBwQA2AiwgAiACQShqNgIYIAIgAkEIajYCKCABKAIUIAEoAhggAkEQahAlDA0LIAIgACkCBDcCCCACQQE2AhQgAkGQ1cAANgIQIAJCATcCHCACQcIANgIsIAIgAkEoajYCGCACIAJBCGo2AiggASgCFCABKAIYIAJBEGoQJQwMCyABQYnUwABBChDaAQwLCyABQZjVwABBChDaAQwKCyABQaLVwABBDBDaAQwJCyABQa7VwABBDhDaAQwICyABQbzVwABBCBDaAQwHCyABQcTVwABBAxDaAQwGCyABQcfVwABBBBDaAQwFCyABQcvVwABBDBDaAQwECyABQdfVwABBDxDaAQwDCyABQebVwABBDRDaAQwCCyABQfPVwABBDhDaAQwBCyABIAAoAgQgACgCCBDaAQsgAkEwaiQAC+sEAQp/IwBBMGsiAyQAIANBAzoALCADQSA2AhwgA0EANgIoIAMgATYCJCADIAA2AiAgA0EANgIUIANBADYCDAJ/AkACQAJAIAIoAhAiCkUEQCACKAIMIgBFDQEgAigCCCIBIABBA3RqIQQgAEEBa0H/////AXFBAWohByACKAIAIQADQCAAQQRqKAIAIgUEQCADKAIgIAAoAgAgBSADKAIkKAIM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CCAAQgM3AwAMBAtCACADfSIHQgBTBEBCAiEGIAchAwwDCyADur1CgICAgICAgICAf4QhAwwCCyAAIAQoAgQ2AgggAEIDNwMADAILIAQpAwghAwsgACADNwMIIAAgBjcDAAsgBEEQaiQAC88DAQR/IwBB0ABrIgAkAAJAAkBBwKPBACgCAEUEQEHYo8EAKAIAIQFB2KPBAEEANgIAIAFFDQEgAEEMaiICIAERBAAgAEE4aiEBAkBBwKPBACgCACIDQQFGBEAgAUHEo8EANgIAIAEgAikCADcCBCABQQxqIAJBCGopAgA3AgAgAUEUaiACQRBqKAIANgIADAELAkAgA0UNAEHEo8EAKAIAIgNFDQBByKPBACgCACADQQJ0QQQQ7wELQcCjwQBBATYCACABQcSjwQA2AgQgAUEANgIAQcSjwQAgAikCADcCAEHMo8EAIAJBCGopAgA3AgBB1KPBACACQRBqKAIANgIACyAAKAI4DQILIABB0ABqJABBxKPBAA8LIABBADYCSCAAQQE2AjwgAEHU1sAANgI4IABCBDcCQCAAQThqQbzXwAAQtAEACyAAQTRqIABBzABqKAIANgIAIABBLGogAEHEAGopAgA3AgAgACAAKQI8NwIkIABBATYCIAJAIABBIGoiAigCAEUNACACKAIEIgFFDQAgAigCCCABQQJ0QQQQ7wELIABBADYCSCAAQQE2AjwgAEHc18AANgI4IABCBDcCQCAAQThqQeTXwAAQtAEAC8kBAQh/IwBBIGsiAyQAIAAoAhQiBCAAKAIQIgUgBCAFSxshBiAAQQxqIQcgACgCDCEIAn8CQANAQQAgAkUNAhogBCAGRg0BIAAgBEEBaiIFNgIUIAJBAWshAiAEIAhqIQkgAS0AACAFIQQgAUEBaiEBIAktAABGDQALIANBCTYCFCADQQhqIAcgBRA0IANBFGogAygCCCADKAIMEJwBDAELIANBBTYCFCADIAcgBhA0IANBFGogAygCACADKAIEEJwBCyADQSBqJAAL5gECBH8BbyMAQRBrIgEkACAAKAIMIQICQAJAAkACQAJAAkAgACgCBA4CAAECCyACDQFBASECQQAhAAwCCyACDQAgACgCACICKAIEIQAgAigCACECDAELIAFBBGogABA9IAEoAgwhACABKAIIIQMMAQsgAUEEaiAAQQFBARBx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EAwBCyAAQQI6AAAgACABKQMIIgI3AxAgACACQj+INwMICyADQSBqJAALiAEBAX8gAAJ/AkACfwJAIAJBAE4EQCADKAIEBEAgAygCCCIEBEAgAygCACAEIAEgAhDXAQwECwsgAkUNAUHho8EALQAAGiACIAEQ4AEMAgsgAEEANgIEDAILIAELIgMEQCAAIAI2AgggACADNgIEQQAMAgsgACACNgIIIAAgATYCBAtBAQs2AgALhQEBAX8CQCABQQBOBEACfyACKAIEBEAgAigCCCIDBEAgAigCACADQQEgARDXAQwCCwtBASABRQ0AGkHho8EALQAAGiABQQEQ4AELIgIEQCAAIAE2AgggACACNgIEIABBADYCAA8LIAAgATYCCCAAQQE2AgQMAQsgAEEANgIECyAAQQE2AgALqgEBAX8jAEFAaiICJAAgAkEANgIUIAJCgICAgBA3AgwgAkEDOgA4IAJBIDYCKCACQQA2AjQgAkHclcAANgIwIAJBADYCICACQQA2AhggAiACQQxqNgIsIAEoAgAgAkEYaiABKAIEKAIQEQAARQRAIAAgAikCDDcCACAAQQhqIAJBFGooAgA2AgAgAkFAayQADwtBhJbAAEE3IAJBP2pB9JXAAEGIl8AAEH8AC6EBAQF/IwBBQGoiAiQAIAJCADcDOCACQThqIAAoAgAlARASIAIgAigCPCIANgI0IAIgAigCODYCMCACIAA2AiwgAkHHADYCKCACQQI2AhAgAkGY1sAANgIMIAJCATcCGCACIAJBLGo2AiQgAiACQSRqNgIUIAEoAhQgASgCGCACQQxqECUgAigCLCIBBEAgAigCMCABQQEQ7wELIAJBQGskAAuIAQEFfyMAQRBrIgMkAAJAAkAgAkEHTQRAIAINAQwCCyADQQhqQS4gASACEFcgAygCCEEBRiEEDAELIAJBAWshBiABIQUDQCAFLQAAQS5GIgQNASAFQQFqIQUgBiIHQQFrIQYgBw0ACwsgACAEIAAtAARyOgAEIAAoAgAgASACENoBIANBEGokAAuSAQEEfyMAQRBrIgIkAEEBIQQCQCABKAIUIgNBJyABKAIYIgUoAhAiAREAAA0AIAJBBGogACgCAEGBAhAgAkAgAi0ABEGAAUYEQCADIAIoAgggAREAAEUNAQwCCyADIAItAA4iACACQQRqaiACLQAPIABrIAUoAgwRAgANAQsgA0EnIAERAAAhBAsgAkEQaiQAIAQLegEBfyMAQSBrIgIkAAJ/IAAoAgBBgICAgHhHBEAgASAAKAIEIAAoAggQ2gEMAQsgAkEQaiAAKAIMKAIAIgBBCGopAgA3AwAgAkEYaiAAQRBqKQIANwMAIAIgACkCADcDCCABKAIUIAEoAhggAkEIahAlCyACQSBqJAALvAIBA38jAEEQayIDJAAgAyABNgIAAkAgAxDiAUUEQCADQQRqIQQjAEEwayICJAAgAiABNgIcIAJBEGogARCOAgJAAkAgAigCECIBRQ0AIAJBCGogASACKAIUEKMBIAJBIGogAigCCCACKAIMENQBIAIoAiBBgICAgHhGDQAgBCACKQIgNwIAIARBCGogAkEoaigCADYCAAwBCyACQRxqIAJBL2pBuI7AABAoIQEgBEGAgICAeDYCACAEIAE2AgQLIAIoAhwiAUGEAU8EQCABEKkBCyACQTBqJAAgAygCBEGAgICAeEcEQCAAIAMpAgQ3AgAgAEEIaiADQQxqKAIANgIADAILIAAgAygCCDYCBCAAQYGAgIB4NgIADAELIABBgICAgHg2AgAgAUGEAUkNACABEKkBCyADQRBqJAALiAEBBH8CQAJAAkAgACgCACIAKAIADgIAAQILIAAoAggiAUUNASAAKAIEIAFBARDvAQwBCyAALQAEQQNHDQAgACgCCCIBKAIAIQMgASgCBCIEKAIAIgIEQCADIAIRBAALIAQoAgQiAgRAIAMgAiAEKAIIEO8BCyABQQxBBBDvAQsgAEEUQQQQ7wELfAEBfyMAQUBqIgUkACAFIAE2AgwgBSAANgIIIAUgAzYCFCAFIAI2AhAgBUECNgIcIAVBoIXBADYCGCAFQgI3AiQgBSAFQRBqrUKAgICAkA2ENwM4IAUgBUEIaq1CgICAgKANhDcDMCAFIAVBMGo2AiAgBUEYaiAEELQBAAuBAQEDfwJAAkACQAJAIAAtAAAOBQMDAwECAAsgAEEEahCBAQwCCyAAKAIEIgFFDQEgACgCCCABQQEQ7wEPCyAAKAIIIQEgACgCDCIDBEAgASECA0AgAhCAASACQRhqIQIgA0EBayIDDQALCyAAKAIEIgBFDQAgASAAQRhsQQgQ7wELC+gBAQZ/IwBBMGsiASQAAn8gACgCACICRQRAQQAhAEEADAELIAEgAjYCJCABQQA2AiAgASACNgIUIAFBADYCECABIAAoAgQiAjYCKCABIAI2AhggACgCCCEAQQELIQIgASAANgIsIAEgAjYCHCABIAI2AgwjAEEQayIAJAAgAEEEaiABQQxqIgMQbSAAKAIEIgIEQANAIAIgACgCDCIEQQxsakGMAmoiBSgCACIGBEAgBSgCBCAGQQEQ7wELIAIgBEEYbGoQgAEgAEEEaiADEG0gACgCBCICDQALCyAAQRBqJAAgAUEwaiQAC20BA38jAEEQayICJAAgACgCDCIDIAAoAgQiAUcEQCADIAFrQQR2IQMgAUEEaiEBA0AgARDQASABQRBqIQEgA0EBayIDDQALCyACIAAoAgA2AgwgAiAAKAIINgIIIAJBCGpBEBC7ASACQRBqJAAL4QEBBX8jAEEQayICJAAgAiABNgIEAkAgAkEEahDiAUUEQCACQQhqIQQjAEEQayIDJAAgAyABNgIIAkBBAUECIAEQlAIiBUEBRhtBACAFGyIFQQJHBEAgBCAFOgABDAELIAQgA0EIaiADQQ9qQaiOwAAQKDYCBEEBIQYLIAQgBjoAACABQYQBTwRAIAEQqQELIANBEGokACAAAn8gAi0ACEUEQCAAIAItAAk6AAFBAAwBCyAAIAIoAgw2AgRBAQs6AAAMAQsgAEGABDsBACABQYQBSQ0AIAEQqQELIAJBEGokAAtuAQF/IwBBMGsiAiQAIAJBGGogACgCACUBEAggAkEQaiACKAIYIAIoAhwQ4QEgAkEIaiACKAIQIAIoAhQQowEgAkEkaiIAIAIoAgggAigCDBDUASACKAIoIAIoAiwgARCMAiAAENABIAJBMGokAAt4AQJ/AkACQCAERQ0AIAEoAgAiBUUNACAEIAVsIQUgASgCBCEGAkAgAkUEQCAGIAUgAxDvASADIQUMAQsgBiAFIAMgAiAEbCIEENcBIgVFDQILIAEgAjYCACABIAU2AgQLQYGAgIB4IQMLIAAgBDYCBCAAIAM2AgALawECfyMAQSBrIgIkACAAAn8gASgCCCIDIAEoAgRPBEAgAkEENgIUIAJBCGogASADEDQgACACQRRqIAIoAgggAigCDBCcATYCBEEBDAELIAAgASgCACADai0AADoAAUEACzoAACACQSBqJAALygECB38BbyMAQRBrIgIkACACQQRqIAEoAgAiCBCWAkEBQQEQcSACKAIIIQUgAigCBEEBRgRAIAUgAigCDEHYosAAENIBAAsgAigCDCEGEBQhCRBzIgMgCSYBIAMiByUBEA0hCRBzIgMgCSYBIAMQ1gEhBCADQYQBTwRAIAMQqQELIAQlASABKAIAJQEgBhAPIARBhAFPBEAgBBCpAQsgB0GEAU8EQCAHEKkBCyAAIAgQlgI2AgggACAGNgIEIAAgBTYCACACQRBqJAAL1wEBAn8jAEEgayIGJAAgAUUEQEHko8AAQTIQhAIACyAGQRRqIgcgASADIAQgBSACKAIQEQcAIwBBEGsiAyQAAkACQCAGQQhqIgIgBygCCCIBIAcoAgBJBH8gA0EIaiAHIAFBBEEEEIUBIAMoAggiAUGBgICAeEcNASAHKAIIBSABCzYCBCACIAcoAgQ2AgAgA0EQaiQADAELIAEgAygCDEHUo8AAENIBAAsgBiAGKAIIIAYoAgwQ4QEgBigCBCEBIAAgBigCADYCACAAIAE2AgQgBkEgaiQAC2wBAn8jAEEQayIDJAACQCAAIAEoAggiBCABKAIASQR/IANBCGogASAEQQFBARCFASADKAIIIgRBgYCAgHhHDQEgASgCCAUgBAs2AgQgACABKAIENgIAIANBEGokAA8LIAQgAygCDCACENIBAAtqAgF/AX4jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0Hsg8EANgIIIANCAjcCFCADQoCAgICwBiIEIAOthDcDKCADIAQgA0EEaq2ENwMgIAMgA0EgajYCECADQQhqIAIQtAEAC2cAIwBBMGsiACQAQeCjwQAtAAAEQCAAQQI2AgwgAEGY48AANgIIIABCATcCFCAAIAE2AiwgACAAQSxqrUKAgICAsAaENwMgIAAgAEEgajYCECAAQQhqQbjjwAAQtAEACyAAQTBqJAALawEDfwJAIAEoAggiAkEATgRAIAEoAgQhBCACRQRAQQEhAQwCC0Hho8EALQAAGkEBIQMgAkEBEOABIgENAQsgAyACQcDqwAAQ0gEACyABIAQgAhAhIQEgACACNgIIIAAgATYCBCAAIAI2AgALZQECfyMAQRBrIgMkACADQQRqIAJBAUEBEHEgAygCCCEEIAMoAgRBAUYEQCAEIAMoAgxB8IPAABDSAQALIAMoAgwgASACECEhASAAIAI2AgggACABNgIEIAAgBDYCACADQRBqJAALZwEBfyMAQTBrIgMkACADIAI2AgQgAyABNgIAIANBAjYCDCADQdCgwAA2AgggA0ICNwIUIANBIjYCLCADQSM2AiQgAyAANgIgIAMgA0EgajYCECADIAM2AiggA0EIahBnIANBMGokAAtcAQF/IwBBMGsiAiQAIAIgATYCDCACIAA2AgggAkECNgIUIAJB2JLAADYCECACQgE3AhwgAkEBNgIsIAIgAkEoajYCGCACIAJBCGo2AiggAkEQahBnIAJBMGokAAtcAQF/IwBBMGsiAiQAIAIgATYCDCACIAA2AgggAkECNgIUIAJB/JLAADYCECACQgE3AhwgAkEBNgIsIAIgAkEoajYCGCACIAJBCGo2AiggAkEQahBnIAJBMGokAAtbAQF/IwBBMGsiAyQAIAMgATYCDCADIAA2AgggA0EBNgIUIANBhIPBADYCECADQgE3AhwgAyADQQhqrUKAgICAoA2ENwMoIAMgA0EoajYCGCADQRBqIAIQtAEAC6MBAQR/IwBBEGsiAyQAIAEoAgAiAigCAEEBRwR/QQAFIANBCGohBCMAQRBrIgEkACACQQRqIgItAABBA0cEf0EABSABQQhqIAIoAgQiBSgCACAFKAIEKAIYEQEAIAEoAgwhBSABKAIICyECIAQgBTYCBCAEIAI2AgAgAUEQaiQAIAMoAgwhBCADKAIICyEBIAAgBDYCBCAAIAE2AgAgA0EQaiQAC3wBAn8jAEEQayICJAACQCAAKAIMBEAgACEBDAELIAJBCGogAEEIaigCADYCACACIAApAgA3AwAjAEEQayIDJAAgA0EIaiABQQxqIAEoAhQQNCACIAMoAgggAygCDBCcASEBIANBEGokACAAQRRBBBDvAQsgAkEQaiQAIAELTAEDfyABIQMgAiEEIAEoAogCIgUEQCABLwGQAyEEIAJBAWohAwsgAUHIA0GYAyACG0EIEO8BIAAgBTYCACAAIAOtIAStQiCGhDcCBAtDAQN/AkAgAkUNAANAIAAtAAAiBCABLQAAIgVGBEAgAEEBaiEAIAFBAWohASACQQFrIgINAQwCCwsgBCAFayEDCyADC0kBAX8gAiABayIDIAAoAgAgACgCCCICa0sEQCAAIAIgA0EBQQEQngEgACgCCCECCyAA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aigCACIAIAMgBkEMamooAgAiAUcgACABSxsiBEUNAQwCCwtBf0EAIAMbIQQLAkACQAJAIARB/wFxDgIAAQILQQAgDQ0CGiAJIAVBAWsiAEsEQCAAIApqLQAAQQFxDQEMAgsgACAJQbTwwAAQigEACyAFIAlNBEBBACEDIAohBAJAA0AgAyAFRg0BIANBAWohAyAEQQFrIgQgBWoiAC0AAEE5Rg0ACyAAIAAtAABBAWo6AAAgBSADa0EBaiAFTw0CIABBAWpBMCADQQFrEDgaDAILAn9BMSANDQAaIApBMToAAEEwIAVBAUYNABogCkEBakEwIAVBAWsQOBpBMAshACAQQQFqIRAgHSAFIAlPcg0BIAUgCmogADoAACAFQQFqIQUMAQsgBSAJQcTwwAAQ8AEACyAFIAlLDQEgBQshACAUIBA7AQggFCAANgIEDAELIAUgCUHU8MAAEPABAAsgFCAKNgIAIAZBwAZqJAAMBQsgA0EoQYSYwQAQ8AEAC0EoQShBhJjBABCKAQALIABBKEGEmMEAEPABAAtBlJjBAEEaQYSYwQAQpAEACyAIQcgIaiAIQZgIaigCADYCACAIIAgpApAINwPACAsgGCAILgHICCIASARAIAhBCGogCCgCwAggCCgCxAggACATIAhBkAhqEEMgCCgCDCEAIAgoAggMAwtBAiEAIAhBAjsBkAggE0UEQEEBIQAgCEEBNgKYCCAIQduAwQA2ApQIIAhBkAhqDAMLIAggEzYCoAggCEEAOwGcCCAIQQI2ApgIIAhB0YDBADYClAggCEGQCGoMAgtB3IDBAEElQYSBwQAQpAEAC0EBIQAgCEEBNgKYCCAIQduAwQA2ApQIIAhBkAhqCyEBIAggADYCzAggCCABNgLICCAIIBw2AsQIIAggGzYCwAggByAIQcAIahApIAhB8AhqJAAMAQsgAUEoQYSYwQAQ8AEACw8LIAFBACEAIwBBgAFrIgMkACA/vSElAn9BAyA/mUQAAAAAAADwf2ENABpBAiAlQoCAgICAgID4/wCDIiZCgICAgICAgPj/AFENABogJUL/////////B4MiKUKAgICAgICACIQgJUIBhkL+////////D4MgJUI0iKdB/w9xIgAbIidCAYMhKCAmUARAQQQgKVANARogAEGzCGshAEIBISYgKFAMAQtCgICAgICAgCAgJ0IBhiAnQoCAgICAgIAIUSIBGyEnQgJCASABGyEmQct3Qcx3IAEbIABqIQAgKFALIQEgAyAAOwF4IAMgJjcDcCADQgE3A2ggAyAnNwNgIAMgAToAegJ/AkACQAJAIAFBAmsiAQRAQQEhAEHTgMEAQdSAwQAgJUIAUyIEG0HTgMEAQQEgBBsgAhshGCAlQj+IpyACciEbQQMgASABQQNPG0ECaw4CAwIBCyADQQM2AiggA0HVgMEANgIkIANBAjsBIEEBIRhBASEAIANBIGoMAwsgA0EDNgIoIANB2IDBADYCJCADQQI7ASAgA0EgagwCCyADQSBqIQUgA0EPaiEMIwBBMGsiBCQAAkACQAJ/AkACQAJAAkACQAJAAkACQCADQeAAaiIAKQMAIiVQRQRAIAApAwgiJ1ANASAAKQMQIiZQDQIgJSAmfCImICVUDQMgJSAnVA0EICZCgICAgICAgIAgWg0FIAQgAC8BGCIAOwEIIAQgJSAnfSInNwMAIAAgAEEgayAAICZCgICAgBBUIgEbIgJBEGsgAiAmQiCGICYgARsiJkKAgICAgIDAAFQiARsiAkEIayACICZCEIYgJiABGyImQoCAgICAgICAAVQiARsiAkEEayACICZCCIYgJiABGyImQoCAgICAgICAEFQiARsiAkECayACICZCBIYgJiABGyImQoCAgICAgICAwABUIgEbICZCAoYgJiABGyIsQgBZIgJrIgFrwSIKQQBIDQYgBCAnIAqtIiaGIiggJogiKTcDECAnIClSDQogBCAAOwEIIAQgJTcDACAEICUgJkI/gyInhiImICeIIic3AxAgJSAnUg0KQaB/IAFrwUHQAGxBsKcFakHOEG0iAEHRAE8NByAAQQR0IgBBqPHAAGopAwAiJ0L/////D4MiJSAmQiCIIjN+IipCIIgiOyAnQiCIIikgM34iPHwgKSAmQv////8PgyImfiInQiCIIj18IS4gKkL/////D4MgJSAmfkIgiHwgJ0L/////D4N8QoCAgIAIfEIgiCEyQgFBACABIABBsPHAAGovAQBqa0E/ca0iK4YiKkIBfSEvICUgKEIgiCImfiInQv////8PgyAlIChC/////w+DIih+QiCIfCAoICl+IihC/////w+DfEKAgICACHxCIIghNCAmICl+ITUgKEIgiCE2ICdCIIghNyAA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IgAgASUBJgEgECAQKAIAQQFqNgIAIAlBIGokACAADAILQbCewABBxgAgCUEfakGgnsAAQcifwAAQfwALIwBBMGsiACQAIABBATYCDCAAQfyCwQA2AgggAEIBNwIUIAAgAEEvaq1CgICAgIANhDcDICAAIABBIGo2AhAgAEEIakHsocAAELQBAAsgEkEQaiQACycAAkAgA0UgASADEL8BRXJFBEAgACABIAMgAhDXASIADQELAAsgAAuyAQECfyMAQRBrIgAkACABKAIUQcTcwABBCyABKAIYKAIMEQIAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAiABLQAFBEAgAQJ/QQEgAkEBcQ0AGiABKAIAIgEtABxBBHFFBEAgASgCFEHRhcEAQQIgASgCGCgCDBECAAwBCyABKAIUQdCFwQBBASABKAIYKAIMEQIACyICOgAECyACQQFxIABBEGokAAsqACAAIAIQugEgACgCBCAAKAIIaiABIAIQIRogACAAKAIIIAJqNgIIQQAL+gECAn8BfiMAQRBrIgIkACACQQE7AQwgAiABNgIIIAIgADYCBCMAQRBrIgEkACACQQRqIgApAgAhBCABIAA2AgwgASAENwIEIwBBEGsiACQAIAFBBGoiASgCACICKAIMIQMCQAJAAkACQCACKAIEDgIAAQILIAMNAUEBIQJBACEDDAILIAMNACACKAIAIgIoAgQhAyACKAIAIQIMAQsgAEGAgICAeDYCACAAIAE2AgwgAEGE5MAAIAEoAgQgASgCCCIALQAIIAAtAAkQcAALIAAgAzYCBCAAIAI2AgAgAEHo48AAIAEoAgQgASgCCCIALQAIIAAtAAkQcAAL0HUCIn8BfiMAQRBrIhskABBzIgQgAiYBEHMiCCADJgEjAEEwayIXJAAgF0EYaiAAIAEQowEgF0EkaiEaIBcoAhgiJCEAIBcoAhwiHyEGIAghASMAQaACayINJAAgDUGIAWohDyMAQfAAayIKJAAgCkEMaiERIwBB0AJrIggkACAIIAQ2AhQCQAJAAkAgBBCVAkEBRwRAIAhBFGogCEHwAWpBiI/AABAoIQcgEUGBgICAeDYCACARIAc2AgQgBEGEAUkNASAEEKkBDAELIAhBGGoiByAEQfSNwABBBBC4ASAIQYGAgIB4NgIsIAhBgYCA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QcgAajYCOCAFQTBqIAQQtAEACxMAIABBKDYCBCAAQaWRwAA2AgALIQAgAEKy5dLfrMvtjK1/NwMIIABCvrX+1+307rt6NwMACxEAIAAoAgQgACgCCCABEIwCCxkAAn8gAUEJTwRAIAEgABA8DAELIAAQFgsLEAAgACACNgIEIAAgATYCAAsNACAAKAIAEPYBQQBHCyABAW8gACgCACUBIAEoAgAlARALIQIQcyIAIAImASAACyEAIABC7u6LnNfp0e9YNwMIIABCjNu+l6KW5+ukfzcDAAsQACAAKAIEIAAoAgggARAbCxAAIAAoAgAgACgCBCABEBsLEQAgACgCACAAKAIEIAEQjAILIQAgAEKQl5W9npXb+f8ANwMIIABCtYuSrNePpsh3NwMACyIAIABC7bqtts2F1PXjADcDCCAAQviCmb2V7sbFuX83AwALEwAgAEHY48AANgIEIAAgATYCAAsRACABIAAoAgAgACgCBBDaAQshACAAQrPDyKr2r/jwcTcDCCAAQu+Eib/m2fiTzQA3AwALEAAgASAAKAIAIAAoAgQQHQsQACABKAIUIAEoAhggABAlC2EBAX8CQAJAIABBBGsoAgAiAkF4cSIDQQRBCCACQQNxIgIbIAFqTwRAIAJBACADIAFBJ2pLGw0BIAAQIgwCC0HF28AAQS5B9NvAABCkAQALQYTcwABBLkG03MAAEKQBAAsLawEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQdyZwQA2AgggA0ICNwIUIAMgA0EEaq1CgICAgLAGhDcDKCADIAOtQoCAgICwBoQ3AyAgAyADQSBqNgIQIANBCGogAhC0AQALDQAgACgCAEEBIAEQTAtrAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANBkJrBADYCCCADQgI3AhQgAyADQQRqrUKAgICAsAaENwMoIAMgA61CgICAgLAGhDcDICADIANBIGo2AhAgA0EIaiACELQBAAsPAEGMg8EAQSsgABCkAQALDQAgACkDAEEBIAEQRwsMACAAJQEgASUBEAILDQAgACUBQYEBJQEQBgsHACAAENABCw4AIAFBgITAAEEFENoBCwsAIAAoAgAgARB5Cw4AIAFBhIvAAEESENoBCw4AIAFBqIzAAEEQENoBCw4AIAFB0IzAAEEUENoBCw4AIAFBpI3AAEETENoBCw4AIAFBlI7AAEEUENoBCw4AIAFB9JfAAEEFENoBCw4AIAFB1KXAAEEFENoBC48BAQF/IAAoAgAhAiMAQTBrIgAkAAJ/IAIoAgxFBEAgAiABEE8MAQsgAEEDNgIEIABBtKrAADYCACAAQgM3AgwgAEEzNgIsIABBMzYCJCAAIAJBDGo2AiAgAEE0NgIcIAAgAjYCGCAAIAJBEGo2AiggACAAQRhqNgIIIAEoAhQgASgCGCAAECULIABBMGokAAsNACAAQezSwAAgARAlCw0AIABB4NPAACABECULCQAgACABEBMACw0AIABBhNvAACABECULDAAgACABKQIANwMACw0AIABB7OfAACABECULDgAgAUHk58AAQQUQ2gELGgAgACABQYikwQAoAgAiAEHMACAAGxEBAAALDAAgACABKQIENwMACw0AIABBsIXBACABECULCgAgAiAAIAEQHQu3CQEHfwJAAkAgAiIFIAAiAyABa0sEQCABIAVqIQAgAyAFaiEDIAVBEEkNAUEAIANBA3EiBmshCAJAIANBfHEiBCADTw0AIAZBAWsCQCAGRQRAIAAhAgwBCyAGIQcgACECA0AgA0EBayIDIAJBAWsiAi0AADoAACAHQQFrIgcNAAsLQQNJDQAgAkEEayECA0AgA0EBayACQQNqLQAAOgAAIANBAmsgAkECai0AADoAACADQQNrIAJBAWotAAA6AAAgA0EEayIDIAItAAA6AAAgAkEEayECIAMgBEsNAAsLIAQgBSAGayICQXxxIgVrIQNBACAFayEGAkAgACAIaiIAQQNxRQRAIAMgBE8NASABIAJqQQRrIQEDQCAEQQRrIgQgASgCADYCACABQQRrIQEgAyAESQ0ACwwBCyADIARPDQAgAEEDdCIFQRhxIQcgAEF8cSIIQQRrIQFBACAFa0EYcSEJIAgoAgAhBQNAIARBBGsiBCAFIAl0IAEoAgAiBSAHdnI2AgAgAUEEayEBIAMgBEkNAAsLIAJBA3EhBSAAIAZqIQAMAQsgBUEQTwRAAkAgA0EAIANrQQNxIgZqIgIgA00NACABIQQgBgRAIAYhAANAIAMgBC0AADoAACAEQQFqIQQgA0EBaiEDIABBAWsiAA0ACwsgBkEBa0EHSQ0AA0AgAyAELQAAOgAAIANBAWogBEEBai0AADoAACADQQJqIARBAmotAAA6AAAgA0EDaiAEQQNqLQAAOgAAIANBBGogBEEEai0AADoAACADQQVqIARBBWotAAA6AAAgA0EGaiAEQQZqLQAAOgAAIANBB2ogBEEHai0AADoAACAEQQhqIQQgA0EIaiIDIAJHDQALCyACIAUgBmsiBEF8cSIHaiEDAkAgASAGaiIAQQNxRQRAIAIgA08NASAAIQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiADSQ0ACwwBCyACIANPDQAgAEEDdCIFQRhxIQYgAEF8cSIIQQRqIQFBACAFa0EYcSEJIAgoAgAhBQNAIAIgBSAGdiABKAIAIgUgCXRyNgIAIAFBBGohASACQQRqIgIgA0kNAAsLIARBA3EhBSAAIAdqIQELIAMgAyAFaiIATw0BIAVBB3EiBARAA0AgAyABLQAAOgAAIAFBAWohASADQQFqIQMgBEEBayIEDQALCyAFQQFrQQdJDQEDQCADIAEtAAA6AAAgA0EBaiABQQFqLQAAOgAAIANBAmogAUECai0AADoAACADQQNqIAFBA2otAAA6AAAgA0EEaiABQQRqLQAAOgAAIANBBWogAUEFai0AADoAACADQQZqIAFBBmotAAA6AAAgA0EHaiABQQdqLQAAOgAAIAFBCGohASADQQhqIgMgAEcNAAsMAQsgAyAFayICIANPDQAgBUEDcSIBBEADQCADQQFrIgMgAEEBayIALQAAOgAAIAFBAWsiAQ0ACwsgBUEBa0EDSQ0AIABBBGshAQNAIANBAWsgAUEDai0AADoAACADQQJrIAFBAmotAAA6AAAgA0EDayABQQFqLQAAOgAAIANBBGsiAyABLQAAOgAAIAFBBGshASACIANJDQALCwsKACAAIAElARAACw4AIAFBgdTAAEEIENoBCw4AIAFB+NPAAEEJENoBCwkAIABBADYCAAsHACAAIAFrCwgAIAAlARABCwgAIAAlARADCwgAIAAlARAECwgAIAAlARAQCwMAAQsL3aEBFwBBgIDAAAsVAgAAAAwAAAAEAAAAAwAAAAQAAAAFAEGggMAAC5UOAQAAAAYAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAABfABAASwAAAIAKAAAOAAAAL3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9jb3JlL3NyYy9zdHIvcGF0dGVybi5ycwC8ABAATwAAAOEFAAAUAAAAvAAQAE8AAADhBQAAIQAAALwAEABPAAAA1QUAACEAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2NvcmUvc3JjL2l0ZXIvdHJhaXRzL2l0ZXJhdG9yLnJzPAEQAFgAAACzBwAACQAAAC9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAACkARAASgAAAJ8AAAAZAAAARXJyb3IAAABfABAASwAAAOoBAAAXAAAAXwAQAEsAAABnBAAAEgAAAF8AEABLAAAAjgUAABsAAABfABAASwAAAI0FAAAbAAAAvAAQAE8AAABlBAAAJAAAACNzcmMvdG9vbHMvcGFyc2luZy5ycy0tLWBgYCMgAAAAWQIQABQAAADMAAAAJgAAAFkCEAAUAAAAyAAAACYAAABZAhAAFAAAALYAAAAeAAAACgAAAFkCEAAUAAAACwEAACIAAABZAhAAFAAAAAYBAAAmAAAAWQIQABQAAAAAAQAAIgAAAKgCEAABAAAAWQIQABQAAACVAAAAHgAAAFkCEAAUAAAAZwAAAB4AAABGYWlsZWQgdG8gcGFyc2UgdGhlIGRvY3VtZW50LiBbTGluZToge0xJTkVfTlVNQkVSfV17TElORV9OVU1CRVJ9RmFpbGVkIHRvIHBhcnNlIHRoZSBkb2N1bWVudC4vcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwBhAxAASgAAAJ8AAAAZAAAAYXR0ZW1wdCB0byBqb2luIGludG8gY29sbGVjdGlvbiB3aXRoIGxlbiA+IHVzaXplOjpNQVgvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9zdHIucnMAAADxAxAASAAAAJoAAAAKAAAA8QMQAEgAAACdAAAAFgAAAPEDEABIAAAAoAAAAAwAAABtaWQgPiBsZW4AAABsBBAACQAAAPEDEABIAAAAsQAAABYAAABjYXBhY2l0eSBvdmVyZmxvdwAAAGEDEABKAAAANQIAADIAAABhAxAASgAAADYCAAAXAAAAYQMQAEoAAAA5AgAADQAAAHNyYy90b29scy9wYXJzaW5nL2hlYWRpbmdzLnJzAAAA1AQQAB0AAABmAAAADAAAAEZhaWxlZCB0byByZWFkIGxvY2FsZSBmaWxlLnBhcnNpbmdmb3JtYXR0aW5nYmVmb3JlVG9wTGV2ZWxIZWFkaW5nc2JlZm9yZUZpcnN0U3ViSGVhZGluZ2JlZm9yZVN1YkhlYWRpbmdzMAUQABYAAABGBRAAFQAAAFsFEAARAAAAc3RydWN0IEhlYWRpbmdHYXBzYWZ0ZXJQcm9wZXJ0aWVzYmVmb3JlQ29udGVudHNiZWZvcmVDb250ZW50c0FmdGVyQ29kZUJsb2Nrc2JlZm9yZUNvZGVCbG9ja3NiZWZvcmVDb2RlQmxvY2tzQWZ0ZXJIZWFkaW5ncwAAAJYFEAAPAAAApQUQAA4AAACzBRAAHQAAANAFEAAQAAAA4AUQAB0AAABzdHJ1Y3QgT3RoZXJHYXBzaW5zZXJ0TmV3bGluZQAAADgGEAANAAAAc3RydWN0IEZvcm1hdE9wdGlvbnNub3RpZnlXaGVuVW5jaGFuZ2Vkc2hvd01vcmVEZXRhaWxlZEVycm9yTWVzc2FnZXNkBhAAEwAAAHcGEAAdAAAAc3RydWN0IE90aGVyT3B0aW9uc1BsdWdpbk9wdGlvbnNoZWFkaW5nR2Fwc290aGVyR2Fwc2Zvcm1hdE9wdGlvbnNvdGhlck9wdGlvbnMAAADEBhAACwAAAM8GEAAJAAAA2AYQAA0AAADlBhAADAAAAHN0cnVjdCBQbHVnaW5PcHRpb25zAAAAAAAAAAABAAAABwBBwI7AAAsFAQAAAAgAQdCOwAALBQEAAAAJAEHgjsAACwUBAAAACgBB8I7AAAsFAQAAAAsAQYCPwAALBQEAAAAMAEGQj8AAC+EGAQAAAA0AAABiZWZvcmVUb3BMZXZlbEhlYWRpbmdzYmVmb3JlRmlyc3RTdWJIZWFkaW5nYmVmb3JlU3ViSGVhZGluZ3NhZnRlclByb3BlcnRpZXNiZWZvcmVDb250ZW50c2JlZm9yZUNvbnRlbnRzQWZ0ZXJDb2RlQmxvY2tzYmVmb3JlQ29kZUJsb2Nrc2JlZm9yZUNvZGVCbG9ja3NBZnRlckhlYWRpbmdzaW5zZXJ0TmV3bGluZW5vdGlmeVdoZW5VbmNoYW5nZWRzaG93TW9yZURldGFpbGVkRXJyb3JNZXNzYWdlc2hlYWRpbmdHYXBzb3RoZXJHYXBzZm9ybWF0T3B0aW9uc290aGVyT3B0aW9uc2Rlc2NyaXB0aW9uKCkgaXMgZGVwcmVjYXRlZDsgdXNlIERpc3BsYXkAAAAOAAAABAAAAAQAAAAPAAAADgAAAAQAAAAEAAAAEAAAAA8AAADQCBAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAABAAAAAQAAAAXAAAAFgAAAAQAAAAEAAAAGAAAABcAAAAMCRAAGQAAABoAAAATAAAAGQAAABUAAABtaXNzaW5nIGZpZWxkIGBgSAkQAA8AAABXCRAAAQAAAGR1cGxpY2F0ZSBmaWVsZCBgAAAAaAkQABEAAABXCRAAAQAAAAAAAAAEAAAABAAAABsAAABFcnJvci9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvY29yZS9zcmMvc3RyL3BhdHRlcm4ucnOhCRAATwAAAM0BAAA3AAAAY2FsbGVkIGBPcHRpb246OnVud3JhcF90aHJvdygpYCBvbiBhIGBOb25lYCB2YWx1ZXNyYy90b29scy9wYXJzaW5nL2hlYWRpbmdzLnJzAAAxChAAHQAAAIAAAAAuAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJzYAoQAGwAAAAkAQAADgAAABwAAAAMAAAABAAAAB0AAAAeAAAABQBB/JXAAAuhCAEAAAAfAAAAYSBEaXNwbGF5IGltcGxlbWVudGF0aW9uIHJldHVybmVkIGFuIGVycm9yIHVuZXhwZWN0ZWRseS9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAAOwsQAEsAAACACgAADgAAAC9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAACYCxAASgAAAJ8AAAAZAAAARXJyb3IAAAA7CxAASwAAAI4FAAAbAAAAOwsQAEsAAACNBQAAGwAAADsLEABLAAAAZwQAABIAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMALAwQAEsAAACNBQAAGwAAACwMEABLAAAAZwQAABIAAABzcmMvdG9vbHMvZm9ybWF0dGluZy5ycwoBAAAAAAAAAAEAAAAAAAAAAQAAAAAAAABpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlmAwQABcAAACvAAAAEQAAAAEAAAAAAAAARmFpbGVkIHRvIHJlYWQgb3B0aW9ucy4gU29tZSBvZiB0aGVtIGFyZSBwb3NzaWJseSBub3QgcG9zaXRpdmUgbnVtYmVyIHZhbHVlcy4vcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2NvcmUvc3JjL3N0ci9wYXR0ZXJuLnJzVQ0QAE8AAADhBQAAFAAAAFUNEABPAAAA4QUAACEAAABVDRAATwAAANUFAAAhAAAAVQ0QAE8AAABlBAAAJAAAACMgIwABAAAAAAAAAOYNEAABAAAAL3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc2xpY2UucnMAAPgNEABKAAAAnwAAABkAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAVA4QAEsAAACNBQAAGwAAAFQOEABLAAAAZwQAABIAAABzcmMvdG9vbHMvcGFyc2luZy9jb250ZW50cy5ycwAAAMAOEAAdAAAAEQAAAA4AAABgYGBzcmMvdG9vbHMvcGFyc2luZy9oZWFkaW5ncy5yc/MOEAAdAAAAJgAAADsAQaiewAALwwIBAAAAJQAAAGNhbm5vdCBhY2Nlc3MgYSBUaHJlYWQgTG9jYWwgU3RvcmFnZSB2YWx1ZSBkdXJpbmcgb3IgYWZ0ZXIgZGVzdHJ1Y3Rpb24vcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L3N0ZC9zcmMvdGhyZWFkL2xvY2FsLnJzAAAAdg8QAE8AAAAEAQAAGgAAAC9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAADYDxAASgAAAJ8AAAAZAAAAaW52YWxpZCB0eXBlOiAsIGV4cGVjdGVkIAAAADQQEAAOAAAAQhAQAAsAAAD//////////2AQEABB+KDAAAu1AwEAAAAAAAAAJgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL3NlcmRlLXdhc20tYmluZGdlbi0wLjYuNS9zcmMvbGliLnJzAAAAhBAQAGUAAAA1AAAADgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5ycwAA/BAQAFoAAAD7GAAAAQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL3dhc20tYmluZGdlbi0wLjIuMTAwL3NyYy9jb252ZXJ0L3NsaWNlcy5yc2gREABsAAAAJAEAAA4AAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZAAANgAAAAwAAAAEAAAANwAAADgAAAAFAEG4pMAAC4kMAQAAADkAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAAB3EhAASwAAAIAKAAAOAAAARXJyb3IAAAB3EhAASwAAAI0FAAAbAAAARU9GIHdoaWxlIHBhcnNpbmcgYSBsaXN0RU9GIHdoaWxlIHBhcnNpbmcgYW4gb2JqZWN0RU9GIHdoaWxlIHBhcnNpbmcgYSBzdHJpbmdFT0Ygd2hpbGUgcGFyc2luZyBhIHZhbHVlZXhwZWN0ZWQgYDpgZXhwZWN0ZWQgYCxgIG9yIGBdYGV4cGVjdGVkIGAsYCBvciBgfWBleHBlY3RlZCBpZGVudGV4cGVjdGVkIHZhbHVlZXhwZWN0ZWQgYCJgaW52YWxpZCBlc2NhcGVpbnZhbGlkIG51bWJlcm51bWJlciBvdXQgb2YgcmFuZ2VpbnZhbGlkIHVuaWNvZGUgY29kZSBwb2ludGNvbnRyb2wgY2hhcmFjdGVyIChcdTAwMDAtXHUwMDFGKSBmb3VuZCB3aGlsZSBwYXJzaW5nIGEgc3RyaW5na2V5IG11c3QgYmUgYSBzdHJpbmdpbnZhbGlkIHZhbHVlOiBleHBlY3RlZCBrZXkgdG8gYmUgYSBudW1iZXIgaW4gcXVvdGVzZmxvYXQga2V5IG11c3QgYmUgZmluaXRlIChnb3QgTmFOIG9yICsvLWluZilsb25lIGxlYWRpbmcgc3Vycm9nYXRlIGluIGhleCBlc2NhcGV0cmFpbGluZyBjb21tYXRyYWlsaW5nIGNoYXJhY3RlcnN1bmV4cGVjdGVkIGVuZCBvZiBoZXggZXNjYXBlcmVjdXJzaW9uIGxpbWl0IGV4Y2VlZGVkIGF0IGxpbmUgIGNvbHVtbiAAAAABAAAAAAAAACAVEAAJAAAAKRUQAAgAAABFcnJvcigsIGxpbmU6ICwgY29sdW1uOiApAAAATBUQAAYAAABSFRAACAAAAFoVEAAKAAAAZBUQAAEAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9jb2xsZWN0aW9ucy9idHJlZS9tYXAvZW50cnkucnOIFRAAYAAAAHEBAAA2AAAAYXNzZXJ0aW9uIGZhaWxlZDogaWR4IDwgQ0FQQUNJVFkvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9jb2xsZWN0aW9ucy9idHJlZS9ub2RlLnJzYXNzZXJ0aW9uIGZhaWxlZDogZWRnZS5oZWlnaHQgPT0gc2VsZi5oZWlnaHQgLSAxABgWEABbAAAArwIAAAkAAAAYFhAAWwAAALMCAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogc3JjLmxlbigpID09IGRzdC5sZW4oKRgWEABbAAAALwcAAAUAAAAYFhAAWwAAAK8EAAAjAAAAGBYQAFsAAADvBAAAJAAAAGFzc2VydGlvbiBmYWlsZWQ6IGVkZ2UuaGVpZ2h0ID09IHNlbGYubm9kZS5oZWlnaHQgLSAxAAAAGBYQAFsAAADwAwAACQAAAC9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL2NvbGxlY3Rpb25zL2J0cmVlL25hdmlnYXRlLnJzAGQXEABfAAAAWAIAADAAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9jb2xsZWN0aW9ucy9idHJlZS9uYXZpZ2F0ZS5ycwDUFxAAXwAAAMYAAAAnAEHgsMAAC1kvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAAYBgQAEoAAACfAAAAGQBBxrHAAAvbN/A/AAAAAAAAJEAAAAAAAABZQAAAAAAAQI9AAAAAAACIw0AAAAAAAGr4QAAAAACAhC5BAAAAANASY0EAAAAAhNeXQQAAAABlzc1BAAAAIF+gAkIAAADodkg3QgAAAKKUGm1CAABA5ZwwokIAAJAexLzWQgAANCb1awxD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YAAAAHIDAAAZAAAA6CIQAGAAAABzAwAAGgAAAOgiEABgAAAAdAMAABkAAADoIhAAYAAAAHUDAAAZAAAA6CIQAGAAAAB2AwAAGQAAAOgiEABgAAAAdwMAABkAAADoIhAAYAAAAHgDAAAZAAAA6CIQAGAAAAB5AwAAGQAAAOgiEABgAAAA1AMAABEAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEAAgADAAQABQAGAAcACAAJAP//////////////////CgALAAwADQAOAA8A/////////////////////////////////////////////////////////////////////woACwAMAA0ADgAPAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAEAAgADAAQABQAGAAcACAAJAA//////////////////+gALAAwADQAOAA8AD/////////////////////////////////////////////////////////////////////oACwAMAA0ADgAPAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////L3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc2xpY2UucnMAAFgoEABKAAAAnwAAABkAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJztCgQAEwAAAArAgAAEQAAAC9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAQKRAASwAAAI0FAAAbAAAAOgAAAAwAAAAEAAAAOwAAADwAAAAFAAAAL3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc2xpY2UucnMAAIQpEABKAAAAnwAAABkAAAAAAAAACAAAAAQAAABEAAAARQAAAEYAAABhIGJvb2xlYW5hIHN0cmluZ2J5dGUgYXJyYXlib29sZWFuIGBgAAAAEyoQAAkAAAAcKhAAAQAAAGludGVnZXIgYAAAADAqEAAJAAAAHCoQAAEAAABmbG9hdGluZyBwb2ludCBgTCoQABAAAAAcKhAAAQAAAGNoYXJhY3RlciBgAGwqEAALAAAAHCoQAAEAAABzdHJpbmcgAIgqEAAHAAAAdW5pdCB2YWx1ZU9wdGlvbiB2YWx1ZW5ld3R5cGUgc3RydWN0c2VxdWVuY2VtYXBlbnVtdW5pdCB2YXJpYW50bmV3dHlwZSB2YXJpYW50dHVwbGUgdmFyaWFudHN0cnVjdCB2YXJpYW50AAAAAQAAAAAAAAAuMEpzVmFsdWUoKQAOKxAACAAAABYrEAABAAAATGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkAAAoKxAAKgAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL29uY2VfY2VsbC0xLjIwLjIvc3JjL2xpYi5ycwAAAFwrEABdAAAACAMAABkAAAByZWVudHJhbnQgaW5pdAAAzCsQAA4AAABcKxAAXQAAAHoCAAANAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJz9CsQAGwAAADoAAAAAQAAAC9ydXN0Yy85ZmM2YjQzMTI2NDY5ZTM4NThlMmZlODZjYWZiNGYwZmQ1MDY4ODY5L2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAABwLBAASgAAAJ8AAAAZAAAAL3J1c3RjLzlmYzZiNDMxMjY0NjllMzg1OGUyZmU4NmNhZmI0ZjBmZDUwNjg4NjkvbGlicmFyeS9hbGxvYy9zcmMvc3RyaW5nLnJzAMwsEABLAAAAjQUAABsAAAAvcnVzdGMvOWZjNmI0MzEyNjQ2OWUzODU4ZTJmZTg2Y2FmYjRmMGZkNTA2ODg2OS9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJzKC0QAEwAAAArAgAAEQAAAE0AAAAMAAAABAAAAE4AAABPAAAAUAAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjcvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACcLRAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAnC0QACkAAACuBAAADQAAAEFjY2Vzc0Vycm9yAAEAAAAAAAAAZW50aXR5IG5vdCBmb3VuZHBlcm1pc3Npb24gZGVuaWVkY29ubmVjdGlvbiByZWZ1c2VkY29ubmVjdGlvbiByZXNldGhvc3QgdW5yZWFjaGFibGVuZXR3b3JrIHVucmVhY2hhYmxlY29ubmVjdGlvbiBhYm9ydGVkbm90IGNvbm5lY3RlZGFkZHJlc3MgaW4gdXNlYWRkcmVzcyBub3QgYXZhaWxhYmxlbmV0d29yayBkb3duYnJva2VuIHBpcGVlbnRpdHkgYWxyZWFkeSBleGlzdHNvcGVyYXRpb24gd291bGQgYmxvY2tub3QgYSBkaXJlY3RvcnlpcyBhIGRpcmVjdG9yeWRpcmVjdG9yeSBub3QgZW1wdHlyZWFkLW9ubHkgZmlsZXN5c3RlbSBvciBzdG9yYWdlIG1lZGl1bWZpbGVzeXN0ZW0gbG9vcCBvciBpbmRpcmVjdGlvbiBsaW1pdCAoZS5nLiBzeW1saW5rIGxvb3Apc3RhbGUgbmV0d29yayBmaWxlIGhhbmRsZWludmFsaWQgaW5wdXQgcGFyYW1ldGVyaW52YWxpZCBkYXRhdGltZWQgb3V0d3JpdGUgemVyb25vIHN0b3JhZ2Ugc3BhY2VzZWVrIG9uIHVuc2Vla2FibGUgZmlsZWZpbGVzeXN0ZW0gcXVvdGEgZXhjZWVkZWRmaWxlIHRvbyBsYXJnZXJlc291cmNlIGJ1c3lleGVjdXRhYmxlIGZpbGUgYnVzeWRlYWRsb2NrY3Jvc3MtZGV2aWNlIGxpbmsgb3IgcmVuYW1ldG9vIG1hbnkgbGlua3NpbnZhbGlkIGZpbGVuYW1lYXJndW1lbnQgbGlzdCB0b28gbG9uZ29wZXJhdGlvbiBpbnRlcnJ1cHRlZHVuc3VwcG9ydGVkdW5leHBlY3RlZCBlbmQgb2YgZmlsZW91dCBvZiBtZW1vcnlpbiBwcm9ncmVzc290aGVyIGVycm9ydW5jYXRlZ29yaXplZCBlcnJvciAob3MgZXJyb3IgKQEAAAAAAAAAUDEQAAsAAABbMRAAAQAAAG1lbW9yeSBhbGxvY2F0aW9uIG9mICBieXRlcyBmYWlsZWQAAHQxEAAVAAAAiTEQAA0AAABzdGQvc3JjL2FsbG9jLnJzqDEQABAAAABjAQAACQAAAE0AAAAMAAAABAAAAFEAAAAAAAAA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cnRpb24gZmFpbGVkOiBidWZbMF0gPiBiJzAnAMA/EAAbAAAAvAAAAAUAAABhc3NlcnRpb24gZmFpbGVkOiBwYXJ0cy5sZW4oKSA+PSA0AADAPxAAGwAAAL0AAAAFAAAALjAuLStOYU5pbmYwYXNzZXJ0aW9uIGZhaWxlZDogYnVmLmxlbigpID49IG1heGxlbgAAAMA/EAAbAAAAfgIAAA0AAABjYW5ub3QgcGFyc2UgaW50ZWdlciBmcm9tIGVtcHR5IHN0cmluZ2ludmFsaWQgZGlnaXQgZm91bmQgaW4gc3RyaW5nbnVtYmVyIHRvbyBsYXJnZSB0byBmaXQgaW4gdGFyZ2V0IHR5cGVudW1iZXIgdG9vIHNtYWxsIHRvIGZpdCBpbiB0YXJnZXQgdHlwZW51bWJlciB3b3VsZCBiZSB6ZXJvIGZvciBub24temVybyB0eXBlKS4uMDEyMzQ1Njc4OWFiY2RlZkJvcnJvd011dEVycm9yYWxyZWFkeSBib3Jyb3dlZDogakEQABIAAAABAAAAAAAAAGNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWVpbmRleCBvdXQgb2YgYm91bmRzOiB0aGUgbGVuIGlzICBidXQgdGhlIGluZGV4IGlzIAAAALdBEAAgAAAA10EQABIAAAAAAAAABAAAAAQAAABuAAAAPT0hPW1hdGNoZXNhc3NlcnRpb24gYGxlZnQgIHJpZ2h0YCBmYWlsZWQKICBsZWZ0OiAKIHJpZ2h0OiAAF0IQABAAAAAnQhAAFwAAAD5CEAAJAAAAIHJpZ2h0YCBmYWlsZWQ6IAogIGxlZnQ6IAAAABdCEAAQAAAAYEIQABAAAABwQhAACQAAAD5CEAAJAAAAOiAAAAEAAAAAAAAAnEIQAAIAAAAAAAAADAAAAAQAAABvAAAAcAAAAHEAAAAgICAgLCAsCn0gfSgoCiwweDAwMDEwMjAzMDQwNTA2MDcwODA5MTAxMTEyMTMxNDE1MTYxNzE4MTkyMDIxMjIyMzI0MjUyNjI3MjgyOTMwMzEzMjMzMzQzNTM2MzczODM5NDA0MTQyNDM0NDQ1NDY0NzQ4NDk1MDUxNTI1MzU0NTU1NjU3NTg1OTYwNjE2MjYzNjQ2NTY2Njc2ODY5NzA3MTcyNzM3NDc1NzY3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', imports)}

/** Entry Point. */
class FormattoPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.utils = new FormattoUtils(this);
        this.icons = new FormattoIcons();
        this.ribbonIcons = new FormattoRibbonIcons(this);
        this.editorMenus = new FormattoEditorMenuEvent(this);
        this.modify = new FormattoModifyEvent(this);
        this.commands = new FormattoCommands(this);
    }
    /** Load and Save Options */
    loadOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_OPTIONS, yield this.loadData());
        });
    }
    saveOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    /** Runs whenever the user starts using the plugin in Obsidian. */
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadOptions();
            // Initialize WebAssembly
            yield (() => __awaiter(this, void 0, void 0, function* () {
                // @ts-expect-error: formatto_wasm should be called.
                yield __wbg_init(yield formatto_wasm());
            }))();
            this.addSettingTab(new FormattoOptionTab(this.app, this));
            this.icons.registerIcons();
            this.ribbonIcons.registerRibbonIcons();
            this.editorMenus.registerEvents();
            this.modify.registerEvents();
            this.commands.registerCommands();
            console.log("Plugin Loaded: Formatto\n(Some error details are going to be displayed here.)");
        });
    }
    /** Runs when the plugin is disabled. */
    onunload() {
        console.log("Plugin Unloaded: Formatto");
    }
}

module.exports = FormattoPlugin;

/* nosourcemap */