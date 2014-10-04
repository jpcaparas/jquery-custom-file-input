# jQuery Custom File Input

## The `SI.Files` (the secondary dependency) for this plugin is wholly credited to [Shaun Inman](http://www.shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom)

## Overview 
This jQuery plugin `(jquery.customFile.js)` allows you to overlay an element on top of an existing input field. The input field maintains zero opacity and mimics the dimensions of replacement element sitting on top of it.

* You can pass a jQuery element as (a) the first argument or (b) as a `replacement` object property
* The second argument is an (optional) callback function

## Example Usage
```javascript
(function($) {
    // Create the replacement element to be overlayed on top of the file input button
    var replacementElem = $('<div />')
        .text("This is a DIV masquerading as a file upload button. Click it.")
        .css({
            background: '#ccc',
            border: '1px solid #000',
            display: 'block',
            width: '200px',
            padding: '3em',
            background: '#f1f1f1',
            cursor: "pointer"
        });
        
    // Call the "customFile" function passing a "replacement" property
    // with the replacement element we've just created above.
    $('#file').customFile(replacementElem);
}(jQuery));
```

## Known issues
* Passing in a `button` element suppresses the functionality of the file input element.