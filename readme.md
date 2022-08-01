# microCmp

## Description

microCmp is a minimalist javascript-HTML-CSS-based CMP that enables you to trigger functions or prevent functions from running depending user's consent

## Features

- Create yout CMP notice with
  - A text that includes a link
  - An Accept button
  - A Refuse button
- Style your CMP notice
- Save the user's consent in a dedicated first party cookie that expires in 6 months
- Trigger functions depeding on the user's consent
  - Don't trigger anything while the user hasn't made a choice
  - If the user has accepted in a previous page or session, trigger the functions on page load
  - If the user has refused in a previous page or sessions, don't trigger the functions
  - If the user hasn't made a choice in the previous page or session, trigger all previously asked functions on click on the Accept button
  - If the user hasn't made a choice in the previous page or session, prevent all previously asked functions from running on click on the Refuse button
- Reopen CMP on demand
- Reset consent on demand
- Change all texts depeding on setted language

## Setup

### 1. **Load the microCmp library**

- Download the microCmp code from [this page](https://github.com/dnsdrs/microCmp/blob/main/microCmp.js)
- Host it on your project
- Insert the script (for instance `<script src="/microCmp.js">`) tag as high as possible in the `<head>` section of all your pages

### 2. **Add the microCmp HTML to all your pages**

```html
<div class="microCmp_notice">
  <div class="microCmp_text"></div>
  <div class="microCmp_buttons">
    <button class="microCmp_refuse microCmp_button"></button>
    <button class="microCmp_accept microCmp_button"></button>
  </div>
</div>
```

### 3. **Style your microCmp**

Use the following classes to style your microCmp :

| css class          | usage                                 |
| ------------------ | ------------------------------------- |
| `.microCmp_notice` | div that contains whole cmp notice    |
| `.microCmp_text`   | div that contains the cmp text        |
| `.microCmp_button` | div that contains the two cmp buttons |
| `.microCmp_refuse` | refuse div                            |
| `.microCmp_accept` | accept div                            |

<details>
<summary>See css example:</summary>

```css
* {
  box-sizing: border-box;
  border: 0px;
  margin: 0px;
  padding: 0px;
}

.cmp_notice {
  display: none;
  position: absolute;
  background-color: #353744;
  width: 292px;
  bottom: 0px;
  right: 0px;
  color: #f9f9f9;
  margin: 16px;
  font-family: Avenir;
  font-size: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
}

.cmp_text {
  line-height: 18px;
  padding: 0px 16px 8px 16px;
}

.cmp_buttons {
  margin: 10px 12px 10px 12px;
  width: 260px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.cmp_button {
  background-color: rgba(249, 249, 249, 0.1);
  width: 100%;
  height: 35px;
  border: none;
  color: #f9f9f9;
  margin: 5px 0px;
  border-radius: 4px;
  font-size: 12px;
  letter-spacing: 1.1px;
  font-weight: 500;
  font-family: Avenir;
  cursor: pointer;
}

.cmp_link {
  color: #1276ce;
  font-weight: bold;
}

.cmp_active {
  display: block;
}

@media (max-width: 1000px) {
  .cmp_notice {
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: unset;
    right: unset;
    margin: 0px;
  }
  .cmp_buttons {
    flex-direction: row;
    justify-content: space-between;
    width: unset;
    margin-inline: 16px;
  }
  .cmp_button {
    width: 49%;
  }
}

@media (max-width: 480px) {
  .cmp_notice {
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: unset;
    right: unset;
    margin: 0px;
  }
  .cmp_buttons {
    flex-direction: column;
    width: unset;
  }
  .cmp_button {
    width: unset;
  }
}
```

</details>

### 4. **Configure your microCmp**

- add a translation using `microCmp.addTranslation(language, translation)`
  where
  - `language` is a two letters string describing the translation language
  - `translation` is an object containing a `text` (string), `link` (string), `accept` (string) label and `refuse` (string) label

> ⚠️⚠️⚠️ please note that the text string has to contain a link html tag `<a href='#' class='microCmp_link'>link text</a>` ⚠️⚠️⚠️

```js
microCmp.addTranslation("de", {
  text: "Wir benutzen Cookies. Bitte lesen Sie sich <a href='#' class='microCmp_link'>diesem Text</a>",
  link: "https://privacy.thewaltdisneycompany.com/fr/regles-de-respect-de-la-vie-privee/quest-ce-quun-cookie/",
  accept: "ALLES ANNEHMEN",
  refuse: "ALLES BLOCKIEREN",
})
```

- set the microCmp language using `microCmp.setLanguage(language)`
  where language is a two letters string describing the translation language, for instance : `microCmp.setLanguage('de')`

### 5. **Initiate the microCMP**

- just use `microCmp.init()` to display the microCmp and start using it
- note that you can use `microCmp.toTriggerOnConsent.push` before `microCmp.init()` but the functions will run only on `init()` (if all conditions are met)

### 6. **Use the microCMP**

The end goal of this microCmp boils down to managing if and when code should run.

To do that, just add your code in here:

```js
microCmp.toTriggerOnConsent.push(function () {
  // your code here
})
```

It will append your code as a function to a queue:

- If the consent is not given (or given yet), the queue won't be executed.
- If or when the consent is given, all functions pushed to the queue will run.

Please note that you cannot push named function directly in the queue

> ⛔️ Don't do that ⛔️
>
> ```js
> microCmp.toTriggerOnConsent.push(myFunction())
> ```
>
> ```js
> microCmp.toTriggerOnConsent.push(console.log("unicorn"))
> ```

> 👍 Do that instead 👍
>
> ```js
> microCmp.toTriggerOnConsent.push(function() {
>     myFunction()
> })
> ```
>
> ```js
> microCmp.toTriggerOnConsent.push(function () {
>   console.log("unicorn")
> })
> ```

## Backlog

- [ ] Add a demo page
- [ ] Delete all first party cookies on click to Refuse or on `microCmp.reset()`
- [ ] Group all public functions (`microCmp.public.function()`) for clarity
