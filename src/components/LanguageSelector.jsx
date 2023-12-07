import { useState } from "react";
import i18n from "../i18n"
import { useTranslation } from "react-i18next";
import Flag from 'react-world-flags'

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language) // i18n.language contains the language assigned to lng in i18n.js file.

  const { t } = useTranslation()

  const chooseLanguage = (e) => {
    e.preventDefault()
    i18n.changeLanguage(e.target.value) // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(e.target.value)
    localStorage.setItem("lang", e.target.value)
    window.location.reload()
  }

  return (
    <select className="languageSelector" defaultValue={selectedLanguage} onChange={chooseLanguage}>
      <option value="ar">AR</option>
      <option value="en">EN</option>
    </select>
  )
}

export default LanguageSelector