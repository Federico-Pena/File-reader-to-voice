"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtfProcessor = void 0;
const ApiError_1 = require("../ApiError/ApiError");
const rtfProcessor = (rtfBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = rtfToTxt(rtfBuffer.toString('utf-8').trim());
        if (text.trim().length === 0) {
            throw new ApiError_1.ApiError('Error procesando el archivo RTF.', 500);
        }
        return text.trim().split('\n\n');
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        else {
            throw new ApiError_1.ApiError('Error procesando el archivo RTF.', 500);
        }
    }
});
exports.rtfProcessor = rtfProcessor;
const rtfToTxt = (rtf) => {
    const pattern = /\\([a-z]{1,32})(-?\d{1,10})?[ ]?|\\'([0-9a-f]{2})|\\([^a-z])|([{}])|[\r\n]+|(.)|[\u2022]/gi;
    const stack = [];
    let ignorable = false;
    let ucskip = 1;
    let curskip = 0;
    const out = [];
    let match;
    let word;
    let arg;
    let hex;
    let char;
    let brace;
    let tchar;
    while ((match = pattern.exec(rtf)) !== null) {
        ;
        [word, arg, hex, char, brace, tchar] = match.slice(1);
        if (typeof brace === 'string' && brace !== '') {
            curskip = 0;
            if (brace === '{') {
                stack.push([ucskip, ignorable]);
            }
            else if (brace === '}') {
                const popped = stack.pop();
                if (popped !== undefined) {
                    ;
                    [ucskip, ignorable] = popped;
                }
            }
        }
        else if (typeof char === 'string' && char !== '') {
            curskip = 0;
            if (char === '~' && !ignorable) {
                out.push('\xA0'); // NBSP
            }
            else if ('{}\\'.includes(char) && !ignorable) {
                out.push(char);
            }
            else if (char === '*') {
                ignorable = true;
            }
        }
        else if (typeof word === 'string' && word !== '') {
            curskip = 0;
            if (destinations.has(word)) {
                ignorable = true;
            }
            else if (!ignorable) {
                if (word in specialchars) {
                    out.push(specialchars[word]);
                }
                else if (word === 'uc' && arg !== '') {
                    ucskip = parseInt(arg, 10);
                }
                else if (word === 'u' && arg !== '') {
                    let c = parseInt(arg, 10);
                    if (c < 0)
                        c += 0x10000;
                    out.push(String.fromCharCode(c));
                    curskip = ucskip;
                }
            }
        }
        else if (typeof hex === 'string' && hex !== '') {
            if (curskip > 0) {
                curskip -= 1;
            }
            else if (!ignorable) {
                const c = parseInt(hex, 16);
                out.push(String.fromCharCode(c));
            }
        }
        else if (typeof tchar === 'string' && tchar !== '') {
            if (curskip > 0) {
                curskip -= 1;
            }
            else if (!ignorable) {
                out.push(tchar);
            }
        }
    }
    return out.join('');
};
const destinations = new Set([
    'aftncn',
    'aftnsep',
    'aftnsepc',
    'annotation',
    'atnauthor',
    'atndate',
    'atnicn',
    'atnid',
    'atnparent',
    'atnref',
    'atntime',
    'atrfend',
    'atrfstart',
    'author',
    'background',
    'bkmkend',
    'bkmkstart',
    'blipuid',
    'buptim',
    'category',
    'colorschememapping',
    'colortbl',
    'comment',
    'company',
    'creatim',
    'datafield',
    'datastore',
    'defchp',
    'defpap',
    'do',
    'doccomm',
    'docvar',
    'dptxbxtext',
    'ebcend',
    'ebcstart',
    'factoidname',
    'falt',
    'fchars',
    'ffdeftext',
    'ffentrymcr',
    'ffexitmcr',
    'ffformat',
    'ffhelptext',
    'ffl',
    'ffname',
    'ffstattext',
    'field',
    'file',
    'filetbl',
    'fldinst',
    'fldrslt',
    'fldtype',
    'fname',
    'fontemb',
    'fontfile',
    'fonttbl',
    'footer',
    'footerf',
    'footerl',
    'footerr',
    'footnote',
    'formfield',
    'ftncn',
    'ftnsep',
    'ftnsepc',
    'g',
    'generator',
    'gridtbl',
    'header',
    'headerf',
    'headerl',
    'headerr',
    'hl',
    'hlfr',
    'hlinkbase',
    'hlloc',
    'hlsrc',
    'hsv',
    'htmltag',
    'info',
    'keycode',
    'keywords',
    'latentstyles',
    'lchars',
    'levelnumbers',
    'leveltext',
    'lfolevel',
    'linkval',
    'list',
    'listlevel',
    'listname',
    'listoverride',
    'listoverridetable',
    'listpicture',
    'liststylename',
    'listtable',
    'listtext',
    'lsdlockedexcept',
    'macc',
    'maccPr',
    'mailmerge',
    'maln',
    'malnScr',
    'manager',
    'margPr',
    'mbar',
    'mbarPr',
    'mbaseJc',
    'mbegChr',
    'mborderBox',
    'mborderBoxPr',
    'mbox',
    'mboxPr',
    'mchr',
    'mcount',
    'mctrlPr',
    'md',
    'mdeg',
    'mdegHide',
    'mden',
    'mdiff',
    'mdPr',
    'me',
    'mendChr',
    'meqArr',
    'meqArrPr',
    'mf',
    'mfName',
    'mfPr',
    'mfunc',
    'mfuncPr',
    'mgroupChr',
    'mgroupChrPr',
    'mgrow',
    'mhideBot',
    'mhideLeft',
    'mhideRight',
    'mhideTop',
    'mhtmltag',
    'mlim',
    'mlimloc',
    'mlimlow',
    'mlimlowPr',
    'mlimupp',
    'mlimuppPr',
    'mm',
    'mmaddfieldname',
    'mmath',
    'mmathPict',
    'mmathPr',
    'mmaxdist',
    'mmc',
    'mmcJc',
    'mmconnectstr',
    'mmconnectstrdata',
    'mmcPr',
    'mmcs',
    'mmdatasource',
    'mmheadersource',
    'mmmailsubject',
    'mmodso',
    'mmodsofilter',
    'mmodsofldmpdata',
    'mmodsomappedname',
    'mmodsoname',
    'mmodsorecipdata',
    'mmodsosort',
    'mmodsosrc',
    'mmodsotable',
    'mmodsoudl',
    'mmodsoudldata',
    'mmodsouniquetag',
    'mmPr',
    'mmquery',
    'mmr',
    'mnary',
    'mnaryPr',
    'mnoBreak',
    'mnum',
    'mobjDist',
    'moMath',
    'moMathPara',
    'moMathParaPr',
    'mopEmu',
    'mphant',
    'mphantPr',
    'mplcHide',
    'mpos',
    'mr',
    'mrad',
    'mradPr',
    'mrPr',
    'msepChr',
    'mshow',
    'mshp',
    'msPre',
    'msPrePr',
    'msSub',
    'msSubPr',
    'msSubSup',
    'msSubSupPr',
    'msSup',
    'msSupPr',
    'mstrikeBLTR',
    'mstrikeH',
    'mstrikeTLBR',
    'mstrikeV',
    'msub',
    'msubHide',
    'msup',
    'msupHide',
    'mtransp',
    'mtype',
    'mvertJc',
    'mvfmf',
    'mvfml',
    'mvtof',
    'mvtol',
    'mzeroAsc',
    'mzeroDesc',
    'mzeroWid',
    'nesttableprops',
    'nextfile',
    'nonesttables',
    'objalias',
    'objclass',
    'objdata',
    'object',
    'objname',
    'objsect',
    'objtime',
    'oldcprops',
    'oldpprops',
    'oldsprops',
    'oldtprops',
    'oleclsid',
    'operator',
    'panose',
    'password',
    'passwordhash',
    'pgp',
    'pgptbl',
    'picprop',
    'pict',
    'pn',
    'pnseclvl',
    'pntext',
    'pntxta',
    'pntxtb',
    'printim',
    'private',
    'propname',
    'protend',
    'protstart',
    'protusertbl',
    'pxe',
    'result',
    'revtbl',
    'revtim',
    'rsidtbl',
    'rxe',
    'shp',
    'shpgrp',
    'shpinst',
    'shppict',
    'shprslt',
    'shptxt',
    'sn',
    'sp',
    'staticval',
    'stylesheet',
    'subject',
    'sv',
    'svb',
    'tc',
    'template',
    'themedata',
    'title',
    'txe',
    'ud',
    'upr',
    'userprops',
    'wgrffmtfilter',
    'windowcaption',
    'writereservation',
    'writereservhash',
    'xe',
    'xform',
    'xmlattrname',
    'xmlattrvalue',
    'xmlclose',
    'xmlname',
    'xmlnstbl',
    'xmlopen'
]);
const specialchars = {
    par: '\n',
    sect: '\n\n',
    page: '\n\n',
    line: '\n',
    tab: '\t',
    emdash: '\u2014',
    endash: '\u2013',
    emspace: '\u2003',
    enspace: '\u2002',
    qmspace: '\u2005',
    bullet: '\u2022',
    lquote: '\u2018',
    rquote: '\u2019',
    ldblquote: '\u201C',
    rdblquote: '\u201D'
};
