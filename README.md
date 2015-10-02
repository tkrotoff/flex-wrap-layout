# Flexform

Experimentations with [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) and [`flex-wrap: wrap`](http://www.w3.org/TR/css-flexbox-1/#flex-wrap-property) to get rid of the classic and limited [12 columns grid](https://gist.github.com/tkrotoff/e15da98129e46db39bf6) (e.g. things like `.col-md-6 { width: 50% }`).

Web technologies (HTML, CSS, JavaScript) are now used for creating complex GUIs (web apps vs web sites). Desktop tools and libraries like [Qt](http://www.qt.io/) have elegantly solved [the problem](http://doc.qt.io/qt-5/layout.html) for decades.

## Example

![demo](demo.gif)

```HTML
<form vspace>
  <div layout="row" hspace vspace>
    <div layout="column" vspace grow>
      <div layout="row">
        <label for="firstname" offset-with-content>First Name</label>
        <input id="firstname" grow>
      </div>

      <div layout="row">
        <label for="lastname" offset-with-content>Last Name</label>
        <input id="lastname" grow>
      </div>
    </div>

    <div layout="column" vspace grow>
      <div layout="row">
        <label for="arrival" offset-with-content>Arrival</label>
        <input type="date" id="arrival" grow>
      </div>

      <div layout="row">
        <label for="departure" offset-with-content>Departure</label>
        <input type="date" id="departure" grow>
      </div>
    </div>
  </div>

  <div layout="row">
    <div grow></div>
    <div layout="row" hspace vspace>
      <button>Save</button>
      <button>Cancel</button>
    </div>
    <div grow></div>
  </div>
</form>
```

## Primitives

### layout="row"

Lines up child elements horizontally ([QHBoxLayout](http://doc.qt.io/qt-5/qhboxlayout.html) equivalent).

`<1> <2> <3>`

### layout="column"

Lines up child elements vertically ([QVBoxLayout](http://doc.qt.io/qt-5/qvboxlayout.html) equivalent).

```
<1>
<2>
<3>
```

### grow

Grows the element if extra space is available, the element won't shrink below its natural width ([QSizePolicy](http://doc.qt.io/qt-5/qsizepolicy.html#details) equivalent).

- Without `grow`:
```
| <1> <2> <3>         |
```

- Element 1 with `grow` attribute:
```
| <    1    > <2> <3> |
```
Element 1 fills the extra space if any

- Elements 2 and 3 with `grow` attribute:
```
| <1> <  2  > <  3  > |
```
Elements 2 and 3 share the extra space if any

### vspace

Vertical space (margin-bottom) between child elements ([QLayout::spacing](http://doc.qt.io/qt-5/qlayout.html#spacing-prop) equivalent).

```
<1>  instead of  <1>
                 <2>
<2>              <3>

<3>
```

### hspace

Horizontal space (margin-right) between child elements ([QLayout::spacing](http://doc.qt.io/qt-5/qlayout.html#spacing-prop) equivalent).

`<1> <2> <3>` instead of `<1><2><3>`

### Spacer (`<div grow></div>`)

Stretchable blank space ([QSpacerItem](http://doc.qt.io/qt-5/qspaceritem.html#details) equivalent).

```
| <1> <2>   <->   <3> |
| <1> <-> <2> <-> <3> |
```

## Limitations

I would like to [right-align the labels](http://doc.qt.io/qt-5/qformlayout.html#details) of a form:
```
| <    label> <input> |  instead of  | <label    > <input> |
| <    label> <input> |              | <label    > <input> |
```

Unfortunately, to my knowledge, it is not possible to detect when an element is wrapped in CSS:
```
| <    label> |  instead of  | <label    > |
| <input>     |              | <input>     |
| <    label> |              | <label    > |
| <input>     |              | <input>     |
```
This would also solve other problems (all of them?).

## Build and run

```Shell
npm run serve
open http://localhost:9001/native.html
open http://localhost:9001/bootstrap3.html
```
