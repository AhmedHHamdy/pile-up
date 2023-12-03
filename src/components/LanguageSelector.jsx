import { useState } from "react";
import i18n from "../i18n"
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language) // i18n.language contains the language assigned to lng in i18n.js file.

  const { t } = useTranslation()

  const chooseLanguage = (e) => {
    e.preventDefault()
    i18n.changeLanguage(e.target.value) // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(e.target.value)
    localStorage.setItem("lang", e.target.value)
  }

  return (
    <select className="languageSelector" defaultValue={selectedLanguage} onChange={chooseLanguage}>
      <option value="ar">{t("Arabic")}</option>
      <option value="en">{t("English")}</option>
    </select>
  )
}

export default LanguageSelector