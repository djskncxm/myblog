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
	"Before contents after headings": "",
	"Decides gaps before \"contents that are after headings.\"": "",
	"Decides gaps before content sections. (ex: Text before headings)": "",
	"Before contents after code blocks": "",
	"Decides gaps before \"contents that are after code blocks.\"": "",
	"Before code blocks": "",
	"Decides gaps before code blocks.": "",
	"Before code blocks after headings": "",
	"Decides gaps before \"code blocks that are after headings.\"": "",
	"Before callouts after headings": "",
	"Decides gaps before \"callouts that are after headings.\"": "",
	"Before callouts": "",
	"Decides gaps before \"callouts\"": ""
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
	"Before contents after headings": "Before contents after headings",
	"Decides gaps before \"contents that are after headings.\"": "Decides gaps before \"contents that are after headings.\"",
	"Before contents after code blocks": "Before contents after code blocks",
	"Decides gaps before \"contents that are after code blocks.\"": "Decides gaps before \"contents that are after code blocks.\"",
	"Before code blocks": "Before code blocks",
	"Decides gaps before code blocks.": "Decides gaps before code blocks.",
	"Before code blocks after headings": "Before code blocks after headings",
	"Decides gaps before \"code blocks that are after headings.\"": "Decides gaps before \"code blocks that are after headings.\"",
	"Before callouts after headings": "Before callouts after headings",
	"Decides gaps before \"callouts that are after headings.\"": "Decides gaps before \"callouts that are after headings.\"",
	"Before callouts": "Before callouts",
	"Decides gaps before \"callouts\"": "Decides gaps before \"callouts\""
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
	"Before contents after headings": "",
	"Decides gaps before \"contents that are after headings.\"": "",
	"Decides gaps before content sections. (ex: Text before headings)": "",
	"Before contents after code blocks": "Tartalmak előtti kód részek",
	"Decides gaps before \"contents that are after code blocks.\"": "Meghatározza azon tartalmi hézagokat, melyek kód részek előtt vannak.",
	"Before code blocks": "Kód részek előtt",
	"Decides gaps before code blocks.": "Meghatározza a hézagot kód részek előtt.",
	"Before code blocks after headings": "Kód részek előtt, a címsorok előtt",
	"Decides gaps before \"code blocks that are after headings.\"": "Meghatározza azon kód részi hézagokat, melyek címsorok után vannak.",
	"Before callouts after headings": "",
	"Decides gaps before \"callouts that are after headings.\"": "",
	"Before callouts": "",
	"Decides gaps before \"callouts\"": ""
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
	"Before contents after headings": "제목 뒤 내용 영역 앞",
	"Decides gaps before \"contents that are after headings.\"": "\"제목 뒤 내용 영역\"의 앞 여백을 결정합니다.",
	"Before contents after code blocks": "코드 블럭 뒤 내용 영역 앞",
	"Decides gaps before \"contents that are after code blocks.\"": "\"코드 블럭 뒤 내용 영역\"의 앞 여백을 결정합니다.",
	"Before code blocks": "코드 블럭 앞",
	"Decides gaps before code blocks.": "코드 블럭의 앞 여백을 결정합니다.",
	"Before code blocks after headings": "제목 뒤 코드 블럭 앞",
	"Decides gaps before \"code blocks that are after headings.\"": "\"제목 뒤 코드 블럭\"의 앞 여백을 결정합니다.",
	"Before callouts after headings": "제목 뒤 콜아웃 앞",
	"Decides gaps before \"callouts that are after headings.\"": "\"제목 뒤 콜아웃\"의 앞 여백을 결정합니다.",
	"Before callouts": "콜아웃 앞",
	"Decides gaps before \"callouts\"": "콜아웃의 앞 여백을 결정합니다."
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

/* @ts-self-types="./formatto_wasm.d.ts" */

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

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_83742b46f01ce22d: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_boolean_get_c0f3f60bac5a78d1: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_5398f5bb970e0daa: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_41dbb8413020e076: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_object_781bc9f159099513: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_52709e72fb9f179c: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_5bcc3bed3c69e72b: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_34bb9d9dcfa21373: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_395e606bd0ee4427: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_error_4928e52738ec3c69: function(arg0, arg1) {
            console.error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_101e2bf31071a9f6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_740438561a5b956d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_length_ea16607d7b61445b: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_new_5f486cdf45a04d78: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_prototypesetcall_d62e5099504357e6: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./formatto_wasm_bg.js": import0,
    };
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

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

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
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
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

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path);
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead');
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('formatto_wasm_bg.wasm', (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('main.js', document.baseURI).href)));
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance);
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
    beforeContents: "1",
    beforeContentsAfterHeadings: "0",
    beforeContentsAfterCodeBlocks: "1",
    beforeCodeBlocks: "1",
    beforeCodeBlocksAfterHeadings: "0",
    beforeCalloutsAfterHeadings: "0",
    beforeCallouts: "1",
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
    beforeContentsAfterHeadings: "",
    beforeContentsAfterCodeBlocks: "",
    beforeCodeBlocks: "",
    beforeCodeBlocksAfterHeadings: "",
    beforeCalloutsAfterHeadings: "",
    beforeCallouts: "",
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
            div.innerHTML = `<div style="color: var(--text-accent); margin-bottom: 23px;">
                ${getLocale(LOCALE_CATEGORY.OPTION_WARNINGS, "Gap value must be a whole number and it needs to be at least 0.")}
            </div>`;
            div.className = "setting-item-description";
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
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents after headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "contents that are after headings."'))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps
            .beforeContentsAfterHeadings))
            .setValue(this.plugin.settings.otherGaps
            .beforeContentsAfterHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeContentsAfterHeadings =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents after code blocks"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "contents that are after code blocks."'))
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
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before callouts after headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "callouts that are after headings."'))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps
            .beforeCalloutsAfterHeadings))
            .setValue(this.plugin.settings.otherGaps
            .beforeCalloutsAfterHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeCalloutsAfterHeadings =
                value;
            yield this.plugin.saveOptions();
        })));
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before callouts"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "callouts\"'))
            .addText((text) => text
            .setPlaceholder(this.putDefaultIndicator(FALLBACK_OPTIONS.otherGaps.beforeCallouts))
            .setValue(this.plugin.settings.otherGaps.beforeCallouts)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            debounceMsg(value);
            this.plugin.settings.otherGaps.beforeCallouts = value;
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
            .setValue(this.plugin.settings.otherOptions.formatOnSave)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.otherOptions.formatOnSave = value;
            yield this.plugin.saveOptions();
        })));
    }
}

