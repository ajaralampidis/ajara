---
title: 'HTML & CSS The Quick Start guide'
description: 'The bare minimum you need to know to create a web page.'
pubDate: 'Jan 18 2024'
# heroImage: '/blog-placeholder-1.jpg'
---

The goal of this post is not to be a complete or academical guide to HTML, it's actually the opposite, **the most minimal guide** I can think of that will allow everyone to start playing and practicing. It should take you **no more than 10 minutes to read this**.

Most guides, tutorials or books out there are rather extensive and I always thought **you don't need to learn everything about HTML and CSS to just play around with it** and see if web programming is your thing. I encourage in this sense to learn by doing and avoid wasting your time with lots of theory you won´t fully understand _unless you actually have practical experience._

---

# HTML

First things first, what is HTML?
I think [w3schools](https://www.w3schools.com/html/html_intro.asp) has the most concise answer.

- HTML stands for Hyper Text Markup Language
- HTML is the standard markup language for creating Web pages
- HTML describes the structure of a Web page
- HTML consists of a series of elements
- HTML elements tell the browser how to display the content
- HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.

But this might not be a very beginner friendly answer. So I will add a little explanation:

Think about how a book is structures. Usually the content is divided in chapters and sub-chapters. And probably in the first page you will have a Table of Components. Something like this:

**Table of Contents:**

- Chapter 1 _pag 1_
  - Sub Chapter 1.a _pag 1_
  - Sub Chapter 1.b _pag 10_
- Chapter 2 _pag 20_
- Chapter 3 _pag 30_

In a webpage you don't have chapters, you have **HTML elements**. And those HTML elements have content the same way a chapter does. **So in both cases what we are doing is organizing information.** In a book we organize it in chapters and in a web page we organize it in HTML elements.

**Why do we need to organize the information in HTML elements ?**

Well, the complete answer for this question can be lengthy but the simpler version I can think of is that **we need to tell the _browser_ how to display the content of our website**.

**What is a browser?**

Google Chrome or Firefox are two different browsers. Basically a browser is a computer program that can display and navigate through web content _(such as HTML documents)._

### TLDR: HTML is a langage used to organize information so that a browser can understand it.

---

# Structure of an HTML Document:

An **HTML Document** is made of: **HTML elements** and an HTML Element is made of **HTML Tags and the content.** An html tag can contain attributes:

- HTML Document contains:
  - HTML Elements contains:
    - HTML Tags
      - Attributes
    - HTML Content

![Image describing an HTML element Structure.](/assets/blog/HTMLandCssGuide/HTMLElement.png)
![Image showing an attribute of an HTML Tag](/assets/blog/HTMLandCssGuide/HTMLTag.png)
_- Images from [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)_

## Nesting

You can nest elements inside other elements:

```html
<p>My cat is <strong>very</strong> grumpy.</p>
```

But you need to close the tags in a specific order. You need to close first the last tag you opened. In the example above `<p>` tag is opened and then `<strong>`, so we close first the `</strong>` and then the `</p>`.

Here is an example of an impropper way of nesting:

```html
<!-- This is wrong -->
<p>My cat is <strong>very grumpy.</p></strong>
```

_- Nesting examples from [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics#nesting_elements)_

## Void elements

Some elements have no content and are called void elements. Take the `<img>` element that we already have in our HTML page:

```html
<img src="images/firefox-icon.png" alt="My test image" />
<!-- Note the "/>" at the end. Void elements are "self closing" tags. -->
```

_- Void element example also from [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics#nesting_elements)_

## HTML Document Declaration:

All HTML documents must start with a `<!DOCTYPE>` and an `<html>` tag. _(`<!DOCTYPE>` is not an HTML tag, it's information that tells the browser what document type this is)._

```html
<!doctype html>
<html>
  <!-- Inside here you will add all of the other elemnts and contents -->
</html>
```

---

# CSS

CSS stands for **Cascading Style Sheets**. It's a language **used to apply graphical styles to web content (to style HTML)**. It's not a markup language, CSS is a style sheet language. you use it to style HTML elements _(and, as you can guess, without HTML it is usless)._

## CSS ruleset

While HTML documents were made of HTML elements, in CSS we have _rulesets_. A CSS ruleset is made of:

- The **selctor**: used to sepcify which HTML Elements we want to style
- Declarations: A rule that defines graphical styles
  - **Property**. A keyword that specifies which graphical property we want to change
  - Property **value**: The actual value we want to assign to the given property.

![Image showing the anatomy of a CSS Ruleset](/assets/blog/HTMLandCssGuide/cssruleset.png)
_- Image from [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics#anatomy_of_a_css_ruleset)_

In the example above we are selecting all `<p>` tags and we are changing the text color of them to red.

Btw, there are several types of [CSS selectors](https://www.w3schools.com/css/css_selectors.asp):

- Simple selectors (select elements based on name, id, class)
- Combinator selectors (select elements based on a specific relationship between them)
- Pseudo-class selectors (select elements based on a certain state)
- Pseudo-elements selectors (select and style a part of an element)
- Attribute selectors (select elements based on an attribute or attribute value)

👆 You don't need to learn them all right now, but remember that you can style almost anything a browser can render. Just look for the right selector whenever you need.

And then you have the property and the property value. You have property to change the background color _(being the desired color the value of the property)_, the text color, the font size, the width, and the height of an element, and basically everything you might need to style. The [list of css properties](https://www.w3schools.com/cssref/index.php) is huge, you don't need to learn them all by memory, but rather look for the properties you need when you need them.

---

# Congratulations you are ready to start developing! 🎉

Of course there are lots of things not covered in this list: forms, grids, flexbox, sticky or absolute elements, canvas, animations, etc

**But I think the best way to learn HTML and CSS is through practice.** Go ahead, create some websites, on the go you will start to find struggles and things you don't know how to do, and thats when you need to look for more info and continue practicing. You don't need to learn everything by memory, you just need to play around.

Once you get used to it, you can continue learning. You may find it useful to learn:

- [semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- Javascript

And the list could go on and on forever. I intentionally used external resources in this post because thats usually how it goes: you try to code something and more often than not you will need to reach for reference. You don't need to know everything beforehand, and remember that practice makes perfect so I wanted to create the quickest guide possible that could allow you to just start coding.

To end this post I just wanted to leave you this:

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      /* write here all your css */
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <!-- Write here all your html -->
    <h1>Hello World!</h1>
  </body>
</html>
```

👆 copy and paste that into a new file. Call that file `index.html` and open that file with your browser and with a code editor (or any text editor you like). Thats it, simply start playing around. I really hope this post can help you to start, best of luck on your coding journey!
