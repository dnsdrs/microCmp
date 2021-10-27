var cmp = {
    currentLanguage: 'fr',
    htmlElements: {
        notice: document.querySelector(".cmp_notice"),
        text: document.querySelector(".cmp_text"),
        accept: document.querySelector(".cmp_button.cmp_accept"),
        refuse: document.querySelector(".cmp_refuse.cmp_refuse"),
    },
    translations: {
        fr: {
            text: "Nous utilisons des cookies pour mieux comprendre votre comportement en ligne, améliorer nos services, communiquer avec vous, personnaliser le contenu ou la publicité sur nos plateformes et vous offrir des fonctionnalités liées aux médias sociaux. Pour en savoir plus, suivez <a href='#' class='cmp_link'>ce lien</a>",
            link: "https://privacy.thewaltdisneycompany.com/fr/regles-de-respect-de-la-vie-privee/quest-ce-quun-cookie/",
            accept: "TOUT ACCEPTER",
            refuse: "TOUT BLOQUER"
        },
        en: {
            text: "we use cookies. Read more on <a href='#' class='cmp_link'>this link</a>",
            link: "https://privacy.thewaltdisneycompany.com/fr/regles-de-respect-de-la-vie-privee/quest-ce-quun-cookie/",
            accept: "ACCEPT ALL",
            refuse: "BLOCK ALL"
        }
    },
    triggerOnConsent: new Promise((resolve, reject) => {
        consentIsResolved = resolve
    }),
    reset: function() {
        cmp.htmlElements.notice.classList.add("cmp_active")
        cmp.setCookie("consent", "undefined", -1)
        window.location.reload()
    },
    open: function() {
        cmp.htmlElements.notice.classList.add("cmp_active")
    },
    accept: function() {
        cmp.consentStatus = true;
        cmp.htmlElements.notice.classList.remove("cmp_active")
        cmp.setCookie("consent", true, 180)
        consentIsResolved()
    },
    refuse: function() {
        cmp.consentStatus = false;
        cmp.htmlElements.notice.classList.remove("cmp_active")
        cmp.setCookie("consent", false, 180)
    },
    setLanguage: function(language) {
        cmp.currentLanguage = language;
        cmp.htmlElements.text.innerHTML = cmp.translations[cmp.currentLanguage].text
        cmp.htmlElements.link = document.querySelector(".cmp_link")
        cmp.htmlElements.link.href = cmp.translations[cmp.currentLanguage].link
        cmp.htmlElements.accept.innerText = cmp.translations[cmp.currentLanguage].accept
        cmp.htmlElements.refuse.innerText = cmp.translations[cmp.currentLanguage].refuse
    },
    getConsent: function() {
        if (cmp.getCookie("consent") == 'true') {
            return true
        } else {
            return false
        }
    },
    getCookie: function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setCookie: function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    toTriggerOnConsent: [],
    init: function() {
        cmp.htmlElements.text.innerHTML = cmp.translations[cmp.currentLanguage].text
        cmp.htmlElements.link = document.querySelector(".cmp_link")
        cmp.htmlElements.link.href = cmp.translations[cmp.currentLanguage].link
        cmp.htmlElements.accept.innerText = cmp.translations[cmp.currentLanguage].accept
        cmp.htmlElements.refuse.innerText = cmp.translations[cmp.currentLanguage].refuse
        if (cmp.getCookie("consent") == 'undefined' || cmp.getCookie("consent") == '') {
            cmp.htmlElements.notice.classList.add("cmp_active")
        } else if (cmp.getConsent()) {
            consentIsResolved()
        }
        cmp.htmlElements.accept.addEventListener("click", function() {
            cmp.accept()

        })
        cmp.htmlElements.refuse.addEventListener("click", function() {
            cmp.refuse()
        })
        cmp.triggerOnConsent
            .then(
                function() {
                    while (cmp.toTriggerOnConsent.length > 0) {
                        cmp.toTriggerOnConsent.shift().apply();
                    }
                }
            );
    }
}