function _loadWasmModule (sync, filepath, src, imports) {
  function _instantiateOrCompile(source, imports, stream) {
    var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

    {
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

function formatto_wasm(imports){return _loadWasmModule(0, null, 'AGFzbQEAAAABigImYAJ/fwF/YAJ/fwBgA39/fwF/YAN/f38AYAF/AGAFf39/f38AYAR/f39/AGABfwF/YAR/f39/AX9gAW8Bf2AGf39/f39/AGACf28AYAV/f39+fwBgAAF/YAV/f39/fwF/YAJvbwF/YAJ/fwFvYAAAYAZ/f39/f38Bf2AHf39/f39/fwBgBX9/fH9/AGAFf399f38AYAV/f35/fwBgAAJ/f2ACb28Bb2ABbwFvYAN/f28AYAJ+fwF/YAl/f39/f39+fn4AYAR/f39+AGADf35+AGAGf39/fH9/AGAGf39/fX9/AGAGf39/fn9/AGAEf39vbwJ/f2AEf35/fwBgBH99f38AYAR/fH9/AALuCRQVLi9mb3JtYXR0b193YXNtX2JnLmpzHF9fd2JnX2Vycm9yXzQ5MjhlNTI3MzhlYzNjNjkAARUuL2Zvcm1hdHRvX3dhc21fYmcuanMnX193YmdfZ2V0X3dpdGhfcmVmX2tleV82NDEyY2YzMDk0NTk5Njk0ABgVLi9mb3JtYXR0b193YXNtX2JnLmpzHV9fd2JnX1N0cmluZ184NTY0ZTU1OTc5OWVjY2RhAAsVLi9mb3JtYXR0b193YXNtX2JnLmpzGl9fd2JnX25ld181ZjQ4NmNkZjQ1YTA0ZDc4ABkVLi9mb3JtYXR0b193YXNtX2JnLmpzHV9fd2JnX2xlbmd0aF9lYTE2NjA3ZDdiNjE0NDViAAkVLi9mb3JtYXR0b193YXNtX2JnLmpzJ19fd2JnX3Byb3RvdHlwZXNldGNhbGxfZDYyZTUwOTk1MDQzNTdlNgAaFS4vZm9ybWF0dG9fd2FzbV9iZy5qcyxfX3diZ19pbnN0YW5jZW9mX1VpbnQ4QXJyYXlfNzQwNDM4NTYxYTViOTU2ZAAJFS4vZm9ybWF0dG9fd2FzbV9iZy5qcy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyXzEwMWUyYmYzMTA3MWE5ZjYACRUuL2Zvcm1hdHRvX3dhc21fYmcuanMsX193YmdfX193YmluZGdlbl9udW1iZXJfZ2V0XzM0YmI5ZDlkY2ZhMjEzNzMACxUuL2Zvcm1hdHRvX3dhc21fYmcuanMkX193YmdfX193YmluZGdlbl9pbl80MWRiYjg0MTMwMjBlMDc2AA8VLi9mb3JtYXR0b193YXNtX2JnLmpzJ19fd2JnX19fd2JpbmRnZW5fdGhyb3dfNmRkZDYwOWI2Mjk0MGQ1NQABFS4vZm9ybWF0dG9fd2FzbV9iZy5qcxxfX3diZ19FcnJvcl84Mzc0MmI0NmYwMWNlMjJkABAVLi9mb3JtYXR0b193YXNtX2JnLmpzK19fd2JnX19fd2JpbmRnZW5faXNfb2JqZWN0Xzc4MWJjOWYxNTkwOTk1MTMACRUuL2Zvcm1hdHRvX3dhc21fYmcuanMsX193YmdfX193YmluZGdlbl9zdHJpbmdfZ2V0XzM5NWU2MDZiZDBlZTQ0MjcACxUuL2Zvcm1hdHRvX3dhc21fYmcuanMtX193YmdfX193YmluZGdlbl9ib29sZWFuX2dldF9jMGYzZjYwYmFjNWE3OGQxAAkVLi9mb3JtYXR0b193YXNtX2JnLmpzLl9fd2JnX19fd2JpbmRnZW5faXNfdW5kZWZpbmVkXzUyNzA5ZTcyZmI5ZjE3OWMACRUuL2Zvcm1hdHRvX3dhc21fYmcuanMwX193YmdfX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcV81YmNjM2JlZDNjNjllNzJiAA8VLi9mb3JtYXR0b193YXNtX2JnLmpzLl9fd2JnX19fd2JpbmRnZW5fZGVidWdfc3RyaW5nXzUzOThmNWJiOTcwZTBkYWEACxUuL2Zvcm1hdHRvX3dhc21fYmcuanMfX193YmluZGdlbl9pbml0X2V4dGVybnJlZl90YWJsZQARFS4vZm9ybWF0dG9fd2FzbV9iZy5qcyBfX3diaW5kZ2VuX2Nhc3RfMDAwMDAwMDAwMDAwMDAwMQAQA4kChwIHAQUBAAIDAxIEAwICBQACAggABgAbAAMBAgMTEwMAAQwBDAMDBgAcBQEDCgMBAwABAQEBBgEAAAwAAAUNAAYABQAdAQUAAgMBAAMFBgoABgEBAwYAAgEAAQADBgEeBAMEAQEBBAUABAoFAQQBAQQFBgofBSAKIQUFAAQGAQABAQEDAwICAgAEAAAEAgUAAwMDAwEBBgQEAQMDAAAOAAQABAAACAAHIgESBgUOFhUUAAIBCAYCAQQIAA0NABEHBwQEAQEBAQEBAAAEAwADAgIAAAUAAAEIAwAAAAABAAEAAwIIAgcHAgIABAIEAAQAAAAAAAAABAAAAQQBAQAA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AEG/f0pqIAZBAWosAABBv39KaiAGQQJqLAAAQb9/SmogBkEDaiwAAEG/f0pqIQEgDCAIQQRqIghHDQALCyAKRQ0AIAIgCGohBgNAIAEgBiwAAEG/f0pqIQEgBkEBaiEGIApBAWsiCg0ACwsgASAJaiEJCwJAIAAvAQwiCCAJSwRAAkACQCAHQYCAgAhxRQRAIAggCWshCEEAIQFBACEJAkACQAJAIAdBHXZBA3FBAWsOAwABAAILIAghCQwBCyAIQf7/A3FBAXYhCQsgB0H///8AcSEKIAAoAgQhByAAKAIAIQADQCABQf//A3EgCUH//wNxTw0CQQEhBiABQQFqIQEgACAKIAcoAhARAABFDQALDAQLIAAgACkCCCINp0GAgID/eXFBsICAgAJyNgIIQQEhBiAAKAIAIgcgACgCBCIKIAsgAiADELABDQNBACEBIAggCWtB//8DcSECA0AgAUH//wNxIAJPDQIgAUEBaiEBIAdBMCAKKAIQEQAARQ0ACwwDC0EBIQYgACAHIAsgAiADELABDQIgACAEIAUgBygCDBECAA0CQQAhASAIIAlrQf//A3EhAgNAIAFB//8DcSIDIAJJIQYgAiADTQ0DIAFBAWohASAAIAogBygCEBEAAEUNAAsMAgsgByAEIAUgCigCDBECAA0BIAAgDTcCCEEADwtBASEGIAAoAgAiASAAKAIEIgAgCyACIAMQsAENACABIAQgBSAAKAIMEQIAIQYLIAYLlAYBBX8gAEEIayIBIABBBGsoAgAiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFBoI7BACgCAEYEQCACKAIEQQNxQQNHDQFBmI7BACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADwsgASADED0LAkACQAJAAkACQCACKAIEIgNBAnFFBEAgAkGkjsEAKAIARg0CIAJBoI7BACgCAEYNAyACIANBeHEiAhA9IAEgACACaiIAQQFyNgIEIAAgAWogADYCACABQaCOwQAoAgBHDQFBmI7BACAANgIADwsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQIgASAAEEFBACEBQbiOwQBBuI7BACgCAEEBayIANgIAIAANBEGAjMEAKAIAIgAE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IA5qIgg2AhQgDyEHIAZFDQYMBwsgASAFIAhqIgI2AhQgBkUEQCABQQA2AhwLIAAgAjYCCCAAIAg2AgRBAQwJCyAHIAVBgJXAABCWAQALIAkgA0GQlcAAEJYBAAsgByAIaiADTw0BIAcgEGohESAEIAdqIAdBAWohBy0AACARLQAARg0ACyAIIAprIAdqIQggBg0CQQAhBwwBCyADIAggCWoiACAAIANJGyADQaCVwAAQlgEACyABIAc2AhwgByELCyAIIA1qIgcgA0kNAAsLIAEgAzYCFEEACyEHIAAgBzYCAAviAwEFfwJAAkACQAJAAkAgASgCBCIHIAJPBEAgASgCACEBIAJFDQQgASACaiIDIAEQlwIiBkEDTQRAA0AgASADTw0GIANBAWsiAy0AAEEKRw0ADAULAAtBgIKECCADQQRrKAAAIgRBipSo0ABzayAEckGAgYKEeHFBgIGChHhHBEADQCABIANPDQYgA0EBayIDLQAAQQpHDQAMBQsACyACIANBA3FrIQQgBkEJSQ0BA0AgBCIDQQhIDQNBgIKECCABIANqIgZBCGsoAgAiBEGKlKjQAHNrIARyQYCBgoR4cUGAgYKEeEcNAyADQQhrIQRBgIKECCAGQQRrKAIAIgZBipSo0ABzayAGckGAgYKEeHFBgIGChHhGDQALDAILQQAgAiAHQdjGwAAQqAEACyABIARqIQMDQCABIANPDQMgA0EBayIDLQAAQQpHDQALDAELIAEgA2ohAwNAIAEgA08NAiADQQFrIgMtAABBCkcNAAsLIAMgARCXAkEBaiIFIAdLDQELQQEhAyAAIAEgBWogAUsEf0EAIQMgBSEEA0AgAyABLQAAQQpGaiEDIAFBAWohASAEQQFrIgQNAAsgA0EBagUgAws2AgAgACACIAVrNgIEDwtBACAFIAdB6MbAABCoAQALuAQBAX8jAEEQayICJAACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAALQAAQQFrDhEBAgMEBQYHCAkKCwwNDg8QEQALIAIgAC0AAToAACACQccANgIMIAIgAjYCCCABKAIAIAEoAgRB5JLAACACQQhqECUMEQsgAiAAKQMINwMAIAJByAA2AgwgAiACNgIIIAEoAgAgASgCBEHWksAAIAJBCGoQJQwQCyACIAApAwg3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IAdBEGokAAuwAQEBfyMAQRBrIgIkAAJ/IAApAwBC////////////AINCgICAgICAgPj/AFoEQCACQc0ANgIMIAIgADYCCCABKAIAIAEoAgRBgoXAACACQQhqECUMAQsgAkEAOgAEIAIgATYCACACQc0ANgIMIAIgADYCCAJAIAJB6MrAAEGChcAAIAJBCGoQJQ0AIAItAARFBEAgAUHjysAAQQIQ4QENAQtBAAwBC0EBCyACQRBqJAALnAECA38BfiMAQSBrIgIkACABKAIAQYCAgIB4RgRAIAEoAgwhAyACQRxqIgRBADYCACACQoCAgIAQNwIUIAJBFGpB6NHAACADKAIAIgMoAgAgAygCBBAlGiACQRBqIAQoAgAiAzYCACACIAIpAhQiBTcDCCABQQhqIAM2AgAgASAFNwIACyAAQdTTwAA2AgQgACABNgIAIAJBIGokAAuNAQEEfyMAQRBrIgIkAAJ/QQEgASgCACIDQScgASgCBCIFKAIQIgERAAANABogAiAAKAIAQYECEB4CQCACLQANIgBBgQFPBEAgAyACKAIAIAERAABFDQFBAQwCCyADIAIgAi0ADCIEaiAAIARrIAUoAgwRAgBFDQBBAQwBCyADQScgAREAAAsgAkEQaiQAC4UBAQF/IwBBEGsiAyQAIAIgASACaiIBSwRAQQBBABDaAQALIANBBGogACgCACICIAAoAgRBCCABIAJBAXQiAiABIAJLGyIBIAFBCE0bIgEQbyADKAIEQQFGBEAgAygCCCADKAIMENoBAAsgAygCCCECIAAgATYCACAAIAI2AgQgA0EQaiQAC3IAAn8gA0EASARAQQEhAUEAIQNBBAwBCwJ/AkACfyABBEAgAiABQQEgAxDpAQwBCyADRQRAQQEhAQwCCyADQQEQhwILIgENACAAQQE2AgRBAQwBCyAAIAE2AgRBAAshAUEICyAAaiADNgIAIAAgATYCAAuKAgEEfyMAQRBrIgMkACADIAE2AgACQCADELkBRQRAIANBBGohBCMAQSBrIgIkACACIAE2AgwgAkEQaiACQQxqEHcCQCACKAIQQYCAgIB4RwRAIAQgAikCEDcCACAEQQhqIAJBGGooAgA2AgAMAQsgAkEMaiACQR9qQYCYwAAQLSEFIARBgICAgHg2AgAgBCAFNgIECyABQYQITwRAIAEQewsg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IAAoAgQgA2ogASAC/AoAAAsgACACIANqNgIIQQALTwECfyAAKAIEIQIgACgCACEDAkAgACgCCCIALQAARQ0AIANBxYjBAEEEIAIoAgwRAgBFDQBBAQ8LIAAgAUEKRjoAACADIAEgAigCEBEAAAtEAQF/IwBBEGsiASQAIAFBCGogACAAKAIAQQFBBEEQEGEgASgCCCIAQYGAgIB4RwRAIAAgASgCDBDaAQALIAFBEGokAAs2AQF/IwBBEGsiAiQAIAFBAUEBQQAgACgCACACQQZqIgEQKiIAIAFqQQogAGsQHCACQRBqJAALNgEBfyMAQSBrIgIkACABQQFBAUEAIAApAwAgAkEMaiIBECkiACABakEUIABrEBwgAkEgaiQAC0EAIAAQ1AEgAEEMahDUASAAQRhqENQBIABBJGoQ1AEgAEEwahDUASAAQTxqENQBIABByABqENQBIABB1ABqENQBC0MBAX9BFEEEEIcCIgNFBEBBBEEUEI4CAAsgAyACNgIQIAMgATYCDCADIAApAgA3AgAgA0EIaiAAQQhqKAIANgIAIAMLQQEBfyMAQRBrIgUkACAFQQhqIAAgASACIAMgBBBhIAUoAggiAEGBgICAeEcEQCAAIAUoAgwQ2gEACyAFQRBqJAALnW4DJn8UfgF8IAEoAggiBEGAgIABcSECIAArAwAhPAJAAkAgBEGAgICAAXFFBEAgASACQQBHIRFBACEEQQAhASMAQYABayIGJAAgPL0iMkL/////////B4MiK0KAgICAgICACIQgMkIBhkL+////////D4MgMkI0iKdB/w9xIgIbIipCAYMhKEECIQACQAJAAkACQAJAICtQIgdBAkEDIAcbQQQgMkKAgICAgICA+P8AgyIrUBsgK0KAgICAgICA+P8AURtBAWsOBAABAgMEC0EDIQAMAwtBBCEADAILIAJBswhrIQQgKFAhAEIBISkMAQtCgICAgICAgCAgKkIBhiAqQoCAgICAgIAIUSIEGyEqQgJCASAEGyEpIChQIQBBy3dBzHcgBBsgAmohBAsgBiAEOwF4IAYgKTcDcCAGQgE3A2ggBiAqNwNgIAYgADoAegJ/AkACQAJAAkAgAEEBTQRAIAZBIGohCSAGQQ9qIQwjAEHQAGsiACQAAkACQAJ/AkACQAJAAkACQAJAAkAgBkHgAGoiAikDACIoUEUEQCACKQMIIilQDQEgAikDECIqUA0CICogKEJ/hVYNAyAoIClUDQQgKCAqfCIqQoCAgICAgICAIFoNBSAAIAIvARgiAjsBQCAAICggKX0iKzcDOCAAICsgKnkiKYYiLSApiCIsNwNIICsgLFINCSAAIAI7AUAgACAoNwM4IAAgKCApQj+DIiuGIiwgK4giKzcDSCAoICtSDQlBoH8gAiApp2siBGvBQdAAbEGwpwVqQc4QbSICQdEATw0GIABBIGogAkEEdCICKQOY50AiKCAqICmGEHEgAEEQaiAoIC0QcSAAICggLBBxQgFBACAEIAIvAaDnQGprQT9xrSIvhiIsQgF9ITAgACkDEEI/hyE1IAApAwBCP4ghNiAAKQMIITcgAi8BoudAIQMgACkDGCE4IAApAygiOiAAKQMgQj+IIjt8IjNCAXwiLiAviKciAkGQzgBPBEAgAkHAhD1JDQggAkGAwtcvTwRAQQhBCSACQYCU69wDSSIEGyEHQYDC1y9BgJTr3AMgBBsMCgtBBkEHIAJBgK3iBEkiBBshB0HAhD1BgK3iBCAEGwwJCyACQeQATwRAQQJBAyACQegHSSIEGyEHQeQAQegHIAQbDAkLQQpBASACQQlLIgcbDAgLQejxwABBHEGI88AAEN4BAAtBmPPAAEEdQbjzwAAQ3gEAC0HI88AAQRxB5PPAABDeAQALQfTzwABBNkGs9MAAEN4BAAtBvPTAAEE3QfT0wAAQ3gEAC0GU9cAAQS1BxPXAABDeAQALIAJB0QBBqPHAABCWAQALQQRBBSACQaCNBkkiBBshB0GQzgBBoI0GIAQbCyEEIC4gMIMhKiA2IDd8ITEgByADa0EBaiEDIDUgOH0gLnxCAXwiNCAwgyEpAkACQAJAAkACQAJAAkACQAJAAkADQCACIARuIQggAUERRg0DIAEgDGoiDSAIQTBqIgs6AAAgNCACIAQgCGxrIgKtIC+GIjkgKnwiKFYNAiABIAdGBEAgAUEBaiEBQgEhKANAICkhLSAoISsgAUERTw0GIAEgDGogKkIKfiIqIC+Ip0EwaiIEOgAAIAFBAWohASAoQgp+ISggKUIKfiIpICogMIMiKlgNAAsgKSAqfSI0ICxUIQIgKCAuIDF9fiIuICh8IS8gKiAuICh9IjBaDQggLCA0WA0CDAgLIAFBAWohASAEQQpJIARBCm4hBEUNAAtB1PXAABD8AQALIAEgDGpBAWshByAsIDFCCn4gM0IKfn0gK358ITFCACAqfSEuIC1CCn4gLH0hLQNAICogLHwiKCAwVCAuIDB8ICogMXxackUEQEEAIQIMBwsgByAEQQFrIgQ6AAAgLSAufCIzICxUIQIgKCAwWg0HIC4gLH0hLiAoISogLCAzWA0ACwwGCyA0ICh9IikgBK0gL4YiK1QhBCAuIDF9IixCAXwhLSApICtUICggLEIBfSIvWnINAiAzIDF9ICogOXwiKX0hLiAzIDV8IDh9ICkgK3x9QgJ8ITEgKiA2fCA3fCA7fSA6fSA5fCEsQgAhKgNAICggK3wiKSAvVCAqIC58ICsgLHxackUEQEEAIQQMBAsgDSALQQFrIgs6AAAgKiAxfCIwICtUIQQgKSAvWg0EICsgLHwhLCAqICt9ISogKSEoICsgMFgNAAsMAwtBEUERQeT1wAAQlgEACyABQRFB9PXAABCWAQALICghKQsCQCApIC1aIARyDQAgLSApICt8IihYIC0gKX0gKCAtfVRxDQAgCUEANgIADAQLICkgNEIEfVggKUICWnFFBEAgCUEANgIADAQLIAkgAzsBCCAJIAFBAWo2AgQMAgsgKiEoCwJAICggL1ogAnINACAvICggLHwiKlggLyAofSAqIC99VHENACAJQQA2AgAMAgsgKCApICtCWH58WCAoICtCFH5acUUEQCAJQQA2AgAMAgsgCSADOwEIIAkgATYCBAsgCSAMNgIACyAAQdAAaiQADAELIwBBEGsiASQAIAEgAEE4ajYCDCABIABByABqNgIIIAFBCGpBgIjBACABQQxqQYCIwQBB+PnAABBUAAtBgePAAEEBIDJCAFMiABshHkGB48AAQZXjwAAgABshHyAyQj+IpyEgIAYoAiBFDQEgBkHYAGogBkEoaigCADYCACAGIAYpAiA3A1AMAgsgAEECRg0CQQEhBEGB48AAQZXjwAAgMkIAUyIBG0GB48AAQQEgARsgERshAiAyQj+IpyARciEBIABBBEcNAyAGQQI7ASAgBkEBNgIoIAZBguPAADYCJCAGQSBqDAQLIAZB0ABqIRIgBkEPaiELIwBBoAprIgEkAAJAAkACQAJAIAZB4ABqIgApAwAiKFBFBEAgACkDCCIpUEUEQCAAKQMQIipQRQRA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IAZB4OXAADYCJCAGQQI7ASBBASECQQEhBCAGQSBqDAELIAZBAzYCKCAGQePlwAA2AiQgBkECOwEgIAZBIGoLIQAgBiAENgJcIAYgADYCWCAGIAE2AlQgBiACNgJQIAZB0ABqECIgBkGAAWokAA8LIAEgAkEARyEUIAEvAQ4hEUEAIQAjAEHwCGsiCCQAIDy9IilC/////////weDIi1CgICAgICAgAiEIClCAYZC/v///////w+DIClCNIinQf8PcSICGyIoQgGDISpBAiEBAkACQAJAAkACQCAtUCIEQQJBAyAEG0EEIClCgICAgICAgPj/AIMiLVAbIC1CgICAgICAgPj/AFEbQQFrDgQAAQIDBAtBAyEBDAMLQQQhAQwCCyACQbMIayEAICpQIQFCASErDAELQoCAgICAgIAgIChCAYYgKEKAgICAgICACFEiABshKEICQgEgABshKyAqUCEBQct3Qcx3IAAbIAJqIQALIAggADsB6AggCCArNwPgCCAIQgE3A9gIIAggKDcD0AggCCABOgDqCAJ/AkAgAUEBTQRAQXRBBSAAwSIAQQBIGyAAbCIAQcD9AEkNAUHc5sAAQSVBhOfAABDeAQALAkACQCABQQJHBEBBASEAQYHjwABBlePAACApQgBTIgIbQYHjwABBASACGyAUGyECIClCP4inIBRyIQUgAUEERw0BQQIhACAIQQI7AZAIIBENAkEBIQAgCEEBNgKYCCAIQYLjwAA2ApQIIAhBkAhqDAQLIAhBAzYCmAggCEHg5cAANgKUCCAIQQI7AZAIQQEhAkEBIQAgCEGQCGoMAwsgCEEDNgKYCCAIQePlwAA2ApQIIAhBAjsBkAggCEGQCGoMAgsgCCARNgKgCCAIQQA7AZwIIAhBAjYCmAggCEHm5cAANgKUCCAIQZAIagwBC0GB48AAQQEgKUIAUyIBGyEiQYHjwABBlePAACABGyApQj+IpyEkIAhBkAhqIQUgCEEQaiEKIABBBHZBFWohCUGAgH5BACARayARwUEASBshACMAQRBrIgMkAAJAAkACQAJAAkACQCAIQdAIaiIBKQMAIihQRQRAIChCgICAgICAgIAgWg0BIAlFDQNBoH8gAS8BGCAoeSIpp2siBGvBQdAAbEGwpwVqQc4QbSIBQdEATw0CIAMgAUEEdCICKQOY50AgKCAphhBx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akEBQQEQcw8LIABBBGoiABCCASAAQQhBGBBzCz4AAkACQAJAAkAgAC0AAA4FAQEBAgMACyAAQQRqEHQLDwsgAEEEahCIAg8LIABBBGoiABCCASAAQQhBGBBzCzgBAX8gASgCACABQQA2AgAEQCABKAIEIgFBhAhPBEAgARB7CyAAQQA2AgAPC0HMl8AAQTEQiwIAC98BAgF/AX4jAEEgayIDJAAgAyABNgIQIAMgADYCDCADQQE7ARwgAyACNgIYIAMgA0EMajYCFCMAQRBrIgEkACADQRRqIgApAgAhBCABIAA2AgwgASAENwIEIwBBEGsiACQAIAFBBGoiASgCACICKAIEIgNBAXFFBEAgAEGAgICAeDYCACAAIAE2AgwgAEGA0sAAIAEoAgQgASgCCCIALQAIIAAtAAkQXwALIAIoAgAhAiAAIANBAXY2AgQgACACNgIAIABBnNLAACABKAIEIAEoAggiAC0ACCAALQAJEF8ACzsBAX8jAEEQayIDJAAgAyABNgIEIAMgADYCACADIAOtQoCAgICwDoQ3AwhBgoXAACADQQhqIAIQrAEACygAAkAgAUUgACABENsBRXINACAABEAgACABEIcCIgFFDQELIAEPCwALPwAgACgCAEGAgICAeEcEQCABIAAoAgQgACgCCBDhAQ8LIAEoAgAgASgCBCAAKAIMKAIAIgAoAgAgACgCBBAlCzgAAkAgAkGAgMQARg0AIAAgAiABKAIQEQAARQ0AQQEPCyADRQRAQQAPCyAAIAMgBCABKAIMEQIACzEBAX8jAEEQayICJAAgAkEIaiAAIAAoAggQMSABIAIoAgggAigCDBCfASACQRBqJAALLQEBfyAAKAIIIgEEQCAAKAIEIQADQCAAEIgCIABBDGohACABQQFrIgENAAsLCzkBAX9BASECAkAgACABEEoNACABKAIAQauIwQBBAiABKAIEKAIMEQIADQAgAEEEaiABEEohAgsgAgsyAQF/IAAoAhAiAUGECE8EQCABEHsLAkAgACgCAEUNACAAKAIEIgBBhAhJDQAgABB7CwueAgEGfyMAQRBrIgIkACACIAA2AgwgAkEMaiEEIwBBIGsiACQAQQEhBQJAIAEoAgAiA0Gso8AAQQUgASgCBCIHKAIMIgYRAgANAAJAIAEtAApBgAFxRQRAIANBuuPAAEEBIAYR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AgAgBGoiBCABSw0EDAYLIAMgASABIANLGyIDBEAgAiAAIAP8CgAACyAHKAIAIgNBeHEiByABQQRBCCADQQNxIgMbakkNAiADRSAGIAdPcg0GQZTTwABBLkHE08AAEN4BAAtB1NLAAEEuQYTTwAAQ3gEAC0GU08AAQS5BxNPAABDeAQALQdTSwABBLkGE08AAEN4BAAsgByABIAhBAXFyQQJyNgIAIAEgBmoiBSAEIAFrIgFBAXI2AgRBnI7BACABNgIAQaSOwQAgBTYCAAsgBkUNACAADAMLIAMQFCIBRQ0BIANBfEF4IAcoAgAiAkEDcRsgAkF4cWoiAiACIANLGyICBEAgASAAIAL8CgAACyABIQILIAAQHQsgAgsLEAAgACACNgIEIAAgATYCAAsgAQFvIAAoAgAlASABKAIAJQEQASECEFAiACACJgEgAAsQACAAKAIEIAAoAgggARAZCxEAIAAoAgAgACgCBCABEJECCxEAIAEgACgCACAAKAIEEOEBCxMAIABBxNLAADYCBCAAIAE2AgALEAAgACgCACAAKAIEIAEQGQsTACAAQSg2AgQgAEHg1sAANgIACxAAIAEgACgCACAAKAIEEB8LYQEBfwJAAkAgAEEEaygCACICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgABAdDAILQdTSwABBLkGE08AAEN4BAAtBlNPAAEEuQcTTwAAQ3gEACwsPACAAQYjHwAAgASACECULDQAgACABIAIgAxDLAQsPACAAQejKwAAgASACECULDgAgACgCACUBEAxBAEcLDgAgACgCACUBEA9BAEcLDwAgAEHo0cAAIAEgAhAlCw8AIABBoNfAACABIAIQJQv8AQIBfgJ/IAAoAgApAwAhAiMAQSBrIgMkAAJ/AkAgASgCCCIAQYCAgBBxRQRAIABBgICAIHENASABQQFBAUEAIAIgA0EMaiIAECkiASAAakEUIAFrEBwMAgtBACEAA0AgACADakEbaiACp0EPcS0AluNAOgAAIABBAWshACACQg9WIAJCBIghAg0ACyABQQFBpuPAAEECIAAgA2pBHGpBACAAaxAcDAELQQAhAANAIAAgA2pBG2ogAqdBD3EtAKjjQDoAACAAQQFrIQAgAkIPViACQgSIIQINAAsgAUEBQabjwABBAiAAIANqQRxqQQAgAGsQHAsgA0EgaiQACw8AQeSHwQBBMyAAEKwBAAsPACAAQcDjwAAgASACECULDwBB4PrAAEErIAAQ3gEACwsAIAAoAgAgARBoCwcAIAAQiAILDgAgAUGkl8AAQQUQ4QELDgAgAUH8oMAAQRAQ4QELDgAgAUGMocAAQRIQ4QELDgAgAUGeocAAQRMQ4QELDgAgAUGxocAAQRQQ4QELDgAgAUHFocAAQRQQ4QELGQACfyABQQlPBEAgASAAEDoMAQsgABAUCwsKACAAQQFBARBzCw4AIAFBhKbAAEEFEOEBC3QBAX8gACgCACECIwBBIGsiACQAAn8gAigCDARAIABBPTYCHCAAQT02AhQgACACQQxqNgIQIABBPzYCDCAAIAI2AgggACACQRBqNgIYIAEoAgAgASgCBEGOgsAAIABBCGoQJQwBCyACIAEQQwsgAEEgaiQACwkAIAAgARAKAAsKACAAQQRBDBBzCwwAIAAgASkCADcDAAs+AQF/IwBBEGsiAiQAIAIgATYCDCACIAA2AgggAkEIaiIAKAIAIAAoAgRBwI7BACgCACIAQdYAIAAbEQEAAAsOACABQZjXwABBBRDhAQsLACAAKAIAIAEQSgsKACACIAAgARAfCw0AIAFBrYjBAEEYEB8LDgAgAUGAy8AAQQkQ4QELDgAgAUGJy8AAQQgQ4QELCQAgAEEANgIACwgAIAAgARBiCwcAIAAgAWsLLQEBfyMAQRBrIgEkACABIAFBD2qtQoCAgIDgDoQ3AwBBgoXAACABIAAQrAEACwgAIAAlARAECwIACwvgiAEVAEGAgMAAC8kWIyMgPmBgYC0tLQrAwMAADmJlZ2luIDw9IGVuZCAowAQgPD0gwBApIHdoZW4gc2xpY2luZyBgwAFgwAALYnl0ZSBpbmRleCDAFiBpcyBvdXQgb2YgYm91bmRzIG9mIGDAAWDAAAtieXRlIGluZGV4IMAmIGlzIG5vdCBhIGNoYXIgYm91bmRhcnk7IGl0IGlzIGluc2lkZSDACCAoYnl0ZXMgwAYpIG9mIGDAAWDAABZzbGljZSBpbmRleCBzdGFydHMgYXQgwA0gYnV0IGVuZHMgYXQgwAAgaW5kZXggb3V0IG9mIGJvdW5kczogdGhlIGxlbiBpcyDAEiBidXQgdGhlIGluZGV4IGlzIMAAwAkgYXQgbGluZSDACCBjb2x1bW4gwAAScmFuZ2Ugc3RhcnQgaW5kZXggwCIgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggwAAQcmFuZ2UgZW5kIGluZGV4IMAiIG91dCBvZiByYW5nZSBmb3Igc2xpY2Ugb2YgbGVuZ3RoIMAAB3N0cmluZyDAAA5pbnZhbGlkIHR5cGU6IMALLCBleHBlY3RlZCDAABBhc3NlcnRpb24gYGxlZnQgwBcgcmlnaHRgIGZhaWxlZAogIGxlZnQ6IMAJCiByaWdodDogwAAQYXNzZXJ0aW9uIGBsZWZ0IMAQIHJpZ2h0YCBmYWlsZWQ6IMAJCiAgbGVmdDogwAkKIHJpZ2h0OiDAAEhjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uOiDAAMACOiDAAAEKwAAvcnVzdGMvMDFmNmRkZjc1ODhmNDJhZTJkN2ViMGEyZjIxZDQ0ZThlOTY2NzRjZi9saWJyYXJ5L2FsbG9jL3NyYy9jb2xsZWN0aW9ucy9idHJlZS9tYXAvZW50cnkucnMAbGlicmFyeS9jb3JlL3NyYy9udW0vZmx0MmRlYy9zdHJhdGVneS9ncmlzdS5ycwBsaWJyYXJ5L2FsbG9jL3NyYy9mbXQucnMAbGlicmFyeS9jb3JlL3NyYy9udW0vZGl5X2Zsb2F0LnJzAHNyYy90b29scy9wYXJzaW5nL2hlYWRpbmdzLnJzAC9ydXN0Yy8wMWY2ZGRmNzU4OGY0MmFlMmQ3ZWIwYTJmMjFkNDRlOGU5NjY3NGNmL2xpYnJhcnkvc3RkL3NyYy9zeXMvdGhyZWFkX2xvY2FsL25vX3RocmVhZHMucnMAL3J1c3RjLzAxZjZkZGY3NTg4ZjQyYWUyZDdlYjBhMmYyMWQ0NGU4ZTk2Njc0Y2YvbGlicmFyeS9hbGxvYy9zcmMvc3RyLnJzAC9ydXN0Yy8wMWY2ZGRmNzU4OGY0MmFlMmQ3ZWIwYTJmMjFkNDRlOGU5NjY3NGNmL2xpYnJhcnkvY29yZS9zcmMvc3RyL3BhdHRlcm4ucnMAbGlicmFyeS9jb3JlL3NyYy9udW0vZmx0MmRlYy9zdHJhdGVneS9kcmFnb24ucnMAbGlicmFyeS9jb3JlL3NyYy9udW0vYmlnbnVtLnJzAGxpYnJhcnkvY29yZS9zcmMvZm10L251bS5ycwAvcnVzdGMvMDFmNmRkZjc1ODhmNDJhZTJkN2ViMGEyZjIxZDQ0ZThlOTY2NzRjZi9saWJyYXJ5L3N0ZC9zcmMvdGhyZWFkL2xvY2FsLnJzAHNyYy90b29scy9mb3JtYXR0aW5nLnJzAC9ydXN0Yy8wMWY2ZGRmNzU4OGY0MmFlMmQ3ZWIwYTJmMjFkNDRlOGU5NjY3NGNmL2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi93YXNtLWJpbmRnZW4tMC4yLjExNC9zcmMvZXh0ZXJucmVmLnJzAC9ydXN0Yy8wMWY2ZGRmNzU4OGY0MmFlMmQ3ZWIwYTJmMjFkNDRlOGU5NjY3NGNmL2xpYnJhcnkvYWxsb2Mvc3JjL2NvbGxlY3Rpb25zL2J0cmVlL25hdmlnYXRlLnJzAGxpYnJhcnkvY29yZS9zcmMvdW5pY29kZS9wcmludGFibGUucnMAL3J1c3RjLzAxZjZkZGY3NTg4ZjQyYWUyZDdlYjBhMmYyMWQ0NGU4ZTk2Njc0Y2YvbGlicmFyeS9hbGxvYy9zcmMvY29sbGVjdGlvbnMvYnRyZWUvbm9kZS5ycwAvcnVzdGMvMDFmNmRkZjc1ODhmNDJhZTJkN2ViMGEyZjIxZDQ0ZThlOTY2NzRjZi9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAvcnVzdC9kZXBzL2hhc2hicm93bi0wLjE2LjEvc3JjL3Jhdy9tb2QucnMAbGlicmFyeS9jb3JlL3NyYy9mbXQvbW9kLnJzAGxpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMvbW9kLnJzAGxpYnJhcnkvY29yZS9zcmMvbnVtL2ZsdDJkZWMvbW9kLnJzAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3NlcmRlX2pzb24tMS4wLjE0OS9zcmMvcmVhZC5ycwAvcnVzdC9kZXBzL2RsbWFsbG9jLTAuMi4xMS9zcmMvZGxtYWxsb2MucnMAbGlicmFyeS9zdGQvc3JjL2FsbG9jLnJzAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3NlcmRlLXdhc20tYmluZGdlbi0wLjYuNS9zcmMvbGliLnJzAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuOTEvc3JjL2xpYi5ycwAVbWVtb3J5IGFsbG9jYXRpb24gb2YgwA0gYnl0ZXMgZmFpbGVkABBmbG9hdGluZyBwb2ludCBgwAFgAAtjaGFyYWN0ZXIgYMABYAAJaW50ZWdlciBgwAFgAAlib29sZWFuIGDAAWAAD21pc3NpbmcgZmllbGQgYMABYAARZHVwbGljYXRlIGZpZWxkIGDAAWAACEpzVmFsdWUowAEpAMALIChvcyBlcnJvciDAASkABkVycm9yKMAILCBsaW5lOiDACiwgY29sdW1uOiDAASkAwAEjAEZhaWxlZCB0byBwYXJzZSB0aGUgZG9jdW1lbnQuIFtMaW5lOiB7TElORV9OVU1CRVJ9XXtMSU5FX05VTUJFUn1GYWlsZWQgdG8gcGFyc2UgdGhlIGRvY3VtZW50LhUEEABPAAAA5AUAABQAAAAVBBAATwAAAOQFAAAhAAAAFQQQAE8AAADYBQAAIQAAABUEEABPAAAAaAQAACQAAAAjIAAAFQQQAE8AAADkBQAAFAAAABUEEABPAAAA5AUAACEAAAAVBBAATwAAANgFAAAhAAAAbWlkID4gbGVuYXR0ZW1wdCB0byBqb2luIGludG8gY29sbGVjdGlvbiB3aXRoIGxlbiA+IHVzaXplOjpNQVgAAMwDEABIAAAAmgAAAAoAAADMAxAASAAAALEAAAAWAAAAFQQQAE8AAABoBAAAJAAAAGBgYABPAxAAHQAAACYAAAA7AAAAAgAAAAwAAAAEAAAAAwAAAAQAAAAFAEHUlsAAC6kBAQAAAAYAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5ADgFEABLAAAASQsAAA4AAABFcnJvcmNhcGFjaXR5IG92ZXJmbG93AADOBhAASgAAAAkCAAAyAAAAY2FsbGVkIGBPcHRpb246OnVud3JhcF90aHJvdygpYCBvbiBhIGBOb25lYCB2YWx1ZQBBiJjAAAsFAQAAAAcAQZiYwAALBQEAAAAIAEGomMAACwUBAAAACQBBuJjAAAsFAQAAAAoAQciYwAALBQEAAAALAEHYmMAACwUBAAAADABB6JjAAAvbCwEAAAANAAAAYWZ0ZXJQcm9wZXJ0aWVzYmVmb3JlQ29udGVudHNiZWZvcmVDb250ZW50c0FmdGVySGVhZGluZ3NiZWZvcmVDb250ZW50c0FmdGVyQ29kZUJsb2Nrc2JlZm9yZUNvZGVCbG9ja3NiZWZvcmVDb2RlQmxvY2tzQWZ0ZXJIZWFkaW5nc2JlZm9yZUNhbGxvdXRzQWZ0ZXJIZWFkaW5nc2JlZm9yZUNhbGxvdXRzYmVmb3JlVG9wTGV2ZWxIZWFkaW5nc2JlZm9yZUZpcnN0U3ViSGVhZGluZ2JlZm9yZVN1YkhlYWRpbmdzbm90aWZ5V2hlblVuY2hhbmdlZHNob3dNb3JlRGV0YWlsZWRFcnJvck1lc3NhZ2VzaW5zZXJ0TmV3bGluZWhlYWRpbmdHYXBzb3RoZXJHYXBzZm9ybWF0T3B0aW9uc290aGVyT3B0aW9ucwppbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlAAAgBRAAFwAAAMgAAAARAAAARmFpbGVkIHRvIHJlYWQgb3B0aW9ucy4gU29tZSBvZiB0aGVtIGFyZSBwb3NzaWJseSBub3QgcG9zaXRpdmUgbnVtYmVyIHZhbHVlcy4AAABPAxAAHQAAAGYAAAAMAAAAbm90aWZ5V2hlblVuY2hhbmdlZHNob3dNb3JlRGV0YWlsZWRFcnJvck1lc3NhZ2VzXA4QABMAAABvDhAAHQAAAGluc2VydE5ld2xpbmUAAACcDhAADQAAAFBsdWdpbk9wdGlvbnNoZWFkaW5nR2Fwc290aGVyR2Fwc2Zvcm1hdE9wdGlvbnNvdGhlck9wdGlvbnMAAMEOEAALAAAAzA4QAAkAAADVDhAADQAAAOIOEAAMAAAAYWZ0ZXJQcm9wZXJ0aWVzYmVmb3JlQ29udGVudHNiZWZvcmVDb250ZW50c0FmdGVySGVhZGluZ3NiZWZvcmVDb250ZW50c0FmdGVyQ29kZUJsb2Nrc2JlZm9yZUNvZGVCbG9ja3NiZWZvcmVDb2RlQmxvY2tzQWZ0ZXJIZWFkaW5nc2JlZm9yZUNhbGxvdXRzQWZ0ZXJIZWFkaW5nc2JlZm9yZUNhbGxvdXRzABAPEAAPAAAAHw8QAA4AAAAtDxAAGwAAAEgPEAAdAAAAZQ8QABAAAAB1DxAAHQAAAJIPEAAbAAAArQ8QAA4AAABiZWZvcmVUb3BMZXZlbEhlYWRpbmdzYmVmb3JlRmlyc3RTdWJIZWFkaW5nYmVmb3JlU3ViSGVhZGluZ3P8DxAAFgAAABIQEAAVAAAAJxAQABEAAABGYWlsZWQgdG8gcmVhZCBsb2NhbGUgZmlsZS5wYXJzaW5nZm9ybWF0dGluZ3N0cnVjdCBPdGhlckdhcHNzdHJ1Y3QgSGVhZGluZ0dhcHNzdHJ1Y3QgT3RoZXJPcHRpb25zc3RydWN0IEZvcm1hdE9wdGlvbnNzdHJ1Y3QgUGx1Z2luT3B0aW9uc2Rlc2NyaXB0aW9uKCkgaXMgZGVwcmVjYXRlZDsgdXNlIERpc3BsYXkAAAB37I0cLRLzWWjqLmaTWzakLX+mAbg7vIUjUBLdt+QPEhAAAAAEAAAABAAAABEAAAAQAAAABAAAAAQAAAASAAAAEQAAACQREAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAEAAAABAAAABkAAAAYAAAABAAAAAQAAAAaAAAAGQAAAGAREAAbAAAAHAAAABUAAAAbAAAAFwAAAAAAAAAEAAAABAAAAB0AAABFcnJvcgAAABUEEABPAAAAzQEAADcAAAAhAAAASggQAGUAAAA1AAAADgAAAEF0dGVtcHRlZCB0byBpbml0aWFsaXplIHRocmVhZC1sb2NhbCB3aGlsZSBpdCBpcyBiZWluZyBkcm9wcGVkAABtAxAAXgAAAGsAAAANAAAA0AQQAE8AAADfAQAAGQAAAP//////////OBIQAEHQpMAAC1mwCBAAWgAAAHY0AAABAAAAY2xvc3VyZSBpbnZva2VkIHJlY3Vyc2l2ZWx5IG9yIGFmdGVyIGJlaW5nIGRyb3BwZWQAAEAAAAAMAAAABAAAAEEAAABCAAAABQBBtKXAAAu8GAEAAABDAAAAYSBEaXNwbGF5IGltcGxlbWVudGF0aW9uIHJldHVybmVkIGFuIGVycm9yIHVuZXhwZWN0ZWRseQA4BRAASwAAAEkLAAAOAAAARXJyb3JFT0Ygd2hpbGUgcGFyc2luZyBhIGxpc3RFT0Ygd2hpbGUgcGFyc2luZyBhbiBvYmplY3RFT0Ygd2hpbGUgcGFyc2luZyBhIHN0cmluZ0VPRiB3aGlsZSBwYXJzaW5nIGEgdmFsdWVleHBlY3RlZCBgOmBleHBlY3RlZCBgLGAgb3IgYF1gZXhwZWN0ZWQgYCxgIG9yIGB9YGV4cGVjdGVkIGlkZW50ZXhwZWN0ZWQgdmFsdWVleHBlY3RlZCBgImBpbnZhbGlkIGVzY2FwZWludmFsaWQgbnVtYmVybnVtYmVyIG91dCBvZiByYW5nZWludmFsaWQgdW5pY29kZSBjb2RlIHBvaW50Y29udHJvbCBjaGFyYWN0ZXIgKFx1MDAwMC1cdTAwMUYpIGZvdW5kIHdoaWxlIHBhcnNpbmcgYSBzdHJpbmdrZXkgbXVzdCBiZSBhIHN0cmluZ2ludmFsaWQgdmFsdWU6IGV4cGVjdGVkIGtleSB0byBiZSBhIG51bWJlciBpbiBxdW90ZXNmbG9hdCBrZXkgbXVzdCBiZSBmaW5pdGUgKGdvdCBOYU4gb3IgKy8taW5mKWxvbmUgbGVhZGluZyBzdXJyb2dhdGUgaW4gaGV4IGVzY2FwZXRyYWlsaW5nIGNvbW1hdHJhaWxpbmcgY2hhcmFjdGVyc3VuZXhwZWN0ZWQgZW5kIG9mIGhleCBlc2NhcGVyZWN1cnNpb24gbGltaXQgZXhjZWVkZWR1bGxydWVhbHNlAAAAAAAAAPA/AAAAAAAAJEAAAAAAAABZQAAAAAAAQI9AAAAAAACIw0AAAAAAAGr4QAAAAACAhC5BAAAAANASY0EAAAAAhNeXQQAAAABlzc1BAAAAIF+gAkIAAADodkg3QgAAAKKUGm1CAABA5ZwwokIAAJAexLzWQgAANCb1awxDAIDgN3nDQUMAoNiFVzR2QwDITmdtwatDAD2RYORY4UNAjLV4Ha8VRFDv4tbkGktEktVNBs/wgET2SuHHAi21RLSd2XlDeOpEkQIoLCqLIEU1AzK39K1URQKE/uRx2YlFgRIfL+cnwEUh1+b64DH0ReqMoDlZPilGJLAIiO+N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FXULr1Df1KNKdWdtkgtlpoB1wAh3Tv7PtHXxyhTi/QPqddb+TK1+QiB2jD6gWB5TVHYvTsju5WeJdrthemrfwb92FX2MoivZ83ZanC+Lds8od3CD+y1UA193JjK9nBRik3ewfuzDmTrId1ye5zRASf53+cIQIcjtMni481QpOqlneKUwqrOIk514Z15KcDV80ngB9lzMQhsHeYIzdH8T4jx5MaCoL0wNcnk9yJI7n5CmeU16dwrHNNx5cKyKZvygEXqMVy2AOwlGem+tOGCKi3t6ZWwjfDY3sXp/RywbBIXlel5Z9yFF5hp725c6NevPUHvSPYkC5gOFe0aNK4PfRLp7TDj7sQtr8HtfBnqezoUkfPaHGEZCp1l8+lTPa4kIkHw4KsPGqwrEfMf0c7hWDfl8+PGQZqxQL307lxrAa5JjfQo9IbAGd5h9TIwpXMiUzn2w95k5/RwDfpx1AIg85Dd+A5MAqkvdbX7iW0BKT6qiftpy0BzjVNd+kI8E5BsqDX+62YJuUTpCfymQI8rlyHZ/M3SsPB97rH+gyOuF88zhfwBBiL7AAAutGf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQACAAMABAAFAAYABwAIAAkA//////////////////8KAAsADAANAA4ADwD/////////////////////////////////////////////////////////////////////CgALAAwADQAOAA8A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAQACAAMABAAFAAYABwAIAAkAD//////////////////6AAsADAANAA4ADwAP////////////////////////////////////////////////////////////////////+gALAAwADQAOAA8AD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+lBxAAYAAAALMBAAAaAAAApQcQAGAAAAAAAgAAEwAAAKUHEABgAAAACQIAAD4AAAClBxAAYAAAAAUCAAAzAAAApQcQAGAAAAAPAgAAOgAAAKUHEABgAAAApgEAAEUAAAClBxAAYAAAAKsBAAA9AAAApQcQAGAAAABuAgAAGQAAAEQAAAAMAAAABAAAAEUAAABGAAAABQAAAIQCEABgAAAAoAEAAC4AAABhc3NlcnRpb24gZmFpbGVkOiBpZHggPCBDQVBBQ0lUWWFzc2VydGlvbiBmYWlsZWQ6IGVkZ2UuaGVpZ2h0ID09IHNlbGYuaGVpZ2h0IC0gMXIGEABbAAAAtgIAAAkAAAByBhAAWwAAALoCAAAJAAAAcgYQAFsAAADwAAAATQAAAGFzc2VydGlvbiBmYWlsZWQ6IHNyYy5sZW4oKSA9PSBkc3QubGVuKClyBhAAWwAAAFQHAAAFAAAAcgYQAFsAAADQBAAAIwAAAHIGEABbAAAAEwUAACQAAABhc3NlcnRpb24gZmFpbGVkOiBlZGdlLmhlaWdodCA9PSBzZWxmLm5vZGUuaGVpZ2h0IC0gMQAAAHIGEABbAAAAAwQAAAkAAADsBRAAXwAAAFgCAAAwAAAA7AUQAF8AAADGAAAAJwAAAGJ5dGUgYXJyYXl1bml0IHZhbHVlT3B0aW9uIHZhbHVlbmV3dHlwZSBzdHJ1Y3RzZXF1ZW5jZW1hcGVudW11bml0IHZhcmlhbnRuZXd0eXBlIHZhcmlhbnR0dXBsZSB2YXJpYW50c3RydWN0IHZhcmlhbnQuMAAAAAAAAAAIAAAABAAAAE4AAABPAAAAUAAAAGEgYm9vbGVhbmEgc3RyaW5nAAAAhAUQAGcAAAB/AAAAEQAAAIQFEABnAAAAjAAAABEAAABtXcvWLFDrY3hBpldxG4u5fKYCwkDZ+rlAxpaiZNPQa2VudGl0eSBub3QgZm91bmRwZXJtaXNzaW9uIGRlbmllZGNvbm5lY3Rpb24gcmVmdXNlZGNvbm5lY3Rpb24gcmVzZXRob3N0IHVucmVhY2hhYmxlbmV0d29yayB1bnJlYWNoYWJsZWNvbm5lY3Rpb24gYWJvcnRlZG5vdCBjb25uZWN0ZWRhZGRyZXNzIGluIHVzZWFkZHJlc3Mgbm90IGF2YWlsYWJsZW5ldHdvcmsgZG93bmJyb2tlbiBwaXBlZW50aXR5IGFscmVhZHkgZXhpc3Rzb3BlcmF0aW9uIHdvdWxkIGJsb2Nrbm90IGEgZGlyZWN0b3J5aXMgYSBkaXJlY3RvcnlkaXJlY3Rvcnkgbm90IGVtcHR5cmVhZC1vbmx5IGZpbGVzeXN0ZW0gb3Igc3RvcmFnZSBtZWRpdW1maWxlc3lzdGVtIGxvb3Agb3IgaW5kaXJlY3Rpb24gbGltaXQgKGUuZy4gc3ltbGluayBsb29wKXN0YWxlIG5ldHdvcmsgZmlsZSBoYW5kbGVpbnZhbGlkIGlucHV0IHBhcmFtZXRlcmludmFsaWQgZGF0YXRpbWVkIG91dHdyaXRlIHplcm9ubyBzdG9yYWdlIHNwYWNlc2VlayBvbiB1bnNlZWthYmxlIGZpbGVxdW90YSBleGNlZWRlZGZpbGUgdG9vIGxhcmdlcmVzb3VyY2UgYnVzeWV4ZWN1dGFibGUgZmlsZSBidXN5ZGVhZGxvY2tjcm9zcy1kZXZpY2UgbGluayBvciByZW5hbWV0b28gbWFueSBsaW5rc2ludmFsaWQgZmlsZW5hbWVhcmd1bWVudCBsaXN0IHRvbyBsb25nb3BlcmF0aW9uIGludGVycnVwdGVkdW5zdXBwb3J0ZWR1bmV4cGVjdGVkIGVuZCBvZiBmaWxlb3V0IG9mIG1lbW9yeWluIHByb2dyZXNzb3RoZXIgZXJyb3J1bmNhdGVnb3JpemVkIGVycm9yb3BlcmF0aW9uIHN1Y2Nlc3NmdWwAAAAxCBAAGAAAAHABAAAJAAAAWAAAAAwAAAAEAAAAWQAAAFoAAABbAAAAXAAAABAAAAAEAAAAXQAAAF4AAABfAAAAYAAAAAAAAAAIAAAABAAAAGEAAABiAAAAYwAAAGQAAABBY2Nlc3NFcnJvcgAAAAAACAAAAAQAAABlAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZAAABggQACoAAACxBAAACQAAAGFzc2VydGlvbiBmYWlsZWQ6IHBzaXplIDw9IHNpemUgKyBtYXhfb3ZlcmhlYWQAAAYIEAAqAAAAtwQAAA0AAABYAAAADAAAAAQAAABmAAAAEAAAABEAAAASAAAAEAAAABAAAAATAAAAEgAAAA0AAAAOAAAAFQAAAAwAAAALAAAAFQAAABUAAAAPAAAADgAAABMAAAAmAAAAOAAAABkAAAAXAAAADAAAAAkAAAAKAAAAEAAAABcAAAAOAAAADgAAAA0AAAAUAAAACAAAABsAAAAOAAAAEAAAABYAAAAVAAAACwAAABYAAAANAAAACwAAAAsAAAATAAAA1CUQAOQlEAD1JRAAByYQABcmEAAnJhAAOiYQAEwmEABZJhAAZyYQAHwmEACIJhAAkyYQAKgmEAC9JhAAzCYQANomEADtJhAAEycQAEsnEABkJxAAeycQAIcnEACQJxAAmicQAKonEADBJxAAzycQAN0nEADqJxAA/icQAAYoEAAhKBAALygQAD8oEABVKBAAaigQAHUoEACLKBAAmCgQAKMoEACuKBAASGFzaCB0YWJsZSBjYXBhY2l0eSBvdmVyZmxvdxkHEAAqAAAAJQAAACgAAABkZXNjcmlwdGlvbigpIGlzIGRlcHJlY2F0ZWQ7IHVzZSBEaXNwbGF5ajsyluqoBK8eUF/uabwr4EVycm9yAAAAZwAAAAwAAAAEAAAAaAAAAGkAAABqAEHA18AAC9sBAQAAAGsAAABhIGZvcm1hdHRpbmcgdHJhaXQgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3Igd2hlbiB0aGUgdW5kZXJseWluZyBzdHJlYW0gZGlkIG5vdAAAFAMQABgAAACKAgAADgAAAGwAAAAMAAAABAAAAG0AAABsAAAADAAAAAQAAABuAAAAbQAAADAsEABvAAAAcAAAAHEAAABvAAAAcgAAAGNhcGFjaXR5IG92ZXJmbG93AAAAYAcQACAAAAAcAAAABQAAAAICAgICAgICAgICAEG42cAACwgCAgAAAAAAAgBB79nAAAsBAgBBldrAAAsBAQBBsNrAAAsBAQBBkdvAAAvzEHAABwAtAQEBAgECAQFICzAVEAFlBwIGAgIBBCMBHhtbCzoJCQEYBAEJAQMBBSsDOwkqGAEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE3AQEDBQMBBAcCCwIdAToBAgIBAQMDAQQHAgsCHAI5AgEBAgQIAQkBCgIdAUgBBAECAwEBCAFRAQIHDAhiAQIJCwdJAhsBAQEBATcOAQUBAgULASQJAWYEAQYBAgICGQIEAxAEDQECAgYBDwEAAwAEHAMdAh4CQAIBBwgBAgsJAS0DAQF1AiIBdgMEAgkBBgPbAgIBOgEBBwEBAQECCAYKAgEwLgIMFAQwCgQDJgkMAiAEAgY4AQECAwEBBTgIAgKYAwENAQcEAQYBAwLGQAABwyEAA40BYCAABmkCAAQBCiACUAIAAQMBBAEZAgUBlwIaEg0BJggZCwEBLAMwAQIEAgICASQBQwYCAgICDAEIAS8BMwEBAwICBQIBASoCCAHuAQIBBAEAAQAQEBAAAgAB4gGVBQADAQIFBCgDBAGlAgAEQQUAAk0GRgsxBHsBNg8pAQICCgMxBAICBwE9AyQFAQg+AQwCNAkBAQgEAgFfAwIEBgECAZ0BAwgVAjkCAQEBAQwBCQEOBwMFQwECBgEBAgEBAwQDAQEOAlUIAgMBARcBUQECBgEBAgEBAgEC6wECBAYCAQIbAlUIAgEBAmoBAQECCGUBAQECBAEFAAkBAvUBCgQEAZAEAgIEASAKKAYCBAgBCQYCAy4NAQLGAQEDAQHJBwEGAQFSFgIHAQIBAnoGAwEBAgEHAQFIAgMBAQEAAgsCNAUFAxcBAAEGDwAMAwMABTsHAAE/BFEBCwIAAgAuAhcABQMGCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFZAGgBwABPQQABP4C8wECAQcCBQEAB20HAGCA8AAARAcQABsAAAB+CwAAJgAAAEQHEAAbAAAAhwsAABoAAABmYWxzZXRydWUwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS0wALQEEAAbAAAAVwIAAAUAAAAuKzAxMjM0NTY3ODlhYmNkZWYweDAxMjM0NTY3ODlBQkNERUYsCigoCiksAAAAAAAMAAAABAAAAHkAAAB6AAAAewAAAH0gfTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAARAcQABsAAAAECAAAHwAAAGFzc2VydGlvbiBmYWlsZWQ6IG90aGVyID4gMGFzc2VydGlvbiBmYWlsZWQ6IG5vYm9ycm93AAAAlQQQAB4AAACEAQAAAQAAAGFzc2VydGlvbiBmYWlsZWQ6IGRpZ2l0cyA8IDQwYXNzZXJ0aW9uIGZhaWxlZDogcGFydHMubGVuKCkgPj0gNGFzc2VydGlvbiBmYWlsZWQ6IGJ1Zi5sZW4oKSA+PSBNQVhfU0lHX0RJR0lUU05hTmluZjAuYXNzZXJ0aW9uIGZhaWxlZDogYnVmWzBdID4gYicwJwCBBxAAIwAAALgAAAAFAAAAgQcQACMAAAC5AAAABQAAAGFzc2VydGlvbiBmYWlsZWQ6ICFidWYuaXNfZW1wdHkoKQAAAIEHEAAjAAAAtwAAAAUAAABhc3NlcnRpb24gZmFpbGVkOiBidWYubGVuKCkgPj0gbWF4bGVuAAAAgQcQACMAAAB6AgAADQAAAAAAAADfRRo9A88a5sH7zP4AAAAAysaaxxf+cKvc+9T+AAAAAE/cvL78sXf/9vvc/gAAAAAM1mtB75FWvhH85P4AAAAAPPx/kK0f0I0s/Oz+AAAAAIOaVTEoXFHTRvz0/gAAAAC1yaatj6xxnWH8/P4AAAAAy4vuI3cinOp7/AT/AAAAAG1TeECRScyulvwM/wAAAABXzrZdeRI8grH8FP8AAAAAN1b7TTaUEMLL/Bz/AAAAAE+YSDhv6paQ5vwk/wAAAADHOoIly4V01wD9LP8AAAAA9Je/l83PhqAb/TT/AAAAAOWsKheYCjTvNf08/wAAAACOsjUq+2c4slD9RP8AAAAAOz/G0t/UyIRr/Uz/AAAAALrN0xonRN3Fhf1U/wAAAACWySW7zp9rk6D9XP8AAAAAhKVifSRsrNu6/WT/AAAAAPbaXw1YZquj1f1s/wAAAAAm8cPek/ji8+/9dP8AAAAAuID/qqittbUK/nz/AAAAAItKfGwFX2KHJf6E/wAAAABTMME0YP+8yT/+jP8AAAAAVSa6kYyFTpZa/pT/AAAAAL1+KXAkd/nfdP6c/wAAAACPuOW4n73fpo/+pP8AAAAAlH10iM9fqfip/qz/AAAAAM+bqI+TcES5xP60/wAAAABrFQ+/+PAIit/+vP8AAAAAtjExZVUlsM35/sT/AAAAAKx/e9DG4j+ZFP/M/wAAAAAGOysqxBBc5C7/1P8AAAAA05JzaZkkJKpJ/9z/AAAAAA7KAIPytYf9Y//k/wAAAADrGhGSZAjlvH7/7P8AAAAAzIhQbwnMvIyZ//T/AAAAACxlGeJYF7fRs//8/wBBjuzAAAsFQJzO/wQAQZzswAALox4QpdTo6P8MAAAAAAAAAGKsxet4rQMAFAAAAAAAhAmU+Hg5P4EeABwAAAAAALMVB8l7zpfAOAAkAAAAAABwXOp7zjJ+j1MALAAAAAAAaIDpq6Q40tVtADQAAAAAAEUimhcmJ0+fiAA8AAAAAAAn+8TUMaJj7aIARAAAAAAAqK3IjDhl3rC9AEwAAAAAANtlqxqOCMeD2ABUAAAAAACaHXFC+R1dxPIAXAAAAAAAWOcbpixpTZINAWQAAAAAAOqNcBpk7gHaJwFsAAAAAABKd++amaNtokIBdAAAAAAAhWt9tHt4CfJcAXwAAAAAAHcY3Xmh5FS0dwGEAAAAAADCxZtbkoZbhpIBjAAAAAAAPV2WyMVTNcisAZQAAAAAALOgl/pctCqVxwGcAAAAAADjX6CZvZ9G3uEBpAAAAAAAJYw52zTCm6X8AawAAAAAAFyfmKNymsb2FgK0AAAAAADOvulUU7/ctzECvAAAAAAA4kEi8hfz/IhMAsQAAAAAAKV4XNObziDMZgLMAAAAAADfUyF781oWmIEC1AAAAAAAOjAfl9y1oOKbAtwAAAAAAJaz41xT0dmotgLkAAAAAAA8RKek2Xyb+9AC7AAAAAAAEESkp0xMdrvrAvQAAAAAABqcQLbvjquLBgP8AAAAAAAshFemEO8f0CADBAEAAAAAKTGR6eWkEJs7AwwBAAAAAJ0MnKH7mxDnVQMUAQAAAAAp9Dti2SAorHADHAEAAAAAhc+nel5LRICLAyQBAAAAAC3drANA5CG/pQMsAQAAAACP/0ReL5xnjsADNAEAAAAAQbiMnJ0XM9TaAzwBAAAAAKkb47SS2xme9QNEAQAAAADZd9+6br+W6w8ETAEAAAAA5QIQAC4AAAB9AAAAFQAAAOUCEAAuAAAA7wIAACYAAADlAhAALgAAAOMCAAAmAAAA5QIQAC4AAADMAgAAJgAAAGFzc2VydGlvbiBmYWlsZWQ6IGQubWFudCA+IDDlAhAALgAAANwBAAAFAAAAYXNzZXJ0aW9uIGZhaWxlZDogZC5tYW50IDwgKDEgPDwgNjEp5QIQAC4AAADdAQAABQAAAOUCEAAuAAAAMwIAABEAAADlAhAALgAAADYCAAAJAAAA5QIQAC4AAABsAgAACQAAAOUCEAAuAAAA3gEAAAUAAADlAhAALgAAAKkAAAAFAAAAYXNzZXJ0aW9uIGZhaWxlZDogZC5taW51cyA+IDAAAADlAhAALgAAAKoAAAAFAAAAYXNzZXJ0aW9uIGZhaWxlZDogZC5wbHVzID4gMOUCEAAuAAAAqwAAAAUAAABhc3NlcnRpb24gZmFpbGVkOiBkLm1hbnQuY2hlY2tlZF9hZGQoZC5wbHVzKS5pc19zb21lKCkAAOUCEAAuAAAArAAAAAUAAABhc3NlcnRpb24gZmFpbGVkOiBkLm1hbnQuY2hlY2tlZF9zdWIoZC5taW51cykuaXNfc29tZSgpAOUCEAAuAAAArQAAAAUAAADlAhAALgAAAK4AAAAFAAAAYXNzZXJ0aW9uIGZhaWxlZDogZC5tYW50ICsgZC5wbHVzIDwgKDEgPDwgNjEpAAAA5QIQAC4AAACvAAAABQAAAOUCEAAuAAAACgEAABEAAADlAhAALgAAAA0BAAAJAAAA5QIQAC4AAABAAQAACQAAAGUEEAAvAAAACwEAAAUAAABlBBAALwAAAAwBAAAFAAAAZQQQAC8AAAANAQAABQAAAGUEEAAvAAAADgEAAAUAAABlBBAALwAAAA8BAAAFAAAAZQQQAC8AAAByAQAAJAAAAGUEEAAvAAAAhAEAABIAAABlBBAALwAAAHcBAAAvAAAAZQQQAC8AAABmAQAADQAAAGUEEAAvAAAATAEAACIAAABlBBAALwAAAHYAAAAFAAAAZQQQAC8AAAB3AAAABQAAAGUEEAAvAAAAeAAAAAUAAABlBBAALwAAAHkAAAAFAAAAZQQQAC8AAAB6AAAABQAAAGUEEAAvAAAAewAAAAUAAABlBBAALwAAAMIAAAAJAAAAZQQQAC8AAAD7AAAADQAAAGUEEAAvAAAAAgEAABIAAAABAAAACgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QUAypo7wW/yhiMAAACB76yFW0FtLe4EAAABH2q/ZO04bu2Xp9r0+T/pA08YAAE+lS4Jmd8D/TgVDy/kdCPs9c/TCNwExNqwzbwZfzOmAyYf6U4CAAABfC6YW4fTvnKf2diHLxUSxlDea3BuSs8P2JXVbnGyJrBmxq0kNhUdWtNCPA5U/2PAc1XMF+/5ZfIovFX3x9yA3O1u9M7v3F/3UwUALQMQACEAAAAuAAAACQAAAFsuLi5dAAAARQQQAB8AAABmBgAAFQAAAEUEEAAfAAAAlAYAABUAAABFBBAAHwAAAJUGAAAVAAAARQQQAB8AAABzBQAAKAAAAEUEEAAfAAAAcwUAABIAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAADAACDBCAAkQVgAF0ToAASFyAfDCBgH+8sYCsqMOArb6agLAKoIC0e+yAuAP5gNp7/oDb9ASE3AQphNyQNITirDqE5LxghOvMeIUtANKFTHmHhVPBqYVVPb+FVnbxhVgDPYVdl0aFXANohWADgoVmu4iFb7OThXNDoYV0gAO5e8AF/XwAGAQEDAQQCBQcHAggICQIKBQsCDgQQARECEgUTHBQBFQIXAhkNHAUdCB8BJAFqBGsCbgKvA7ECvALPAtEC1AzVCdYC1wLaAeAF4QLmAecE6ALuIPAE+AL6BfsBDCc7Pk5Pj56en3uLk5aisrqGsQYHCTY9Plbz0NEEFBg2N1ZXf6qur7014BKHiY6eBA0OERIpMTQ6RUZJSk5PZGWKjI2PtsHDxMbL1ly2txscBwgKCxQXNjk6qKnY2Qk3kJGoBwo7PmZpj5IRb1+/7u9aYrm69Pz/U1Samy4vJyhVnaCho6SnqK26vMQGCwwVHTo/RVGmp8zNoAcZGiIlPj/f5+zv/8XGBCAjJSYoMzg6SEpMUFNVVlhaXF5gY2Vma3N4fX+KpKqvsMDQrq9ub8fd3pNeInsFAwQtA2YDAS8ugIIdAzEPHAQkCR4FKwVEBA4qgKoGJAQkBCgINAtOAzQMgTcJFgoIGDtFOQNjCAkwFgUhAxsFGyY4BEsFLwQKBwkHQCAnBAwJNgM6BRoHBAwHUEk3Mw0zBy4ICgYmAx0IAoDQUhAGCAkhLggqFhomHBQXCU4EJAlEDRkHCgZICCcJdQtCPioGOwUKBlEGAQUQAwULWQgCHWIeSAgKgKZeIkULCgYNEzoGCgYUHCwEF4C5PGRTDEgJCkZFG0gIUw1JBwpWCFgiDgoGRgodA0dJNwMOCAoGOQcKBiwECoD2GQc7Ax1VAQ8yDYObZnULgMSKTGMNhDAQFgqPmwWCR5q5OobGgjkHKgRcBiYKRgooBROBsDqAxlsFNCxLBDkHEUAFCwcJnNYpIGFzof2BMw8BHQYOBAiBjIkEawUNAwkHEI9ggP0DgbQGFw8RD0cJdDyA9gpzCHAVRnoUDBQMVwkZgIeBRwOFQg8VhFAfBgaA1SsFPiEBcC0DGgQCgUAfEToFAYHQKoDWKwQBgMA2CAKA4ID3KUwECgQCgxFETD2AwjwGAQRVBRs0AoEOLARkDFYKgK44HQ0sBAkHAg4GgJqD2QMRAw0DgNoGDAQBDwwEOAgKBigILAQCDgkngVgIHQMLAzsEHgQKB4D7hAUAAQMFBQYGAgcGCAcJEQocCxkMGQ0QDgwPBBADEhITCRYBFwQYARkDGgkbARwCHxYgAysCLQsuATAEMQIyAakCqgSrCPoC+wX+A/8JrXh5i42iMFdYi4yQHN0OD0tM+/wuLz9cXV/ihI2OkZKpsbq7xcbJyt7k5f8ABBESKTE0Nzo7PUlKXYSOkqmxtLq7xsrOz+TlAAQNDhESKTE0OjtFRklKXmRlhJGbncnOzw0RKTo7RUlXW15fZGWNkam0urvFyd/k5fANEUVJZGWAhLK8vr/V1/Dxg4WLpKa+v8XHz9rbSJi9zcbOz0lOT1dZXl+Jjo+xtre/wcbH1xEWF1tc9vf+/4Btcd7fDh9ubxwdX31+rq/e3027vBYXHh9GR05PWFpcXn5/tcXU1dzw8fVyc490dSYuL6evt7/Hz9ffmgBAl5gwjx/O/05PWlsHCA8QJy/u725vNz0/QkVTZ3XIydDR2Nnn/v8AIF8igt8EgkQIGwQGEYGsDoCrBSAHgRwDGQgBBC8ENAQHAwEHBgcRClAPEgdVBwMEHAoJAwgDBwMCAwMDDAQFAwsGAQ4VBU4HGwdXBwIFGAxQBEMDLQMBBBEGDww6BB0lXyBtBGolgMgFgrADGgaC/QNZBxYJGAkUDBQMagYKBhoGWQcrBUYKLAQMBAEDMQssBBoGCwOArAYKBkwUgPQIPAMPAz4FOAgrBYL/ERgILxEtAyIOIQ+AjASCmhYLFYiUBS8FOwcCDhgJgL4idAyA1hqBEAWA4QnyngM3CYFcFIC4CIDdFDwDCgY4CEYIDAZ0Cx4DWgRZCYCDGBwKFglMBICKBqukDBcEMaEEgdomBwwFBYKzICoGTASAjQSAvgMbAw8NTAYQACUAAAAaAAAANgAAAEwGEAAlAAAACgAAACsAAABhdHRlbXB0IHRvIGRpdmlkZSBieSB6ZXJvAAAAAAAAAAQAAAAEAAAAfAAAAAAAAAAEAAAABAAAAH0AAAA9PSE9bWF0Y2hlcy4uUmVmQ2VsbCBhbHJlYWR5IGJvcnJvd2VkICAgIGNhbm5vdCBwYXJzZSBpbnRlZ2VyIGZyb20gZW1wdHkgc3RyaW5naW52YWxpZCBkaWdpdCBmb3VuZCBpbiBzdHJpbmdudW1iZXIgdG9vIGxhcmdlIHRvIGZpdCBpbiB0YXJnZXQgdHlwZW51bWJlciB0b28gc21hbGwgdG8gZml0IGluIHRhcmdldCB0eXBlbnVtYmVyIHdvdWxkIGJlIHplcm8gZm9yIG5vbi16ZXJvIHR5cGUAACBEEAAiRBAAJEQQAAIAAAACAAAABwAAACYAAAAdAAAAJgAAACYAAAAmAAAASUQQAG9EEACMRBAAskQQANhEEABByIrBAAsBBAB8CXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS45My4xICgwMWY2ZGRmNzUgMjAyNi0wMi0xMSkGd2FscnVzBjAuMjUuMgx3YXNtLWJpbmRnZW4TMC4yLjExNCAoMjJjZmQ1NTY4KQBrD3RhcmdldF9mZWF0dXJlcwYrD211dGFibGUtZ2xvYmFscysTbm9udHJhcHBpbmctZnB0b2ludCsLYnVsay1tZW1vcnkrCHNpZ24tZXh0Kw9yZWZlcmVuY2UtdHlwZXMrCm11bHRpdmFsdWU=', imports)}

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