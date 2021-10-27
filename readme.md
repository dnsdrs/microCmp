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

1. **Load the microCmp library**

- Download the microCmp code from [this page](https://github.com/dnsdrs/microCmp/blob/main/microCmp.js)
- Host it on your project
- Insert the `<script src="/microCmp.js">` tag as high as possible in the `<head>` section of all your pages

2. **Add the microCmp HTML to your page**

```
<div class="microCmp_notice">
    <div class="microCmp_text"></div>
    <div class="microCmp_buttons">
        <button class="microCmp_refuse microCmp_button"></button>
        <button class="microCmp_accept microCmp_button"></button>
    </div>
</div>
```

3. **Style your microCmp**

Use the following classes to style your microCmp :

- microCmp_notice

<details>
<summary>See example:</summary>

```
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
    color: #F9F9F9;
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
    color: #F9F9F9;
    margin: 5px 0px;
    border-radius: 4px;
    font-size: 12px;
    letter-spacing: 1.1px;
    font-weight: 500;
    font-family: Avenir;
    cursor: pointer;
}

.cmp_link {
    color: #1276CE;
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

4. **Configure your microCmp**

`microCmp.init()`

5. **Initiate the microCMP**

## Backlog

- [ ] Delete all first party cookies on click to Refuse
- [ ] Task 2
- [ ] Task 3
