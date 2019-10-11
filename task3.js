function getPath(elem) {
    let path = '',
        tag = elem.tagName.toLowerCase(),
        tagLen, id, attrs, attrsStr, tagPos,
        fnTagLen = (elm, dir, tag, tagLen) => {
            elm = elm[dir + 'ElementSibling'];
            while (elm) {
                elm.tagName.toLowerCase() === tag ? tagLen++ : null;
                elm = elm[dir + 'ElementSibling'];
            }
            return tagLen;
        };
    while (tag !== 'body') {
        id = elem.id ? '#' + elem.id : '';
        attrs = elem.attributes;
        attrsStr = '';
        tagLen = 1;
        for (var i = 0; i < attrs.length; i++) {
            attrsStr += '[' + attrs[i].name + (attrs[i].value ? "='" + attrs[i].value + "'" : '') + ']';
        }
        tagLen = fnTagLen(elem, 'previous', tag, tagLen);
        tagPos = tagLen;
        tagLen = fnTagLen(elem, 'next', tag, tagLen);
        path = '>' + tag + id + attrsStr + (tagLen > 1 ? ':nth-of-type(' + tagPos + ')' : '') + path;
        elem = elem.parentNode;
        tag = elem.tagName.toLowerCase();
    }
    return 'body' + path;
}
