[![npm version](https://img.shields.io/npm/v/as-countdown.svg)](https://www.npmjs.com/package/as-countdown)

[![examples](https://i.ibb.co/Zz6Xk7Q/example.png)](https://www.npmjs.com/package/as-countdown)

# as-countdown

This package provides a custom element `<as-countdown />` that counts down to a given date or timestamp. Per default the component displays the remaining days, hours, minutes and seconds. For each of these a label is displayed. The labels default to *Days*, *Hours*, *Minutes* and *Seconds*. All customizations can be found [here](./src/components/countdown/readme.md).

## Usage

```html
<as-countdown
  date="2019-12-24">
</as-countdown>

<as-countdown
  date="1563369146414"
  days-label="Dias"
  hours-label="Horas"
  minutes-label="Minutos"
  seconds-label="Segundos">
</as-countdown>

<as-countdown
  date="1566346414104"
  hide-seconds>
</as-countdown>

<as-countdown
  date="2019-12-31"
  days-label="Days left in 2019"
  hide-hours
  hide-minutes
  hide-seconds>
</as-countdown>
```

## Installing

### via script tag

- Put a script tag similar to this `<script src='https://unpkg.com/as-countdown@VERSION/dist/as-countdown.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### via node modules
- Run `npm install as-countdown --save`
- Put a script tag similar to this `<script src='node_modules/as-countdown/dist/as-countdown.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

Find more details on integrations into frameworks [here](https://stenciljs.com/docs/overview).

## Styling

The component does not make any assumptions about stylings and displays the countdown as an inline element. You are free to style it in every way you want. Use these css selectors to apply styles accordingly:

```css
as-countdown { /* root */ }
as-countdown > section { /* sections (days, hours, minutes, seconds) */ }
as-countdown > section > div { /* value for respective section */ }
as-countdown > section > label { /* label for respective section */ }
```

## The done event

When the countdown has finished a *done* event is being dispatched. You can react to it like this:

```js
const countdownEl = document.querySelector('as-countdown');

countdownEl.addEventListener('done', () => {
  /* Do whatever needs to be done */
});
```

If you use a JS framework you can use that framework's default event binding syntax. Here's an example for *Angular*:

```html
<as-countdown
  date="2019-12-24"
  (done)="decorateChristmasTree()">
</as-countdown>
```

## Behaviour

*Fallback behaviour: Component shows 0 Days, 0 Hours, 0 Minutes and 0 Seconds.*

- The `date` can be passed in as a timestamp or ISO string. Invalid dates will trigger the fallback behaviour
- Dates in the past will trigger the fallback behaviour
