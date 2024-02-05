import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { useRef, useDebugValue, createElement, useContext } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

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


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

/**
 * @param {string[]} array
 * @param {RegExp} pattern
 * @return {string[]}
 */
function filter (array, pattern) {
	return array.filter(function (value) { return !match(value, pattern) })
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {object[]} siblings
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length, siblings) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: '', siblings: siblings}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0, root.siblings), root, {length: -root.length}, props)
}

/**
 * @param {object} root
 */
function lift (root) {
	while (root.root)
		root = copy(root.root, {children: [root]});

	append(root, root.siblings);
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1, declarations) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2, declarations), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @param {object[]} siblings
 * @return {object}
 */
function comment (value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function declaration (value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings)
}

/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return WEBKIT + value + value
		// tab-size
		case 4789:
			return MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return WEBKIT + value + MOZ + value + MS + value + value
		// writing-mode
		case 5936:
			switch (charat(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return WEBKIT + value + MS + value + value
		// order
		case 6165:
			return WEBKIT + value + MS + 'flex-' + value + value
		// align-items
		case 5187:
			return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/g, '') + (!match(value, /flex-|baseline/) ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
		// cursor
		case 6187:
			return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value
		// justify-self
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + 'grid-column-align' + substr(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return MS + replace(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, match(element.props, /grid-\w+-end/) })) {
				return ~indexof(value + (children = children[length].value), 'span') ? value : (MS + replace(value, '-start', '') + value + MS + 'grid-row-span:' + (~indexof(children, 'span') ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ';')
			}
			return MS + replace(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return match(element.props, /grid-\w+-start/) })) ? value : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if (strlen(value) - 1 - length > 6)
				switch (charat(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if (charat(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (MS + a + ':' + b + f) + (c ? (MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if (charat(value, length + 6) === 121)
				return replace(value, ':', ':' + WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return replace(value, ':', ':' + MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return replace(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';

	for (var i = 0; i < children.length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: if (!strlen(element.value = element.props.join(','))) return ''
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case DECLARATION: element.return = prefix(element.value, element.length, children);
					return
				case KEYFRAMES:
					return serialize([copy(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
				case RULESET:
					if (element.length)
						return combine(children = element.props, function (value) {
							switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									lift(copy(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]}));
									lift(copy(element, {props: [value]}));
									assign(element, {props: filter(children, callback)});
									break
								// :placeholder
								case '::placeholder':
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}));
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}));
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]}));
									lift(copy(element, {props: [value]}));
									assign(element, {props: filter(children, callback)});
									break
							}

							return ''
						})
			}
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var f="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",y="undefined"!=typeof window&&"HTMLElement"in window,v=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!==process.env.NODE_ENV),S=/invalid hook call/i,w=new Set,b=function(t,n){if("production"!==process.env.NODE_ENV){var o=n?' with the id of "'.concat(n,'"'):"",s="The component ".concat(t).concat(o," has been created dynamically.\n")+"You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",i=console.error;try{var a=!0;console.error=function(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];S.test(t)?(a=!1,w.delete(s)):i.apply(void 0,__spreadArray([t],n,!1));},useRef(),a&&!w.has(s)&&(console.warn(s),w.add(s));}catch(e){S.test(e.message)&&w.delete(s);}finally{console.error=i;}}},E=Object.freeze([]),N=Object.freeze({});function P(e,t,n){return void 0===n&&(n=N),e.theme!==n.theme&&e.theme||t||n.theme}var _=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),C=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,I=/(^-|-$)/g;function A(e){return e.replace(C,"-").replace(I,"")}var O=/(a)(d)/gi,D=function(e){return String.fromCharCode(e+(e>25?39:97))};function R(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=D(t%52)+n;return (D(t%52)+n).replace(O,"$1-$2")}var T,k=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},j=function(e){return k(5381,e)};function x(e){return R(j(e)>>>0)}function V(e){return "production"!==process.env.NODE_ENV&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function F(e){return "string"==typeof e&&("production"===process.env.NODE_ENV||e.charAt(0)===e.charAt(0).toLowerCase())}var M="function"==typeof Symbol&&Symbol.for,z=M?Symbol.for("react.memo"):60115,$=M?Symbol.for("react.forward_ref"):60112,B={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},L={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},G={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Y=((T={})[$]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},T[z]=G,T);function q(e){return ("type"in(t=e)&&t.type.$$typeof)===z?G:"$$typeof"in e?Y[e.$$typeof]:B;var t;}var W=Object.defineProperty,H=Object.getOwnPropertyNames,U=Object.getOwnPropertySymbols,J=Object.getOwnPropertyDescriptor,X=Object.getPrototypeOf,Z=Object.prototype;function K(e,t,n){if("string"!=typeof t){if(Z){var o=X(t);o&&o!==Z&&K(e,o,n);}var r=H(t);U&&(r=r.concat(U(t)));for(var s=q(e),i=q(t),a=0;a<r.length;++a){var c=r[a];if(!(c in L||n&&n[c]||i&&c in i||s&&c in s)){var l=J(t,c);try{W(e,c,l);}catch(e){}}}}return e}function Q(e){return "function"==typeof e}function ee(e){return "object"==typeof e&&"styledComponentId"in e}function te(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ne(e,t){if(0===e.length)return "";for(var n=e[0],o=1;o<e.length;o++)n+=t?t+e[o]:e[o];return n}function oe(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function re(e,t,n){if(void 0===n&&(n=!1),!n&&!oe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=re(e[o],t[o]);else if(oe(t))for(var o in t)e[o]=re(e[o],t[o]);return e}function se(e,t){Object.defineProperty(e,"toString",{value:t});}var ie="production"!==process.env.NODE_ENV?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",18:"ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`"}:{};function ae(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n=e[0],o=[],r=1,s=e.length;r<s;r+=1)o.push(e[r]);return o.forEach(function(e){n=n.replace(/%[a-z]/,e);}),n}function ce(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return "production"===process.env.NODE_ENV?new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(n.length>0?" Args: ".concat(n.join(", ")):"")):new Error(ae.apply(void 0,__spreadArray([ie[t]],n,!1)).trim())}var le=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,r=o;e>=r;)if((r<<=1)<0)throw ce(16,"".concat(e));this.groupSizes=new Uint32Array(r),this.groupSizes.set(n),this.length=r;for(var s=o;s<r;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++);},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),o=n+t;this.groupSizes[e]=0;for(var r=n;r<o;r++)this.tag.deleteRule(n);}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],o=this.indexOfGroup(e),r=o+n,s=o;s<r;s++)t+="".concat(this.tag.getRule(s)).concat("/*!sc*/\n");return t},e}(),ue=new Map,pe=new Map,de=1,he=function(e){if(ue.has(e))return ue.get(e);for(;pe.has(de);)de++;var t=de++;if("production"!==process.env.NODE_ENV&&((0|t)<0||t>1073741824))throw ce(16,"".concat(t));return ue.set(e,t),pe.set(t,e),t},fe=function(e,t){ue.set(e,t),pe.set(t,e);},me="style[".concat(f,"][").concat("data-styled-version",'="').concat("6.1.0",'"]'),ye=new RegExp("^".concat(f,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ve=function(e,t,n){for(var o,r=n.split(","),s=0,i=r.length;s<i;s++)(o=r[s])&&e.registerName(t,o);},ge=function(e,t){for(var n,o=(null!==(n=t.textContent)&&void 0!==n?n:"").split("/*!sc*/\n"),r=[],s=0,i=o.length;s<i;s++){var a=o[s].trim();if(a){var c=a.match(ye);if(c){var l=0|parseInt(c[1],10),u=c[2];0!==l&&(fe(u,l),ve(e,u,c[3]),e.getTag().insertRules(l,r)),r.length=0;}else r.push(a);}}};function Se(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null}var we=function(e){var t=document.head,n=e||t,o=document.createElement("style"),r=function(e){var t=Array.from(e.querySelectorAll("style[".concat(f,"]")));return t[t.length-1]}(n),s=void 0!==r?r.nextSibling:null;o.setAttribute(f,"active"),o.setAttribute("data-styled-version","6.1.0");var i=Se();return i&&o.setAttribute("nonce",i),n.insertBefore(o,s),o},be=function(){function e(e){this.element=we(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,o=t.length;n<o;n++){var r=t[n];if(r.ownerNode===e)return r}throw ce(17)}(this.element),this.length=0;}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Ee=function(){function e(e){this.element=we(e),this.nodes=this.element.childNodes,this.length=0;}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return !1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ne=function(){function e(e){this.rules=[],this.length=0;}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Pe=y,_e={isServer:!y,useCSSOMInjection:!v},Ce=function(){function e(e,n,o){void 0===e&&(e=N),void 0===n&&(n={});var r=this;this.options=__assign(__assign({},_e),e),this.gs=n,this.names=new Map(o),this.server=!!e.isServer,!this.server&&y&&Pe&&(Pe=!1,function(e){for(var t=document.querySelectorAll(me),n=0,o=t.length;n<o;n++){var r=t[n];r&&"active"!==r.getAttribute(f)&&(ge(e,r),r.parentNode&&r.parentNode.removeChild(r));}}(this)),se(this,function(){return function(e){for(var t=e.getTag(),n=t.length,o="",r=function(n){var r=function(e){return pe.get(e)}(n);if(void 0===r)return "continue";var s=e.names.get(r),i=t.getGroup(n);if(void 0===s||0===i.length)return "continue";var a="".concat(f,".g").concat(n,'[id="').concat(r,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","));}),o+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat("/*!sc*/\n");},s=0;s<n;s++)r(s);return o}(r)});}return e.registerId=function(e){return he(e)},e.prototype.reconstructWithOptions=function(n,o){return void 0===o&&(o=!0),new e(__assign(__assign({},this.options),n),this.gs,o&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Ne(n):t?new be(n):new Ee(n)}(this.options),new le(e)));var e;},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(he(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(he(e),n);},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},e.prototype.clearRules=function(e){this.getTag().clearGroup(he(e)),this.clearNames(e);},e.prototype.clearTag=function(){this.tag=void 0;},e}(),Ie=/&/g,Ae=/^\s*\/\/.*$/gm;function Oe(e,t){return e.map(function(e){return "rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return "".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Oe(e.children,t)),e})}function De(e){var t,n,o,r=void 0===e?N:e,s=r.options,i=void 0===s?N:s,a=r.plugins,c=void 0===a?E:a,l=function(e,o,r){return r===n||r.startsWith(n)&&r.endsWith(n)&&r.replaceAll(n,"").length>0?".".concat(t):e},u=c.slice();u.push(function(e){e.type===RULESET&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Ie,n).replace(o,l));}),i.prefix&&u.push(prefixer),u.push(stringify);var p=function(e,r,s,a){void 0===r&&(r=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=r,o=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(Ae,""),l=compile(s||r?"".concat(s," ").concat(r," { ").concat(c," }"):c);i.namespace&&(l=Oe(l,i.namespace));var p=[];return serialize(l,middleware(u.concat(rulesheet(function(e){return p.push(e)})))),p};return p.hash=c.length?c.reduce(function(e,t){return t.name||ce(15),k(e,t.name)},5381).toString():"",p}var Re=new Ce,Te=De(),ke=React__default.createContext({shouldForwardProp:void 0,styleSheet:Re,stylis:Te});ke.Consumer;React__default.createContext(void 0);function Ve(){return useContext(ke)}var Me=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Te);var o=n.name+t.hash;e.hasNameForId(n.id,o)||e.insertRules(n.id,o,t(n.rules,o,"@keyframes"));},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,se(this,function(){throw ce(12,String(n.name))});}return e.prototype.getName=function(e){return void 0===e&&(e=Te),this.name+e.hash},e}(),ze=function(e){return e>="A"&&e<="Z"};function $e(e){for(var t="",n=0;n<e.length;n++){var o=e[n];if(1===n&&"-"===o&&"-"===e[0])return e;ze(o)?t+="-"+o.toLowerCase():t+=o;}return t.startsWith("ms-")?"-"+t:t}var Be=function(e){return null==e||!1===e||""===e},Le=function(t){var n,o,r=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!Be(i)&&(Array.isArray(i)&&i.isCss||Q(i)?r.push("".concat($e(s),":"),i,";"):oe(i)?r.push.apply(r,__spreadArray(__spreadArray(["".concat(s," {")],Le(i),!1),["}"],!1)):r.push("".concat($e(s),": ").concat((n=s,null==(o=i)||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||n in unitlessKeys||n.startsWith("--")?String(o).trim():"".concat(o,"px")),";")));}return r};function Ge(e,t,n,o){if(Be(e))return [];if(ee(e))return [".".concat(e.styledComponentId)];if(Q(e)){if(!Q(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return [e];var r=e(t);return "production"===process.env.NODE_ENV||"object"!=typeof r||Array.isArray(r)||r instanceof Me||oe(r)||null===r||console.error("".concat(V(e)," is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")),Ge(r,t,n,o)}var s;return e instanceof Me?n?(e.inject(n,o),[e.getName(o)]):[e]:oe(e)?Le(e):Array.isArray(e)?Array.prototype.concat.apply(E,e.map(function(e){return Ge(e,t,n,o)})):[e.toString()]}function Ye(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Q(n)&&!ee(n))return !1}return !0}var qe=j("6.1.0"),We=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"===process.env.NODE_ENV&&(void 0===n||n.isStatic)&&Ye(e),this.componentId=t,this.baseHash=k(qe,t),this.baseStyle=n,Ce.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))o=te(o,this.staticRulesId);else {var r=ne(Ge(this.rules,e,t,n)),s=R(k(this.baseHash,r)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(r,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i);}o=te(o,s),this.staticRulesId=s;}else {for(var a=k(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u,"production"!==process.env.NODE_ENV&&(a=k(a,u));else if(u){var p=ne(Ge(u,e,t,n));a=k(a,p+l),c+=p;}}if(c){var d=R(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),o=te(o,d);}}return o},e}(),He=React__default.createContext(void 0);He.Consumer;var Ze={},Ke=new Set;function Qe(e,r,s){var i=ee(e),a=e,c=!F(e),p=r.attrs,d=void 0===p?E:p,h=r.componentId,f=void 0===h?function(e,t){var n="string"!=typeof e?"sc":A(e);Ze[n]=(Ze[n]||0)+1;var o="".concat(n,"-").concat(x("6.1.0"+n+Ze[n]));return t?"".concat(t,"-").concat(o):o}(r.displayName,r.parentComponentId):h,m=r.displayName,y=void 0===m?function(e){return F(e)?"styled.".concat(e):"Styled(".concat(V(e),")")}(e):m,v=r.displayName&&r.componentId?"".concat(A(r.displayName),"-").concat(r.componentId):r.componentId||f,g=i&&a.attrs?a.attrs.concat(d).filter(Boolean):d,S=r.shouldForwardProp;if(i&&a.shouldForwardProp){var w=a.shouldForwardProp;if(r.shouldForwardProp){var C=r.shouldForwardProp;S=function(e,t){return w(e,t)&&C(e,t)};}else S=w;}var I=new We(s,v,i?a.componentStyle:void 0);function O(e,r){return function(e,r,s){var i=e.attrs,a=e.componentStyle,c=e.defaultProps,p=e.foldedComponentIds,d=e.styledComponentId,h=e.target,f=React__default.useContext(He),m=Ve(),y=e.shouldForwardProp||m.shouldForwardProp;"production"!==process.env.NODE_ENV&&useDebugValue(d);var v=function(e,n,o){for(var r,s=__assign(__assign({},n),{className:void 0,theme:o}),i=0;i<e.length;i+=1){var a=Q(r=e[i])?r(s):r;for(var c in a)s[c]="className"===c?te(s[c],a[c]):"style"===c?__assign(__assign({},s[c]),a[c]):a[c];}return n.className&&(s.className=te(s.className,n.className)),s}(i,r,P(r,f,c)||N),g=v.as||h,S={};for(var w in v)void 0===v[w]||"$"===w[0]||"as"===w||"theme"===w||("forwardedAs"===w?S.as=v.forwardedAs:y&&!y(w,g)||(S[w]=v[w],y||"development"!==process.env.NODE_ENV||isPropValid(w)||Ke.has(w)||!_.has(g)||(Ke.add(w),console.warn('styled-components: it looks like an unknown prop "'.concat(w,'" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));var b=function(e,t){var n=Ve(),o=e.generateAndInjectStyles(t,n.styleSheet,n.stylis);return "production"!==process.env.NODE_ENV&&useDebugValue(o),o}(a,v);"production"!==process.env.NODE_ENV&&e.warnTooManyClasses&&e.warnTooManyClasses(b);var E=te(p,d);return b&&(E+=" "+b),v.className&&(E+=" "+v.className),S[F(g)&&!_.has(g)?"class":"className"]=E,S.ref=s,createElement(g,S)}(D,e,r)}"production"!==process.env.NODE_ENV&&(O.displayName=y);var D=React__default.forwardRef(O);return D.attrs=g,D.componentStyle=I,D.shouldForwardProp=S,"production"!==process.env.NODE_ENV&&(D.displayName=y),D.foldedComponentIds=i?te(a.foldedComponentIds,a.styledComponentId):"",D.styledComponentId=v,D.target=i?a.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var o=0,r=t;o<r.length;o++)re(e,r[o],!0);return e}({},a.defaultProps,e):e;}}),"production"!==process.env.NODE_ENV&&(b(y,v),D.warnTooManyClasses=function(e,t){var n={},o=!1;return function(r){if(!o&&(n[r]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'.concat(t,'"'):"";console.warn("Over ".concat(200," classes were generated for component ").concat(e).concat(s,".\n")+"Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),o=!0,n={};}}}(y,v)),se(D,function(){return ".".concat(D.styledComponentId)}),c&&K(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function et(e,t){for(var n=[e[0]],o=0,r=t.length;o<r;o+=1)n.push(t[o],e[o+1]);return n}var tt=function(e){return Object.assign(e,{isCss:!0})};function nt(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];if(Q(t)||oe(t)){var r=t;return tt(Ge(et(E,__spreadArray([r],n,!0))))}var s=t;return 0===n.length&&1===s.length&&"string"==typeof s[0]?Ge(s):tt(Ge(et(s,n)))}function ot(n,o,r){if(void 0===r&&(r=N),!o)throw ce(1,o);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(o,r,nt.apply(void 0,__spreadArray([t],s,!1)))};return s.attrs=function(e){return ot(n,o,__assign(__assign({},r),{attrs:Array.prototype.concat(r.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return ot(n,o,__assign(__assign({},r),e))},s}var rt=function(e){return ot(Qe,e)},st=rt;_.forEach(function(e){st[e]=rt(e);});"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");var ht="__sc-".concat(f,"__");"production"!==process.env.NODE_ENV&&"test"!==process.env.NODE_ENV&&"undefined"!=typeof window&&(window[ht]||(window[ht]=0),1===window[ht]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window[ht]+=1);

/**
 * 监听 DOM 元素大小变化，返回变化后的 Size
 * @param ref 需监听大小变化的 DOM 元素
 * @returns
 */
function useSize(ref) {
    var _a = React.useState(function () {
        var _a;
        return ref.current ? { width: (_a = ref.current) === null || _a === void 0 ? void 0 : _a.clientWidth, height: ref.current.clientHeight } : undefined;
    }), state = _a[0], setState = _a[1];
    React.useLayoutEffect(function () {
        if (!ref.current)
            return;
        var resizeObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                var _a = entry.target, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
                setState({ width: clientWidth, height: clientHeight });
            });
        });
        resizeObserver.observe(ref.current);
        return function () {
            resizeObserver.disconnect();
        };
    }, [ref]);
    return state;
}

var Manager = {
    mouseHandled: false,
    isDragging: false,
    isReszing: false,
    dragWidgetId: '',
    resizeWidgetId: '',
};
var MouseDownIgnore = 'input,textarea,button,select,option,[contenteditable="true"],.rdl-resizable-handle';
function cls() {
    var classNamesList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classNamesList[_i] = arguments[_i];
    }
    return classNamesList
        .filter(function (item) { return !!item; })
        .map(function (item) {
        if (typeof item === 'object' && !Array.isArray(item)) {
            return Object.keys(item).filter(function (key) { return item[key]; });
        }
        return item;
    })
        .toString() // 输出 class1,class2,class3,...
        .split(',')
        .join(' ')
        .trim();
}
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
function getActionOffset(e, widget, layout) {
    var targetOffset = widget.getBoundingClientRect();
    var layoutOffset = layout.getBoundingClientRect();
    var result = {
        left: targetOffset.left,
        top: targetOffset.top,
        width: targetOffset.width,
        height: targetOffset.height,
        offsetLeft: targetOffset.left - e.clientX,
        offsetTop: targetOffset.top - e.clientY,
        layoutLeft: layoutOffset.left,
        layoutTop: layoutOffset.top,
    };
    return result;
}
function sort(nodes, dir, column) {
    if (!column) {
        var widths = nodes.map(function (n) { var _a; return ((_a = n.x) !== null && _a !== void 0 ? _a : 0) + (n.w || 1); });
        column = Math.max.apply(Math, widths);
    }
    if (dir === -1)
        return nodes.sort(function (a, b) { var _a, _b, _c, _d; return ((_a = b.x) !== null && _a !== void 0 ? _a : 0) + ((_b = b.y) !== null && _b !== void 0 ? _b : 0) * column - (((_c = a.x) !== null && _c !== void 0 ? _c : 0) + ((_d = a.y) !== null && _d !== void 0 ? _d : 0) * column); });
    return nodes.sort(function (b, a) { var _a, _b, _c, _d; return ((_a = b.x) !== null && _a !== void 0 ? _a : 0) + ((_b = b.y) !== null && _b !== void 0 ? _b : 0) * column - (((_c = a.x) !== null && _c !== void 0 ? _c : 0) + ((_d = a.y) !== null && _d !== void 0 ? _d : 0) * column); });
}
function defaults(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop) && (target[prop] === null || target[prop] === undefined)) {
                target[prop] = source[prop];
            }
        }
    });
    return target;
}
function copyPos(a, b, doMinMax) {
    if (doMinMax === void 0) { doMinMax = false; }
    if (b.x !== undefined)
        a.x = b.x;
    if (b.y !== undefined)
        a.y = b.y;
    if (b.w !== undefined)
        a.w = b.w;
    if (b.h !== undefined)
        a.h = b.h;
    if (doMinMax) {
        if (b.minW)
            a.minW = b.minW;
        if (b.minH)
            a.minH = b.minH;
        if (b.maxW)
            a.maxW = b.maxW;
        if (b.maxH)
            a.maxH = b.maxH;
    }
    return a;
}
function samePos(a, b) {
    return a && b && a.x === b.x && a.y === b.y && (a.w || 1) === (b.w || 1) && (a.h || 1) === (b.h || 1);
}
function isCollisions(a, b) {
    if (a.id === b.id)
        return false;
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
}
function sanitizeMinMax(node) {
    if (!node.minW) {
        delete node.minW;
    }
    if (!node.minH) {
        delete node.minH;
    }
    if (!node.maxW) {
        delete node.maxW;
    }
    if (!node.maxH) {
        delete node.maxH;
    }
}

/**
 * 位置布局 Hook，用于 Widget 和 Placeholder 组件
 * @param layoutRef 需要设置 DOM 布局结构的元素
 * @param options 配置项
 */
function useWidget(options) {
    var widget = options.widget, layoutData = options.layoutData;
    var _a = React.useState(), widgetRect = _a[0], setWidgetRect = _a[1];
    var clampW = React.useMemo(function () {
        var _a, _b, _c, _d, _e;
        if (!widget || !layoutData)
            return 0;
        return clamp((_a = widget.w) !== null && _a !== void 0 ? _a : 1, (_c = (_b = widget.minW) !== null && _b !== void 0 ? _b : widget.w) !== null && _c !== void 0 ? _c : 1, (_e = (_d = widget.maxW) !== null && _d !== void 0 ? _d : widget.w) !== null && _e !== void 0 ? _e : layoutData.cols);
    }, [layoutData, widget]);
    var clampH = React.useMemo(function () {
        var _a, _b, _c, _d, _e;
        if (!widget)
            return 0;
        return clamp((_a = widget.h) !== null && _a !== void 0 ? _a : 1, (_c = (_b = widget.minH) !== null && _b !== void 0 ? _b : widget.h) !== null && _c !== void 0 ? _c : 1, (_e = (_d = widget.maxH) !== null && _d !== void 0 ? _d : widget.h) !== null && _e !== void 0 ? _e : Infinity);
    }, [widget]);
    React.useEffect(function () {
        var _a, _b;
        if (!widget || !layoutData)
            return;
        var rowHeight = layoutData.rowHeight, colWidth = layoutData.colWidth;
        setWidgetRect({
            left: ((_a = widget.x) !== null && _a !== void 0 ? _a : 0) * colWidth,
            top: ((_b = widget.y) !== null && _b !== void 0 ? _b : 0) * rowHeight,
            width: clampW * colWidth,
            height: clampH * rowHeight,
        });
    }, [clampH, clampW, widget, layoutData]);
    return widgetRect;
}

var Wrapper$2 = st.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  position: absolute;\n  box-sizing: border-box;\n  z-index: 0;\n  display: none;\n  transition: none;\n  border-style: solid;\n  border-color: transparent;\n  &.active {\n    display: block;\n    opacity: 1;\n    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;\n  }\n  > div {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n"], ["\n  position: absolute;\n  box-sizing: border-box;\n  z-index: 0;\n  display: none;\n  transition: none;\n  border-style: solid;\n  border-color: transparent;\n  &.active {\n    display: block;\n    opacity: 1;\n    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;\n  }\n  > div {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n"])));
var Placeholder = function (props) {
    var widget = props.widget, layoutData = props.layoutData, show = props.show, className = props.className;
    var widgetRef = React.useRef(null);
    var widgetRect = useWidget({
        widget: widget,
        layoutData: layoutData,
    });
    React.useEffect(function () {
        if (!widgetRect || !widgetRef.current || !layoutData)
            return;
        var left = widgetRect.left, top = widgetRect.top, width = widgetRect.width, height = widgetRect.height;
        var gap = layoutData.gap;
        widgetRef.current.style.width = "".concat(width, "px");
        widgetRef.current.style.height = "".concat(height, "px");
        widgetRef.current.style.top = "".concat(top, "px");
        widgetRef.current.style.left = "".concat(left, "px");
        widgetRef.current.style.borderLeftWidth = gap ? "".concat(gap[0] * 0.5, "px") : '0';
        widgetRef.current.style.borderRightWidth = gap ? "".concat(gap[0] * 0.5, "px") : '0';
        widgetRef.current.style.borderTopWidth = gap ? "".concat(gap[1] * 0.5, "px") : '0';
        widgetRef.current.style.borderBottomWidth = gap ? "".concat(gap[1] * 0.5, "px") : '0';
    }, [layoutData, widgetRect]);
    return (jsx(Wrapper$2, __assign({ ref: widgetRef, className: cls({ active: show }) }, { children: jsx("div", { className: className }) })));
};
var templateObject_1$2;

var GridLayoutEngine = /** @class */ (function () {
    /**
     * 创建引擎实例
     * @param nodes 布局节点数组
     * @param layoutData 布局容器数据
     * @param maxRow 最大行数
     * @param float 是否允许浮动，即任意位置，默认为 false
     */
    function GridLayoutEngine(nodes, column, float) {
        if (float === void 0) { float = false; }
        this.addedNodes = [];
        this.removedNodes = [];
        /** true = 批量更新, false = 单次更新 */
        this.batchMode = false;
        console.log('engine ~ Constructor');
        this.nodes = nodes;
        this.column = column;
        this._float = float;
    }
    GridLayoutEngine.gridNode2Widget = function (node) {
        return {
            id: node.id,
            x: node.x,
            y: node.y,
            w: node.w,
            h: node.h,
            minW: node.minW,
            minH: node.minH,
            maxW: node.maxW,
            maxH: node.maxH,
            static: node.static,
            noDrag: node.noDrag,
            noResize: node.noResize,
        };
    };
    GridLayoutEngine.widget2GridNode = function (widget) {
        return __assign({}, widget);
    };
    GridLayoutEngine.prototype.setLayoutData = function (layoutData) {
        this.layoutData = layoutData;
        return this;
    };
    Object.defineProperty(GridLayoutEngine.prototype, "float", {
        get: function () {
            return this._float || false;
        },
        /**
         * 浮动设置
         */
        set: function (val) {
            if (this._float === val)
                return;
            this._float = val || false;
            if (!val) {
                this._packNodes();
            }
        },
        enumerable: false,
        configurable: true
    });
    GridLayoutEngine.prototype.batchUpdate = function (flag, doPack) {
        if (flag === void 0) { flag = true; }
        if (doPack === void 0) { doPack = true; }
        if (!!this.batchMode === flag)
            return this;
        this.batchMode = flag;
        if (flag) {
            this._prevFloat = this._float;
            this._float = true; // let things go anywhere for now... will restore and possibly reposition later
            this.cleanNodes();
            this.saveInitial(); // since begin update (which is called multiple times) won't do this
        }
        else {
            this._float = !!this._prevFloat;
            delete this._prevFloat;
            if (doPack)
                this._packNodes();
        }
        return this;
    };
    /** 删除节点脏污染标识，以及最新一次尝试的位置信息 */
    GridLayoutEngine.prototype.cleanNodes = function () {
        if (this.batchMode)
            return this;
        this.nodes.forEach(function (n) {
            delete n._dirty;
            delete n._lastTried;
        });
        return this;
    };
    /**
     * 开始更新某个节点
     * @param node 正在操作的节点
     * @returns {GridLayoutEngine} this
     */
    GridLayoutEngine.prototype.beginUpdate = function (node) {
        if (!node._updating) {
            node._updating = true;
            delete node._skipDown;
            if (!this.batchMode)
                this.saveInitial();
        }
        return this;
    };
    /**
     * 结束本次更新
     * @returns {GridLayoutEngine} this
     */
    GridLayoutEngine.prototype.endUpdate = function () {
        var n = this.nodes.find(function (n) { return n._updating; });
        if (n) {
            delete n._updating;
            delete n._skipDown;
        }
        return this;
    };
    /**
     * 保存布局块在操作之前的位置和大小
     */
    GridLayoutEngine.prototype.saveInitial = function () {
        this.nodes.forEach(function (n) {
            n._orig = copyPos({}, n);
            delete n._dirty;
        });
        console.log('engine ~ saveInitial', JSON.parse(JSON.stringify(this.nodes)));
        this._hasLocked = this.nodes.some(function (n) { return n.static; });
        return this;
    };
    /** @internal restore all the nodes back to initial values (called when we leave) */
    GridLayoutEngine.prototype.restoreInitial = function () {
        var _this = this;
        this.nodes.forEach(function (n) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            if (samePos(n, {
                x: (_b = (_a = n._orig) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : n.x,
                y: (_d = (_c = n._orig) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : n.y,
                w: ((_e = n._orig) === null || _e === void 0 ? void 0 : _e.w) || n.w,
                h: ((_f = n._orig) === null || _f === void 0 ? void 0 : _f.h) || n.h,
            })) {
                return _this;
            }
            copyPos(n, {
                x: (_h = (_g = n._orig) === null || _g === void 0 ? void 0 : _g.x) !== null && _h !== void 0 ? _h : n.x,
                y: (_k = (_j = n._orig) === null || _j === void 0 ? void 0 : _j.y) !== null && _k !== void 0 ? _k : n.y,
                w: ((_l = n._orig) === null || _l === void 0 ? void 0 : _l.w) || n.w,
                h: ((_m = n._orig) === null || _m === void 0 ? void 0 : _m.h) || n.h,
            });
            n._dirty = true;
        });
        return this;
    };
    /**
     * 获取布局引擎操作后的布局块数组
     * @returns {IWidget[]}
     */
    GridLayoutEngine.prototype.getWidgets = function () {
        this.sortNodes();
        return this.nodes.map(function (n) { return GridLayoutEngine.gridNode2Widget(n); });
    };
    /**
     * 重新布局
     * @param layout 布局方式
     * @param doSort 是否排序
     * @returns
     */
    GridLayoutEngine.prototype.compact = function (layout, doSort) {
        var _this = this;
        if (layout === void 0) { layout = 'compact'; }
        if (doSort === void 0) { doSort = true; }
        if (this.nodes.length === 0)
            return this;
        if (doSort)
            this.sortNodes();
        var wasBatch = this.batchMode;
        if (!wasBatch)
            this.batchUpdate();
        var wasColumnResize = this._inColumnResize;
        if (!wasColumnResize)
            this._inColumnResize = true; // faster addNode()
        var copyNodes = this.nodes;
        this.nodes = []; // pretend we have no nodes to conflict layout to start with...
        copyNodes.forEach(function (n, index, list) {
            var after;
            if (!n.static) {
                n.autoPosition = true;
                if (layout === 'list' && index)
                    after = list[index - 1];
            }
            _this.addNode(n, false, after); // 'false' for add event trigger
        });
        if (!wasColumnResize)
            delete this._inColumnResize;
        if (!wasBatch)
            this.batchUpdate(false);
        return this;
    };
    /** call to add the given node to our list, fixing collision and re-packing */
    GridLayoutEngine.prototype.addNode = function (node, triggerAddEvent, after) {
        if (triggerAddEvent === void 0) { triggerAddEvent = false; }
        var dup = this.nodes.find(function (n) { return n.id === node.id; });
        if (dup)
            return dup; // prevent inserting twice! return it instead.
        // skip prepareNode if we're in middle of column resize (not new) but do check for bounds!
        this._inColumnResize ? this.nodeBoundFix(node) : this.prepareNode(node);
        var skipCollision = false;
        if (node.autoPosition && this.findEmptyPosition(node, this.nodes, this.column, after)) {
            delete node.autoPosition; // found our slot
            skipCollision = true;
        }
        this.nodes.push(node);
        if (triggerAddEvent) {
            this.addedNodes.push(node);
        }
        if (!skipCollision)
            this._fixCollisions(node);
        if (!this.batchMode) {
            this._packNodes();
        }
        return node;
    };
    /** part2 of preparing a node to fit inside our grid - checks for x,y,w from grid dimensions */
    GridLayoutEngine.prototype.nodeBoundFix = function (node, resizing) {
        var before = node._orig || copyPos({}, node);
        if (node.maxW) {
            node.w = Math.min(node.w, node.maxW);
        }
        if (node.maxH) {
            node.h = Math.min(node.h, node.maxH);
        }
        if (node.minW && node.minW <= this.column) {
            node.w = Math.max(node.w, node.minW);
        }
        if (node.minH) {
            node.h = Math.max(node.h, node.minH);
        }
        if (node.w > this.column) {
            node.w = this.column;
        }
        else if (node.w < 1) {
            node.w = 1;
        }
        if (node.h < 1) {
            node.h = 1;
        }
        if (node.x < 0) {
            node.x = 0;
        }
        if (node.y < 0) {
            node.y = 0;
        }
        if (node.x + node.w > this.column) {
            if (resizing) {
                node.w = this.column - node.x;
            }
            else {
                node.x = this.column - node.w;
            }
        }
        if (!samePos(node, before)) {
            node._dirty = true;
        }
        return this;
    };
    /**
     * given a random node, makes sure it's coordinates/values are valid in the current grid
     * @param node to adjust
     * @param resizing if out of bound, resize down or move into the grid to fit ?
     */
    GridLayoutEngine.prototype.prepareNode = function (node, resizing) {
        var _a;
        node.id = (_a = node.id) !== null && _a !== void 0 ? _a : "rdl-".concat(GridLayoutEngine._idSeq++);
        // if we're missing position, have the grid position us automatically (before we set them to 0,0)
        if (node.x === undefined || node.y === undefined || node.x === null || node.y === null) {
            node.autoPosition = true;
        }
        // assign defaults for missing required fields
        var defaults$1 = { x: 0, y: 0, w: 1, h: 1 };
        defaults(node, defaults$1);
        if (!node.autoPosition) {
            delete node.autoPosition;
        }
        if (!node.noResize) {
            delete node.noResize;
        }
        if (!node.noDrag) {
            delete node.noDrag;
        }
        sanitizeMinMax(node);
        // check for NaN (in case messed up strings were passed. can't do parseInt() || defaults.x above as 0 is valid #)
        if (typeof node.x == 'string') {
            node.x = Number(node.x);
        }
        if (typeof node.y == 'string') {
            node.y = Number(node.y);
        }
        if (typeof node.w == 'string') {
            node.w = Number(node.w);
        }
        if (typeof node.h == 'string') {
            node.h = Number(node.h);
        }
        if (Number.isNaN(node.x)) {
            node.x = defaults$1.x;
            node.autoPosition = true;
        }
        if (Number.isNaN(node.y)) {
            node.y = defaults$1.y;
            node.autoPosition = true;
        }
        if (Number.isNaN(node.w)) {
            node.w = defaults$1.w;
        }
        if (Number.isNaN(node.h)) {
            node.h = defaults$1.h;
        }
        this.nodeBoundFix(node, resizing);
        return node;
    };
    /** find the first available empty spot for the given node width/height, updating the x,y attributes. return true if found.
     * optionally you can pass your own existing node list and column count, otherwise defaults to that engine data.
     * Optionally pass a widget to start search AFTER, meaning the order will remain the same but possibly have empty slots we skipped
     */
    GridLayoutEngine.prototype.findEmptyPosition = function (node, nodeList, column, after) {
        if (nodeList === void 0) { nodeList = this.nodes; }
        if (column === void 0) { column = this.column; }
        var start = after ? after.y * column + (after.x + after.w) : 0;
        var found = false;
        var _loop_1 = function (i) {
            var x = i % column;
            var y = Math.floor(i / column);
            if (x + node.w > column) {
                return "continue";
            }
            var box = { x: x, y: y, w: node.w, h: node.h };
            if (!nodeList.find(function (n) { return isCollisions(box, n); })) {
                if (node.x !== x || node.y !== y)
                    node._dirty = true;
                node.x = x;
                node.y = y;
                delete node.autoPosition;
                found = true;
            }
        };
        for (var i = start; !found; ++i) {
            _loop_1(i);
        }
        return found;
    };
    /**
     * 检查是否可以移动，并做移动相关的处理
     * @param node 待移动布局块
     * @param o 移动选项信息
     * @returns {boolean}
     */
    GridLayoutEngine.prototype.moveNodeCheck = function (node, o) {
        if (node.static)
            return false;
        if (!this.changedPosConstrain(node, {
            x: o.x,
            y: o.y,
            w: o.w,
            h: o.h,
        })) {
            return false;
        }
        o.pack = true;
        return this.moveNode(node, o);
    };
    /**
     * 移动节点，如果确实移动了，返回 true
     * @param node 待移动的布局节点
     * @param o 移动项数据
     * @returns {boolean}
     */
    GridLayoutEngine.prototype.moveNode = function (node, o) {
        if (!node || !o)
            return false;
        console.log('engine ~ moveNode', node);
        var wasUndefinedPack = false;
        if (o.pack === undefined && !this.batchMode) {
            wasUndefinedPack = o.pack = true;
        }
        // 是否是改变大小
        var resizing = node.w !== o.w || node.h !== o.h;
        var nn = copyPos({}, node, true);
        copyPos(nn, o);
        this.nodeBoundFix(nn, resizing);
        copyPos(o, nn);
        if (!o.forceCollide && samePos(node, o)) {
            return false;
        }
        var prevPos = copyPos({}, node);
        // 检查我们是否需要在新位置修复碰撞
        var collides = this.collideAll(node, nn, o.skip);
        var needToMove = true;
        if (collides.length) {
            var activeDrag = node._moving && !o.nested;
            // 检查以确保我们在拖动时实际碰撞了 50%的面积
            var collide = activeDrag ? this.directionCollideCoverage(node, o, collides) : collides[0];
            // debugger;
            if (collide) {
                needToMove = !this._fixCollisions(node, nn, collide, o); // check if already moved...
            }
            else {
                needToMove = false; // we didn't cover >50% for a move, skip...
                if (wasUndefinedPack)
                    delete o.pack;
            }
        }
        // 对于需要移动的进行标记，在 packNodes 内处理
        if (needToMove) {
            node._dirty = true;
            copyPos(node, nn);
        }
        if (o.pack) {
            this._packNodes();
        }
        // pack 的时候可能会把节点位置调回去了，所以这里校验下
        return !samePos(node, prevPos);
    };
    /**
     * 从 nodes 拿到与指定区域重叠并忽略 skip，skip2 的布局块
     * @param skip 忽略的块
     * @param area 检测碰撞区域
     * @param skip2 忽略的其他块
     * @returns {IGridNode | undefined}
     */
    GridLayoutEngine.prototype.collide = function (skip, area, skip2) {
        if (area === void 0) { area = skip; }
        var skipId = skip.id;
        var skip2Id = skip2 === null || skip2 === void 0 ? void 0 : skip2.id;
        return this.nodes.find(function (n) { return n.id !== skipId && n.id !== skip2Id && isCollisions(n, area); });
    };
    /**
     * 从 nodes 拿到与指定区域碰撞并忽略 skip, skip2 的布局块数组
     * @param skip 忽略的块
     * @param area 检测碰撞区域
     * @param skip2 忽略的其他块
     * @returns {IGridNode[]}
     * @example
     * ```typescript
     *  this.collideAll(node, nn, o.skip); // 忽略 node 与 o.skip 块，找出所有与 nn 碰撞的节点，返回节点数组
     * ```
     */
    GridLayoutEngine.prototype.collideAll = function (skip, area, skip2) {
        if (area === void 0) { area = skip; }
        var skipId = skip.id;
        var skip2Id = skip2 === null || skip2 === void 0 ? void 0 : skip2.id;
        return this.nodes.filter(function (n) { return n.id !== skipId && n.id !== skip2Id && isCollisions(n, area); });
    };
    /** true if x,y or w,h are different after clamping to min/max */
    GridLayoutEngine.prototype.changedPosConstrain = function (node, p) {
        if (node.x !== p.x || node.y !== p.y)
            return true;
        return node.w !== p.w || node.h !== p.h;
    };
    /**
     * 置换，成功返回 true
     * 当两个块大小相同，或同一列开始，考虑直接置换位置
     */
    GridLayoutEngine.prototype.swap = function (a, b) {
        console.log('engine swap', a, b);
        if (!b || b.static || !a || a.static)
            return false;
        function _doSwap() {
            console.log('engine ~ doSwap');
            // assumes a is before b IFF they have different height (put after rather than exact swap)
            var x = b.x, y = b.y;
            b.x = a.x;
            b.y = a.y; // b -> a position
            if (a.h !== b.h) {
                a.x = x;
                a.y = b.y + b.h; // a -> goes after b
            }
            else if (a.w !== b.w) {
                a.x = b.x + b.w;
                a.y = y; // a -> goes after b
            }
            else {
                a.x = x;
                a.y = y; // a -> old b position
            }
            a._dirty = b._dirty = true;
            return true;
        }
        // same size and same row or column, and touching
        if (a.w === b.w && a.h === b.h && (a.x === b.x || a.y === b.y))
            return _doSwap();
        // check for taking same columns (but different height) and touching
        if (a.w === b.w && a.x === b.x) {
            if (b.y < a.y) {
                var t = a;
                a = b;
                b = t;
            } // swap a <-> b vars so a is first
            return _doSwap();
        }
        // check if taking same row (but different width) and touching
        if (a.h === b.h && a.y === b.y) {
            if (b.x < a.x) {
                var t = a;
                a = b;
                b = t;
            } // swap a <-> b vars so a is first
            return _doSwap();
        }
        return false;
    };
    /** sort the nodes array from first to last, or reverse. Called during collision/placement to force an order */
    GridLayoutEngine.prototype.sortNodes = function (dir, column) {
        if (dir === void 0) { dir = 1; }
        if (column === void 0) { column = this.column; }
        this.nodes = sort(this.nodes, dir, column);
        return this;
    };
    GridLayoutEngine.prototype.getRow = function () {
        return this.nodes.reduce(function (row, n) { return Math.max(row, n.y + n.h); }, 0);
    };
    /** called to cache the nodes pixel rectangles used for collision detection during drag */
    GridLayoutEngine.prototype.cacheRects = function () {
        var _a;
        if (!this.layoutData)
            return this;
        var colWidth = (_a = this.layoutData, _a.colWidth), rowHeight = _a.rowHeight;
        this.nodes.forEach(function (n) {
            return (n._rect = {
                top: n.y * rowHeight,
                left: n.x * colWidth,
                width: n.w * colWidth,
                height: n.h * rowHeight,
            });
        });
        return this;
    };
    /** 根据起始位置进行像素覆盖率碰撞，返回覆盖率大于中线 50% 的节点 */
    GridLayoutEngine.prototype.directionCollideCoverage = function (node, o, collides) {
        if (!o.rect || !node._rect)
            return;
        var r0 = node._rect; // 开始位置
        var r = __assign({}, o.rect); // 需校验节点的位置
        // update dragged rect to show where it's coming from (above or below, etc...)
        if (r.top > r0.top) {
            r.height += r.top - r0.top;
            r.top = r0.top;
        }
        else {
            r.height += r0.top - r.top;
        }
        if (r.left > r0.left) {
            r.width += r.left - r0.left;
            r.left = r0.left;
        }
        else {
            r.width += r0.left - r.left;
        }
        var collide;
        var overMax = 0.5; // need >50%
        collides.forEach(function (n) {
            if (n.static || !n._rect)
                return;
            var r2 = n._rect; // overlapping target
            var yOver = Number.MAX_VALUE, xOver = Number.MAX_VALUE;
            // depending on which side we started from, compute the overlap % of coverage
            // (ex: from above/below we only compute the max horizontal line coverage)
            if (r0.top < r2.top) {
                // from above
                yOver = (r.top + r.height - r2.top) / r2.height;
            }
            else if (r0.top + r0.height > r2.top + r2.height) {
                // from below
                yOver = (r2.top + r2.height - r.top) / r2.height;
            }
            if (r0.left < r2.left) {
                // from the left
                xOver = (r.left + r.width - r2.left) / r2.width;
            }
            else if (r0.left + r0.width > r2.left + r2.width) {
                // from the right
                xOver = (r2.left + r2.width - r.left) / r2.width;
            }
            var over = Math.min(xOver, yOver);
            if (over > overMax) {
                overMax = over;
                collide = n;
            }
        });
        o.collide = collide; // save it so we don't have to find it again
        return collide;
    };
    /** @internal fix collision on given 'node', going to given new location 'nn', with optional 'collide' node already found.
     * return true if we moved. */
    GridLayoutEngine.prototype._fixCollisions = function (node, nn, collide, opt) {
        if (nn === void 0) { nn = node; }
        if (opt === void 0) { opt = {}; }
        this.sortNodes(-1); // from last to first, so recursive collision move items in the right order
        collide = collide || this.collide(node, nn); // REAL area collide for swap and skip if none...
        // debugger;
        if (!collide)
            return false;
        // swap check: if we're actively moving in gravity mode, see if we collide with an object the same size
        if (node._moving && !opt.nested && !this.float) {
            console.log('engine ~ fixCollisions swap if');
            if (this.swap(node, collide))
                return true;
        }
        // during while() collisions MAKE SURE to check entire row so larger items don't leap frog small ones (push them all down starting last in grid)
        var area = nn;
        if (this._useEntireRowArea(node, nn)) {
            area = { x: 0, w: this.column, y: nn.y, h: nn.h };
            collide = this.collide(node, area, opt.skip); // force new hit
        }
        var didMove = false;
        var newOpt = {
            nested: true,
            pack: false,
        };
        while ((collide = collide || this.collide(node, area, opt.skip))) {
            // could collide with more than 1 item... so repeat for each
            var moved = void 0;
            // if colliding with a locked item OR moving down with top gravity (and collide could move up) -> skip past the collide,
            // but remember that skip down so we only do this once (and push others otherwise).
            if (collide.static ||
                (node._moving &&
                    !node._skipDown &&
                    nn.y > node.y &&
                    !this.float &&
                    // can take space we had, or before where we're going
                    (!this.collide(collide, __assign(__assign({}, collide), { y: node.y }), node) ||
                        !this.collide(collide, __assign(__assign({}, collide), { y: nn.y - collide.h }), node)))) {
                node._skipDown = node._skipDown || nn.y > node.y;
                moved = this.moveNode(node, __assign(__assign(__assign({}, nn), newOpt), { y: collide.y + collide.h }));
                if (collide.static && moved) {
                    copyPos(nn, node); // moving after lock become our new desired location
                }
                else if (!collide.static && moved && opt.pack) {
                    // we moved after and will pack: do it now and keep the original drop location, but past the old collide to see what else we might push way
                    this._packNodes();
                    nn.y = collide.y + collide.h;
                    copyPos(node, nn);
                }
                didMove = didMove || moved;
            }
            else {
                // move collide down *after* where we will be, ignoring where we are now (don't collide with us)
                moved = this.moveNode(collide, __assign(__assign(__assign({}, collide), newOpt), { y: nn.y + nn.h, skip: node }));
            }
            if (!moved) {
                return didMove;
            } // break inf loop if we couldn't move after all (ex: maxRow, fixed)
            collide = undefined;
        }
        return didMove;
    };
    /** @internal called to top gravity pack the items back OR revert back to original Y positions when floating */
    GridLayoutEngine.prototype._packNodes = function () {
        var _this = this;
        if (this.batchMode) {
            return this;
        }
        this.sortNodes(); // first to last
        if (this.float) {
            // restore original Y pos
            this.nodes.forEach(function (n) {
                if (n._updating || n._orig === undefined || n.y === n._orig.y)
                    return;
                var newY = n.y;
                while (newY > n._orig.y) {
                    --newY;
                    var collide = _this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
                    if (!collide) {
                        n._dirty = true;
                        n.y = newY;
                    }
                }
            });
        }
        else {
            // top gravity pack
            this.nodes.forEach(function (n, i) {
                if (n.static)
                    return;
                while (n.y > 0) {
                    var newY = i === 0 ? 0 : n.y - 1;
                    var canBeMoved = i === 0 || !_this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
                    if (!canBeMoved)
                        break;
                    // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
                    // and move items back. The user 'change' CB should detect changes from the original
                    // starting position instead.
                    n._dirty = n.y !== newY;
                    n.y = newY;
                }
            });
        }
        return this;
    };
    // use entire row for hitting area (will use bottom reverse sorted first) if we not actively moving DOWN and didn't already skip
    GridLayoutEngine.prototype._useEntireRowArea = function (node, nn) {
        return ((!this.float || (this.batchMode && !this._prevFloat)) &&
            !this._hasLocked &&
            (!node._moving || node._skipDown || nn.y <= node.y));
    };
    GridLayoutEngine._idSeq = 0;
    return GridLayoutEngine;
}());

// import * as Utils from '../utils';
var Wrapper$1 = st.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var Layout = function (props) {
    var col = props.col, propsRowHieght = props.rowHeight, gap = props.gap, widgets = props.widgets, children = props.children, draggableHandle = props.draggableHandle, resizeableHandle = props.resizeableHandle, float = props.float, initCompact = props.initCompact, onSizeChange = props.onSizeChange, placeholderClassName = props.placeholderClassName, ret = __rest(props, ["col", "rowHeight", "gap", "widgets", "children", "draggableHandle", "resizeableHandle", "float", "initCompact", "onSizeChange", "placeholderClassName"]);
    var layoutRef = React.useRef(null);
    var _a = React.useState(widgets), layoutWidgets = _a[0], setLayoutWidgets = _a[1];
    var _b = React.useState(), layoutData = _b[0], setLayoutData = _b[1];
    React.useEffect(function () {
        setLayoutWidgets(widgets);
    }, [widgets]);
    var size = useSize(layoutRef);
    React.useEffect(function () {
        if (size && onSizeChange) {
            onSizeChange(size);
        }
    }, [onSizeChange, size]);
    var colWidth = React.useMemo(function () {
        if (!size || !layoutRef.current)
            return 0;
        return size.width / col;
    }, [col, size]);
    var rowHeight = React.useMemo(function () {
        if (!propsRowHieght)
            return colWidth;
        if (typeof propsRowHieght === 'number')
            return gap ? propsRowHieght * colWidth + gap[1] : propsRowHieght * colWidth;
        if (typeof propsRowHieght === 'string') {
            var height = parseFloat(propsRowHieght);
            return gap ? height + gap[1] : height;
        }
        return 0;
    }, [colWidth, gap, propsRowHieght]);
    // 布局更新与 Placeholder
    var engineRef = React.useRef(null);
    var _c = React.useState(), activeWidgetId = _c[0], setActiveWidgetId = _c[1];
    var _d = React.useState(), activeWidget = _d[0], setActiveWidget = _d[1];
    // 根据 widgets 组件数组，实例化布局引擎
    React.useEffect(function () {
        if (widgets && (layoutData === null || layoutData === void 0 ? void 0 : layoutData.cols)) {
            engineRef.current = new GridLayoutEngine(widgets.map(function (w) { return GridLayoutEngine.widget2GridNode(w); }), layoutData.cols, float);
            if (initCompact) {
                engineRef.current.compact('compact', false);
                setLayoutWidgets(engineRef.current.getWidgets());
            }
        }
        return function () {
            engineRef.current = null;
        };
        // 只有当 cols 数目和 widgets 数组改变时，才重新实例化布局引擎
    }, [float, layoutData === null || layoutData === void 0 ? void 0 : layoutData.cols, widgets, initCompact]);
    React.useEffect(function () {
        if (engineRef.current && layoutData) {
            engineRef.current.setLayoutData(layoutData);
        }
    }, [layoutData]);
    var handleActionStart = React.useCallback(function (widget, eventType) {
        setActiveWidgetId(widget.id);
        setActiveWidget(widget);
        var engine = engineRef.current;
        if (!engine)
            return;
        console.log('start', engine.nodes);
        var node = engine.nodes.find(function (n) { return n.id === widget.id; });
        if (node) {
            engine.cleanNodes().beginUpdate(node);
            node._moving = eventType === 'drag';
            delete node._lastTried;
            engine.cacheRects();
        }
    }, []);
    var handleActionDoing = React.useCallback(function (widget, newBoxPos, eventType) {
        if (!engineRef.current)
            return;
        var tempLayoutWidgets = layoutWidgets.slice(0);
        var curWidget = tempLayoutWidgets.find(function (w) { return w.id === widget.id; });
        setActiveWidget(curWidget);
        var engine = engineRef.current;
        if (!engine)
            return;
        var node = engine.nodes.find(function (n) { return n.id === widget.id; });
        if (!node || !node._orig)
            return; // 在 engine 的  saveInitial 中已经存入 _orig，也就是在 handleActionStart 已执行完
        var p = __assign({}, node._orig);
        var resizing = false;
        // TODO: 滚动到边界跟随
        // const rect = widgetEl.getBoundingClientRect();
        // let distance = 0;
        // if (node._prevYPix) {
        //   distance = rect.top - node._prevYPix;
        // }
        // node._prevYPix = rect.top;
        if (eventType === 'drag') {
            p.x = Math.round(newBoxPos.left / colWidth);
            p.y = Math.round(newBoxPos.top / rowHeight);
            // Utils.updateScrollPosition(widgetEl, rect, newBoxPos, distance);
            if (node.x === p.x && node.y === p.y)
                return;
        }
        else if (eventType === 'resize') {
            p.w = Math.round(newBoxPos.width / colWidth);
            p.h = Math.round(newBoxPos.height / rowHeight);
            // Utils.updateScrollResize(e, widgetEl, distance);
            if (node.w === p.w && node.h === p.h)
                return;
            if (node._lastTried && node._lastTried.w === p.w && node._lastTried.h === p.h)
                return;
            resizing = true;
        }
        node._lastTried = p;
        if (engine.moveNodeCheck(node, __assign(__assign({}, p), { rect: __assign({}, newBoxPos), resizing: resizing }))) {
            engine.cacheRects();
            delete node._skipDown;
        }
        setLayoutWidgets(engine.getWidgets());
    }, [colWidth, layoutWidgets, rowHeight]);
    var handleActionEnd = React.useCallback(function (widget) {
        console.log('engine = layout handleActionEnd');
        if (widget.id !== activeWidgetId)
            return;
        setActiveWidgetId('');
        setActiveWidget(undefined);
        var engine = engineRef.current;
        if (!engine)
            return;
        var node = engine.nodes.find(function (n) { return n.id === widget.id; });
        if (node) {
            delete node._moving;
            delete node._lastTried;
        }
        engine.endUpdate();
        setLayoutWidgets(engine.getWidgets());
    }, [activeWidgetId]);
    /**
     * 设置 margin
     */
    React.useEffect(function () {
        if (!gap)
            return;
        if (gap[0] <= 0 || gap[1] <= 0)
            return;
        var container = layoutRef.current;
        if (!container)
            return;
        var xMargin = gap[0] * 0.5;
        var yMargin = gap[1] * 0.5;
        container.style.marginLeft = "".concat(-xMargin, "px");
        container.style.marginRight = "".concat(-xMargin, "px");
        container.style.marginTop = "".concat(-yMargin, "px");
        container.style.marginBottom = "".concat(-yMargin, "px");
    }, [gap]);
    /**
     * 根据 props 和布局框架 size 变动，更新子节点
     */
    var _e = React.useState([]), clonedChildren = _e[0], setClonedChildren = _e[1];
    React.useEffect(function () {
        var tempList = [];
        var rowCount = 0;
        React.Children.toArray(children).forEach(function (child) {
            var curChild = child;
            var id = curChild.props.id;
            var widgetConfig = layoutWidgets.find(function (w) { return w.id === id; });
            if (!widgetConfig)
                return;
            var bottom = widgetConfig.h + widgetConfig.y;
            rowCount = Math.max(rowCount, bottom);
            tempList.push({
                id: id,
                widget: widgetConfig,
                child: curChild,
            });
        });
        var _layoutData = {
            rows: rowCount,
            cols: col,
            width: colWidth * col,
            height: rowHeight * rowCount,
            rowHeight: rowHeight,
            colWidth: colWidth,
            gap: gap,
        };
        setLayoutData(_layoutData);
        var realChildren = tempList.map(function (item) {
            return React.cloneElement(item.child, {
                id: item.id,
                widget: item.widget,
                draggableHandle: item.child.props.draggableHandle || draggableHandle,
                resizeableHandle: item.child.props.resizeableHandle || resizeableHandle,
                layoutData: _layoutData,
                onActionStart: handleActionStart,
                onActionDoing: handleActionDoing,
                onActionEnd: handleActionEnd,
            });
        });
        setClonedChildren(realChildren);
        if (layoutRef.current) {
            layoutRef.current.style.height = "".concat(rowCount * rowHeight, "px");
        }
    }, [
        children,
        col,
        colWidth,
        draggableHandle,
        gap,
        handleActionDoing,
        handleActionEnd,
        handleActionStart,
        layoutWidgets,
        resizeableHandle,
        rowHeight,
        widgets,
    ]);
    return (jsxs(Wrapper$1, __assign({}, ret, { ref: layoutRef }, { children: [clonedChildren, jsx(Placeholder, { className: placeholderClassName, show: !!activeWidgetId, widget: activeWidget, layoutData: layoutData })] })));
};
var templateObject_1$1;

var Wrapper = st.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  box-sizing: border-box;\n  transition: none;\n  border-color: transparent;\n  border-style: solid;\n  /* transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s; */\n  &.dragging,\n  &.dragending,\n  &.resizing,\n  &.resizeending {\n    position: fixed;\n    z-index: 999;\n    pointer-events: none;\n    > div {\n      box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.2);\n      opacity: 0.8;\n    }\n  }\n  &.dragging {\n    will-change: left, top;\n  }\n  &.resizing {\n    will-change: width, height;\n  }\n  &.dragending {\n    will-change: left, top;\n    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;\n  }\n  &.resizeending {\n    will-change: width, height;\n    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;\n  }\n\n  > div {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  > .default_resize {\n    position: absolute;\n    width: 18px;\n    height: 18px;\n    bottom: 8px;\n    right: 8px;\n    opacity: 0;\n    transition: opacity 0.3s ease-in-out;\n    color: rgba(0, 0, 0, 0.3);\n    cursor: nwse-resize;\n  }\n  &:hover {\n    > .default_resize {\n      opacity: 1;\n    }\n  }\n"], ["\n  position: absolute;\n  box-sizing: border-box;\n  transition: none;\n  border-color: transparent;\n  border-style: solid;\n  /* transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s; */\n  &.dragging,\n  &.dragending,\n  &.resizing,\n  &.resizeending {\n    position: fixed;\n    z-index: 999;\n    pointer-events: none;\n    > div {\n      box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.2);\n      opacity: 0.8;\n    }\n  }\n  &.dragging {\n    will-change: left, top;\n  }\n  &.resizing {\n    will-change: width, height;\n  }\n  &.dragending {\n    will-change: left, top;\n    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;\n  }\n  &.resizeending {\n    will-change: width, height;\n    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;\n  }\n\n  > div {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  > .default_resize {\n    position: absolute;\n    width: 18px;\n    height: 18px;\n    bottom: 8px;\n    right: 8px;\n    opacity: 0;\n    transition: opacity 0.3s ease-in-out;\n    color: rgba(0, 0, 0, 0.3);\n    cursor: nwse-resize;\n  }\n  &:hover {\n    > .default_resize {\n      opacity: 1;\n    }\n  }\n"])));
var ResizeArrow = React.forwardRef(function (props, ref) { return (jsx("svg", __assign({}, props, { ref: ref, xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24" }, { children: jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 20h4v-4m-6-2l6 6M8 4H4v4m0-4l6 6" }) }))); });
var Widget = function (props) {
    var id = props.id, children = props.children, className = props.className, widget = props.widget, layoutData = props.layoutData, draggableHandle = props.draggableHandle, resizeableHandle = props.resizeableHandle, onActionStart = props.onActionStart, onActionDoing = props.onActionDoing, onActionEnd = props.onActionEnd;
    var widgetRef = React.useRef(null);
    var mouseDownEventRef = React.useRef(null);
    var actionOffsetRef = React.useRef(null);
    // const calcBoxPosition = React.useCallback<() => IBoxPosition | undefined>(() => {
    //   if (!widgetRef.current || !actionOffsetRef.current || !layoutData || !widget) return;
    //   const { layoutLeft, layoutTop } = actionOffsetRef.current;
    //   const { left, top, width, height } = widgetRef.current.getBoundingClientRect();
    //   return {
    //     left: left - layoutLeft,
    //     top: top - layoutTop,
    //     width,
    //     height,
    //   };
    // }, [layoutData, widget]);
    var actionStartRef = React.useRef();
    var handleActionStart = React.useCallback(function (type) {
        if (!widget)
            return;
        onActionStart === null || onActionStart === void 0 ? void 0 : onActionStart(widget, type);
    }, [onActionStart, widget]);
    React.useEffect(function () {
        actionStartRef.current = handleActionStart;
    }, [handleActionStart]);
    var actionDoingRef = React.useRef();
    var handleActionDoing = React.useCallback(function (type, e) {
        if (!widget || !actionOffsetRef.current || !widgetRef.current)
            return;
        var _a = actionOffsetRef.current, layoutLeft = _a.layoutLeft, layoutTop = _a.layoutTop;
        var widgetRect = widgetRef.current.getBoundingClientRect();
        var boxPos = {
            left: widgetRect.left - layoutLeft,
            top: widgetRect.top - layoutTop,
            width: widgetRect.width,
            height: widgetRect.height,
        };
        onActionDoing === null || onActionDoing === void 0 ? void 0 : onActionDoing(widget, boxPos, type, widgetRef.current, e);
    }, [onActionDoing, widget]);
    React.useEffect(function () {
        // console.log('handleActionDoing');
        actionDoingRef.current = handleActionDoing;
    }, [handleActionDoing]);
    var actionEndRef = React.useRef();
    var handleActionEnd = React.useCallback(function (type) {
        if (!widget)
            return;
        onActionEnd === null || onActionEnd === void 0 ? void 0 : onActionEnd(widget, type);
    }, [onActionEnd, widget]);
    React.useEffect(function () {
        // console.log('handleActionEnd');
        actionEndRef.current = handleActionEnd;
    }, [handleActionEnd]);
    // ========================
    // ===== Draggable ========
    // ========================
    var dragElRef = React.useRef(null);
    var _a = React.useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = React.useState(false), isDragEnding = _b[0], setIsDragEnding = _b[1];
    var dragFollow = React.useCallback(function (e) {
        if (!actionOffsetRef.current || !widgetRef.current)
            return;
        var _a = actionOffsetRef.current, offsetLeft = _a.offsetLeft, offsetTop = _a.offsetTop;
        widgetRef.current.style.left = "".concat(e.clientX + offsetLeft, "px");
        widgetRef.current.style.top = "".concat(e.clientY + offsetTop, "px");
        widgetRef.current.style.transition = 'none';
    }, []);
    // 鼠标移动
    var dragMouseMove = React.useCallback(function (e) {
        var _a, _b;
        // console.log('dragMouseMove', mouseDownEventRef.current);
        var s = mouseDownEventRef.current;
        if (Manager.isDragging) {
            console.log('dragging');
            dragFollow(e);
            (_a = actionDoingRef.current) === null || _a === void 0 ? void 0 : _a.call(actionDoingRef, 'drag', e);
        }
        else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 3) {
            console.log('dragging start');
            Manager.isDragging = true;
            Manager.dragWidgetId = id;
            if (widgetRef.current) {
                actionOffsetRef.current = getActionOffset(e, widgetRef.current, widgetRef.current.parentElement);
            }
            widgetRef.current.style.transition = 'none';
            widgetRef.current.style.position = 'fixed';
            dragFollow(e);
            setIsDragging(true);
            (_b = actionStartRef.current) === null || _b === void 0 ? void 0 : _b.call(actionStartRef, 'drag');
        }
    }, [dragFollow, id]);
    // 鼠标抬起
    var dragMouseUp = React.useCallback(function (e) {
        var _a;
        console.log('dragMouseUp');
        document.removeEventListener('mousemove', dragMouseMove);
        document.removeEventListener('mouseup', dragMouseUp);
        if (Manager.isDragging) {
            console.log('dragging end');
            Manager.isDragging = false;
            document.body.style.cursor = 'auto';
            setIsDragging(false);
            setIsDragEnding(true);
            widgetRef.current.style.transition = '';
            widgetRef.current.style.position = '';
            widgetRef.current.style.opacity = '1';
            (_a = actionEndRef.current) === null || _a === void 0 ? void 0 : _a.call(actionEndRef, 'drag');
            setTimeout(function () {
                setIsDragEnding(false);
            }, 330);
        }
        mouseDownEventRef.current = null;
        Manager.dragWidgetId = '';
        Manager.mouseHandled = false;
        e.preventDefault();
    }, [dragMouseMove]);
    // 鼠标按下
    var dragMouseDown = React.useCallback(function (e) {
        console.log('dragMouseDown');
        if (Manager.mouseHandled)
            return;
        if (e.button !== 0)
            return;
        if (e.target.closest(MouseDownIgnore))
            return;
        mouseDownEventRef.current = e;
        document.addEventListener('mousemove', dragMouseMove);
        document.addEventListener('mouseup', dragMouseUp);
        e.preventDefault();
        if (document.activeElement)
            document.activeElement.blur();
        Manager.mouseHandled = true;
        document.body.style.cursor = 'grabbing';
    }, [dragMouseMove, dragMouseUp]);
    // 开启拖拽
    var dragEnabledRef = React.useRef(false);
    var enableDraggable = React.useCallback(function () {
        var _a;
        if (dragElRef.current)
            return;
        if (!draggableHandle)
            dragElRef.current = widgetRef.current;
        if (draggableHandle && !dragElRef.current) {
            var el = widgetRef.current.querySelector(draggableHandle);
            dragElRef.current = el ? el : widgetRef.current;
        }
        console.log('【enableDrag】');
        (_a = dragElRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('mousedown', dragMouseDown);
        dragEnabledRef.current = true;
    }, [dragMouseDown, draggableHandle]);
    // 关闭拖拽
    var diableDraggable = React.useCallback(function () {
        if (!dragElRef.current)
            return;
        console.log('【disableDrag】');
        dragElRef.current.removeEventListener('mousedown', dragMouseDown);
        dragElRef.current = null;
        dragEnabledRef.current = false;
    }, [dragMouseDown]);
    // 判断开启和关闭的时机
    React.useEffect(function () {
        if (!(layoutData === null || layoutData === void 0 ? void 0 : layoutData.width) || !widget)
            return;
        if ((widget.static || widget.noDrag) && dragEnabledRef.current) {
            diableDraggable();
            return;
        }
        if (!widget.static && !widget.noDrag && !dragEnabledRef.current) {
            enableDraggable();
        }
    }, [diableDraggable, enableDraggable, layoutData, widget]);
    // ========================
    // ===== Resizeable =======
    // ========================
    var resizeElRef = React.useRef(null);
    var _c = React.useState(false), isResizing = _c[0], setIsResizing = _c[1];
    var _d = React.useState(false), isResizeEnding = _d[0], setIsResizeEnding = _d[1];
    var resizeFollow = React.useCallback(function (e) {
        if (!actionOffsetRef.current || !mouseDownEventRef.current || !widgetRef.current || !layoutData)
            return;
        var _a = actionOffsetRef.current, width = _a.width, height = _a.height, left = _a.left, top = _a.top;
        var _b = mouseDownEventRef.current, clientX = _b.clientX, clientY = _b.clientY;
        var offsetWidth = e.clientX - clientX;
        var offsetHeight = e.clientY - clientY;
        widgetRef.current.style.left = "".concat(left, "px");
        widgetRef.current.style.top = "".concat(top, "px");
        // 限制大小
        var minWidth = ((widget === null || widget === void 0 ? void 0 : widget.minW) || 1) * layoutData.colWidth;
        var maxWidth = ((widget === null || widget === void 0 ? void 0 : widget.maxW) || layoutData.cols) * layoutData.colWidth;
        var minHeight = ((widget === null || widget === void 0 ? void 0 : widget.minH) || 1) * layoutData.rowHeight;
        var maxHeight = ((widget === null || widget === void 0 ? void 0 : widget.maxH) || layoutData.rows) * layoutData.rowHeight;
        var newWidth = clamp(width + offsetWidth, minWidth, maxWidth);
        var newHeight = clamp(height + offsetHeight, minHeight, maxHeight);
        widgetRef.current.style.width = "".concat(newWidth, "px");
        widgetRef.current.style.height = "".concat(newHeight, "px");
        widgetRef.current.style.transition = 'none';
    }, [layoutData, widget]);
    var resizeMouseMove = React.useCallback(function (e) {
        var _a, _b;
        var s = mouseDownEventRef.current;
        if (Manager.isReszing) {
            console.log('resizing');
            resizeFollow(e);
            (_a = actionDoingRef.current) === null || _a === void 0 ? void 0 : _a.call(actionDoingRef, 'resize', e);
        }
        else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 3) {
            console.log('resize start');
            Manager.isReszing = true;
            Manager.resizeWidgetId = id;
            if (widgetRef.current) {
                actionOffsetRef.current = getActionOffset(e, widgetRef.current, widgetRef.current.parentElement);
            }
            widgetRef.current.style.transition = 'none';
            widgetRef.current.style.position = 'fixed';
            resizeFollow(e);
            setIsResizing(true);
            (_b = actionStartRef.current) === null || _b === void 0 ? void 0 : _b.call(actionStartRef, 'resize');
        }
    }, [id, resizeFollow]);
    // 鼠标抬起
    var resizeMouseUp = React.useCallback(function (e) {
        var _a;
        console.log('resizeMouseUp');
        document.removeEventListener('mousemove', resizeMouseMove);
        document.removeEventListener('mouseup', resizeMouseUp);
        if (Manager.isReszing) {
            console.log('reszing end');
            Manager.isReszing = false;
            document.body.style.cursor = 'auto';
            setIsResizing(false);
            setIsResizeEnding(true);
            widgetRef.current.style.transition = '';
            widgetRef.current.style.position = '';
            widgetRef.current.style.opacity = '1';
            (_a = actionEndRef.current) === null || _a === void 0 ? void 0 : _a.call(actionEndRef, 'resize');
            setTimeout(function () {
                setIsResizeEnding(false);
            }, 330);
        }
        mouseDownEventRef.current = null;
        Manager.resizeWidgetId = '';
        Manager.mouseHandled = false;
        e.preventDefault();
    }, [resizeMouseMove]);
    // 鼠标按下
    var resizeMouseDown = React.useCallback(function (e) {
        console.log('resizeMouseDown');
        if (Manager.mouseHandled)
            return;
        if (e.button !== 0)
            return;
        if (e.target.closest(MouseDownIgnore))
            return;
        mouseDownEventRef.current = e;
        document.addEventListener('mousemove', resizeMouseMove);
        document.addEventListener('mouseup', resizeMouseUp);
        e.preventDefault();
        if (document.activeElement)
            document.activeElement.blur();
        Manager.mouseHandled = true;
        document.body.style.cursor = 'nwse-resize';
    }, [resizeMouseMove, resizeMouseUp]);
    // 开启 resize
    var resizeEnabledRef = React.useRef(false);
    var enableResizable = React.useCallback(function () {
        console.log('【enableResize】');
        if (!resizeElRef.current)
            return;
        resizeElRef.current.addEventListener('mousedown', resizeMouseDown);
        resizeEnabledRef.current = true;
    }, [resizeMouseDown]);
    // 关闭 resize
    var disableResizable = React.useCallback(function () {
        if (!resizeElRef.current)
            return;
        console.log('【disableResize】');
        resizeElRef.current.removeEventListener('mousedown', resizeMouseDown);
        resizeElRef.current = null;
        resizeEnabledRef.current = false;
    }, [resizeMouseDown]);
    // 判断开启和关闭 resize 的时机
    React.useEffect(function () {
        if (!(layoutData === null || layoutData === void 0 ? void 0 : layoutData.width) || !widget)
            return;
        if ((widget.static || widget.noResize) && resizeEnabledRef.current) {
            disableResizable();
            return;
        }
        if (!widget.static && !widget.noResize && !resizeEnabledRef.current) {
            enableResizable();
        }
    }, [disableResizable, enableResizable, layoutData, widget]);
    // ========================
    // ======= Layout =========
    // ========================
    var isPlaceholder = React.useMemo(function () { return isDragging || isResizing; }, [isDragging, isResizing]);
    var widgetRect = useWidget({
        widget: widget,
        layoutData: layoutData,
    });
    // layout with widget data
    React.useEffect(function () {
        if (!widgetRect || !widgetRef.current || isPlaceholder)
            return;
        var left = widgetRect.left, top = widgetRect.top, width = widgetRect.width, height = widgetRect.height;
        widgetRef.current.style.width = "".concat(width, "px");
        widgetRef.current.style.height = "".concat(height, "px");
        if ((isDragEnding || isResizeEnding) && actionOffsetRef.current) {
            // 等 fixed 定位下的移动动画结束
            var _a = actionOffsetRef.current, layoutLeft = _a.layoutLeft, layoutTop = _a.layoutTop;
            widgetRef.current.style.top = "".concat(top + layoutTop, "px");
            widgetRef.current.style.left = "".concat(left + layoutLeft, "px");
        }
        else {
            widgetRef.current.style.top = "".concat(top, "px");
            widgetRef.current.style.left = "".concat(left, "px");
        }
    }, [isDragEnding, isPlaceholder, isResizeEnding, widgetRect]);
    // 设置每个 widget 间距，以此保证间距一致性
    React.useEffect(function () {
        if (!layoutData || !widgetRef.current)
            return;
        var gap = layoutData.gap;
        widgetRef.current.style.borderLeftWidth = gap ? "".concat(gap[0] * 0.5, "px") : '0';
        widgetRef.current.style.borderRightWidth = gap ? "".concat(gap[0] * 0.5, "px") : '0';
        widgetRef.current.style.borderTopWidth = gap ? "".concat(gap[1] * 0.5, "px") : '0';
        widgetRef.current.style.borderBottomWidth = gap ? "".concat(gap[1] * 0.5, "px") : '0';
    }, [layoutData]);
    return (jsxs(Wrapper, __assign({ ref: widgetRef, className: cls({
            dragging: isDragging,
            resizing: isResizing,
            dragending: isDragEnding,
            resizeending: isResizeEnding,
        }) }, { children: [jsx("div", __assign({ className: className }, { children: children })), !resizeableHandle && !(widget === null || widget === void 0 ? void 0 : widget.static) && !(widget === null || widget === void 0 ? void 0 : widget.noResize) && (jsx(ResizeArrow, { className: "default_resize", ref: resizeElRef }))] }), id));
};
var templateObject_1;

var BreakLayout = function (props) {
    var children = props.children, breakPoints = props.breakPoints, breakCols = props.breakCols, breakWidgets = props.breakWidgets, breakGap = props.breakGap, breakRowHeight = props.breakRowHeight, ret = __rest(props, ["children", "breakPoints", "breakCols", "breakWidgets", "breakGap", "breakRowHeight"]);
    var _a = React.useState(), breakSign = _a[0], setBreakSign = _a[1];
    var breakPointList = React.useMemo(function () {
        var entries = [];
        for (var key in breakPoints) {
            entries.push([key, breakPoints[key]]);
        }
        entries.sort(function (a, b) { return b[1] - a[1]; });
        return entries;
    }, [breakPoints]);
    var cols = React.useMemo(function () {
        if (typeof breakCols === 'number')
            return breakCols;
        if (!breakSign)
            return 12;
        var res = breakCols[breakSign];
        return res || 12;
    }, [breakCols, breakSign]);
    var widgets = React.useMemo(function () {
        if (!breakSign)
            return [];
        var widgets = breakWidgets[breakSign];
        return widgets || [];
    }, [breakSign, breakWidgets]);
    var gap = React.useMemo(function () {
        if (Array.isArray(breakGap) && breakGap.length === 2)
            return breakGap;
        if (!breakGap || !breakSign)
            return;
        if (typeof breakGap === 'object' && !Array.isArray(breakGap)) {
            return breakGap[breakSign];
        }
    }, [breakGap, breakSign]);
    var rowHeight = React.useMemo(function () {
        if (typeof breakRowHeight === 'number' || typeof breakRowHeight === 'string')
            return breakRowHeight;
        if (!breakRowHeight || !breakSign)
            return;
        return breakRowHeight[breakSign];
    }, [breakRowHeight, breakSign]);
    var handleLayoutResize = React.useCallback(function (size) {
        var width = size.width;
        console.log('width', width, breakPointList);
        var breakPoint = breakPointList.find(function (item) { return item[1] <= width; });
        if (breakPoint) {
            setBreakSign(breakPoint[0]);
            return;
        }
        setBreakSign(breakPointList[breakPointList.length - 1][0]);
    }, [breakPointList]);
    return (jsx(Fragment, { children: jsx(Layout, __assign({}, ret, { col: cols, widgets: widgets, gap: gap, rowHeight: rowHeight, onSizeChange: handleLayoutResize }, { children: children })) }));
};

export { BreakLayout, Layout, Widget };
