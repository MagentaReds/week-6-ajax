# week-6-ajax

Fairly straightfoward and like the demo and our in-class exercises.

Each topic button hold's the query data in its data-topic attribute, which is passed to an ajax request when it is clicked.

Each of the displayed images has two URLs saved as data-still/data-animate attrributes that are read from the ajax response.  Clicking on the image sets the src attribute to the one it isn't currently set as using data-state as the tag.  