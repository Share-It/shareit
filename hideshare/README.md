# HIDESHARE

jQuery plugin for inserting social sharing functionality. Requires that Font-Awesome fonts and CSS be installed.

GitHub page found at http://arnonate.github.io/hideshare/

## Demo
A demo can be found at http://natearnold.me/hideshare/example/

## Getting Started
Font-Awesome (http://fortawesome.github.io/Font-Awesome/) is used in the example but not required for the plugin to function. To use text links simply delete the line of CSS that sets .hideshare-wrap span to display none.

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/arnonate/hideshare/hideshare.min.js
[max]: https://raw.github.com/arnonate/hideshare/hideshare.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="hideshare.min.js"></script>
<script>
jQuery(function($) {
  $(".share").hideshare(); // Calls HIDESHARE on element with class "share"
});
</script>
```

## Examples

A simple usage case would involve calling HIDESHARE on a button like in the following example:

```html
<img src="http://farm7.staticflickr.com/6213/6243090894_8b8dd862cd.jpg">
<a class="share" href="#">SHARE ME</a>

<script>
$(document).ready(function() {
  $(".share").hideshare({
    media: "http://farm7.staticflickr.com/6213/6243090894_8b8dd862cd.jpg"
  });
});
</script>
```

## Options

The following options may be configured:

```html
<img src="http://farm7.staticflickr.com/6213/6243090894_8b8dd862cd.jpg">
<a class="share" href="#">SHARE ME</a>

<script>
$(document).ready(function() {
  $(".share").hideshare({
    link: "",           // Link to URL defaults to document.URL
    title: "",          // Title for social post defaults to document.title
    media: "",          // Link to image file defaults to null
    decription: "",     // Description for Facebook summary
    facebook: true,     // Turns on Facebook sharing
    twitter: true,      // Turns on Twitter sharing
    pinterest: true,    // Turns on Pinterest sharing
    googleplus: true,   // Turns on Google Plus sharing
    linkedin: true,     // Turns on LinkedIn sharing
    position: "bottom", // Options: Top, Bottom, Left, Right
    speed: 50           // Speed of transition
  });
});
</script>
```

## Styles

The following styles are necessary for display:

```html
<style>
.hideshare-wrap {
  position: relative;
}
.hideshare-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
}
.hideshare-list li {
  display: inline-block;
  zoom: 1;
  *display: inline;
  margin: 2em 1em;
}
.hideshare-wrap span {
  display: none;
}
</style>
```
